const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { query } = require('./db');
const { loginAdmin, requireAdmin } = require('./auth');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
const defaultAllowed = [
  'https://theaischool.co',
  'https://www.theaischool.co',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5000'
];

const envAllowed = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const allowedOrigins = Array.from(new Set([...defaultAllowed, ...envAllowed]));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-session-id']
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'The AI School API', timestamp: new Date() });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

// Admin Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const authResult = await loginAdmin(email, password);
    res.json(authResult);
  } catch (err) {
    res.status(401).json({ error: err.message || 'Authentication failed' });
  }
});

// Admin: Get all interview reports (Protected)
app.get('/api/reports', requireAdmin, async (req, res) => {
  try {
    const { email, limit = 50, offset = 0 } = req.query;
    let sql = `
      SELECT 
        r.id as report_id,
        r.student_email,
        r.self_intro_text,
        r.self_intro_evaluation,
        r.chat_transcript,
        r.resume_structured,
        r.technical_quiz,
        r.evaluation_report,
        r.created_at as report_created_at,
        s.id as student_id,
        s.name as student_name,
        s.phone as student_phone,
        s.college as student_college
      FROM interview_reports r
      LEFT JOIN students s ON r.student_email = s.email
    `;
    const params = [];

    if (email) {
      params.push(email);
      sql += ` WHERE r.student_email = $${params.length}`;
    }

    params.push(parseInt(limit, 10) || 50);
    const limitIndex = params.length;
    params.push(parseInt(offset, 10) || 0);
    const offsetIndex = params.length;

    sql += ` ORDER BY r.created_at DESC LIMIT $${limitIndex} OFFSET $${offsetIndex}`;

    const result = await query(sql, params);
    const countResult = await query('SELECT COUNT(*) as total FROM interview_reports');

    res.json({
      total: parseInt(countResult.rows[0].total, 10),
      reports: result.rows
    });
  } catch (err) {
    console.error('Error fetching reports:', err);
    res.status(500).json({ error: 'Failed to fetch reports: ' + err.message });
  }
});

// Student Profile Upsert
app.post('/api/students', async (req, res) => {
  try {
    const { name, email, phone, college } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const cleanEmail = email.trim().toLowerCase();

    const result = await query(
      `INSERT INTO students (name, email, phone, college, updated_at)
       VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
       ON CONFLICT (email)
       DO UPDATE SET
         name = EXCLUDED.name,
         phone = COALESCE(EXCLUDED.phone, students.phone),
         college = COALESCE(EXCLUDED.college, students.college),
         updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [name.trim(), cleanEmail, phone?.trim() || null, college?.trim() || null]
    );

    res.json({ success: true, student: result.rows[0] });
  } catch (err) {
    console.error('Error upserting student:', err);
    res.status(500).json({ error: 'Failed to save student profile: ' + err.message });
  }
});

// Save Interview Report
app.post('/api/save-interview', async (req, res) => {
  try {
    const {
      studentEmail,
      studentName,
      studentPhone,
      studentCollege,
      selfIntroText,
      selfIntroEvaluation,
      chatTranscript,
      resumeStructured,
      technicalQuiz,
      evaluationReport
    } = req.body;

    if (!studentEmail) {
      return res.status(400).json({ error: 'studentEmail is required' });
    }

    const cleanEmail = studentEmail.trim().toLowerCase();

    // Ensure student exists
    await query(
      `INSERT INTO students (name, email, phone, college, updated_at)
       VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
       ON CONFLICT (email)
       DO UPDATE SET
         name = COALESCE(EXCLUDED.name, students.name),
         phone = COALESCE(EXCLUDED.phone, students.phone),
         college = COALESCE(EXCLUDED.college, students.college),
         updated_at = CURRENT_TIMESTAMP`,
      [
        studentName?.trim() || 'Candidate',
        cleanEmail,
        studentPhone?.trim() || null,
        studentCollege?.trim() || null
      ]
    );

    // Save report
    const reportResult = await query(
      `INSERT INTO interview_reports (
        student_email,
        self_intro_text,
        self_intro_evaluation,
        chat_transcript,
        resume_structured,
        technical_quiz,
        evaluation_report
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        cleanEmail,
        selfIntroText || null,
        selfIntroEvaluation ? JSON.stringify(selfIntroEvaluation) : null,
        chatTranscript ? JSON.stringify(chatTranscript) : null,
        resumeStructured ? JSON.stringify(resumeStructured) : null,
        technicalQuiz ? JSON.stringify(technicalQuiz) : null,
        evaluationReport ? JSON.stringify(evaluationReport) : null
      ]
    );

    res.json({
      success: true,
      reportId: reportResult.rows[0].id,
      createdAt: reportResult.rows[0].created_at
    });
  } catch (err) {
    console.error('Error saving interview report:', err);
    res.status(500).json({ error: 'Failed to save interview report: ' + err.message });
  }
});

// Groq API Proxy
app.post('/api/groq', async (req, res) => {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'GROQ_API_KEY is not configured on the server. Please check backend/.env.'
      });
    }

    const {
      messages,
      model,
      temperature = 0.7,
      max_tokens = 1024,
      response_format
    } = req.body;

    const selectedModel = process.env.GROQ_MODEL || (model && model !== 'llama-3.3-70b-versatile' ? model : 'openai/gpt-oss-120b');

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    const bodyPayload = {
      model: selectedModel,
      messages,
      temperature,
      max_tokens
    };

    if (response_format) {
      bodyPayload.response_format = response_format;
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(bodyPayload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Groq API Error:', data);
      return res.status(response.status).json({
        error: data.error?.message || 'Groq API request failed',
        details: data
      });
    }

    res.json(data);
  } catch (err) {
    console.error('Groq Proxy Error:', err);
    res.status(500).json({ error: 'Internal error communicating with Groq: ' + err.message });
  }
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`The AI School API listening on port ${PORT}`);
    console.log(`Allowed CORS origins:`, allowedOrigins);
  });
}

module.exports = app;
