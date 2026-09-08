const http = require('http');
const app = require('./src/index');

async function runTest() {
  const server = app.listen(0);
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;

  console.log(`Test server running on ${baseUrl}`);

  function makeRequest(path, options = {}) {
    return new Promise((resolve, reject) => {
      const url = new URL(path, baseUrl);
      const reqOptions = {
        method: options.method || 'GET',
        headers: options.headers || {}
      };

      const req = http.request(url, reqOptions, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          let json = null;
          try { json = JSON.parse(data); } catch {}
          resolve({ status: res.statusCode, body: json || data });
        });
      });

      req.on('error', reject);

      if (options.body) {
        req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
      }
      req.end();
    });
  }

  try {
    console.log('\n--- 1. Testing GET /api/reports without auth ---');
    const noAuthRes = await makeRequest('/api/reports');
    console.log(`Status: ${noAuthRes.status}`);
    if (noAuthRes.status !== 401) {
      throw new Error(`Expected 401 for unauthenticated request, got ${noAuthRes.status}`);
    }
    console.log('✓ Successfully blocked unauthenticated request (401)');

    console.log('\n--- 2. Testing login with wrong password ---');
    const badLoginRes = await makeRequest('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: 'admin@theaischool.com', password: 'wrongpassword' }
    });
    console.log(`Status: ${badLoginRes.status}`);
    if (badLoginRes.status !== 401) {
      throw new Error(`Expected 401 for bad login, got ${badLoginRes.status}`);
    }
    console.log('✓ Successfully rejected invalid password (401)');

    console.log('\n--- 3. Testing login with valid admin credentials ---');
    const loginRes = await makeRequest('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: 'admin@theaischool.com', password: 'Admin@TheAISchool2026!' }
    });
    console.log(`Status: ${loginRes.status}`);
    if (loginRes.status !== 200 || !loginRes.body.token) {
      throw new Error(`Login failed: ${JSON.stringify(loginRes.body)}`);
    }
    const token = loginRes.body.token;
    const sessionId = loginRes.body.sessionId;
    console.log('✓ Successfully logged in. Token and session ID obtained.');
    console.log(`Admin info:`, loginRes.body.admin);

    console.log('\n--- 4. Testing GET /api/reports with JWT Bearer token ---');
    const authRes = await makeRequest('/api/reports', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log(`Status: ${authRes.status}`);
    console.log(`Body:`, authRes.body);
    if (authRes.status !== 200 || typeof authRes.body.total !== 'number') {
      throw new Error(`Failed to fetch reports with Bearer token: ${JSON.stringify(authRes.body)}`);
    }
    console.log('✓ Successfully authenticated GET /api/reports via Bearer token (200 OK)');

    console.log('\n--- 5. Testing GET /api/reports with Session ID ---');
    const sessRes = await makeRequest('/api/reports', {
      headers: { 'x-session-id': sessionId }
    });
    console.log(`Status: ${sessRes.status}`);
    if (sessRes.status !== 200) {
      throw new Error(`Failed to fetch reports with x-session-id: ${JSON.stringify(sessRes.body)}`);
    }
    console.log('✓ Successfully authenticated GET /api/reports via x-session-id (200 OK)');

    console.log('\n--- 6. Testing student upsert and report creation ---');
    const studentRes = await makeRequest('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'Test Candidate',
        email: 'test.candidate@theaischool.co',
        phone: '+919876543210',
        college: 'Test Engineering College'
      }
    });
    console.log(`Student Upsert Status: ${studentRes.status}`);
    if (studentRes.status !== 200) throw new Error('Student upsert failed');

    const saveInterviewRes = await makeRequest('/api/save-interview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        studentEmail: 'test.candidate@theaischool.co',
        studentName: 'Test Candidate',
        studentPhone: '+919876543210',
        studentCollege: 'Test Engineering College',
        selfIntroText: 'Hello, I am interested in AI engineering and full-stack development.',
        selfIntroEvaluation: { score: 85, feedback: 'Clear diction and confident delivery.' },
        chatTranscript: [{ role: 'mentor', content: 'Tell me about yourself.' }],
        resumeStructured: { skills: ['Python', 'PyTorch', 'Next.js'] },
        technicalQuiz: { score: 4, total: 5 },
        evaluationReport: { overallScore: 88, readiness: 'Industry Ready' }
      }
    });
    console.log(`Save Interview Status: ${saveInterviewRes.status}`);
    if (saveInterviewRes.status !== 200) throw new Error('Save interview failed');

    console.log('\n--- 7. Verifying reports list now contains the saved interview ---');
    const reportsListRes = await makeRequest('/api/reports', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log(`Total reports now: ${reportsListRes.body.total}`);
    if (reportsListRes.body.total < 1) throw new Error('Expected at least 1 report in DB');
    console.log('✓ Retrieved saved candidate report successfully!');

    console.log('\n========================================');
    console.log('🎉 ALL BACKEND AUTH & DB TESTS PASSED!');
    console.log('========================================');
  } finally {
    server.close();
    process.exit(0);
  }
}

runTest().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
