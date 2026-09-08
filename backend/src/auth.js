const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { query } = require('./db');

const JWT_SECRET = process.env.JWT_SECRET || 'theaischool-secret-key-2026';

// Generate session ID
function generateSessionId() {
  return 'sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Authenticate admin user with email and password
async function loginAdmin(email, password) {
  const result = await query('SELECT * FROM "AdminUser" WHERE email = $1', [email]);
  if (result.rows.length === 0) {
    throw new Error('Invalid email or password');
  }

  const admin = result.rows[0];
  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  const sessionId = generateSessionId();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await query(
    'INSERT INTO "Session" ("id", "adminId", "expiresAt") VALUES ($1, $2, $3)',
    [sessionId, admin.id, expiresAt]
  );

  const token = jwt.sign(
    { sessionId, adminId: admin.id, email: admin.email, name: admin.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    token,
    sessionId,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email
    }
  };
}

// Express middleware to verify admin auth
async function requireAdmin(req, res, next) {
  try {
    const authHeader = req.headers['authorization'] || '';
    let token = '';

    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    } else if (req.headers['x-session-id']) {
      token = req.headers['x-session-id'];
    }

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token or session provided' });
    }

    // Try decoding JWT first
    let adminId = null;
    let sessionId = null;

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      adminId = decoded.adminId;
      sessionId = decoded.sessionId;
    } catch {
      // If not a JWT, maybe raw sessionId was provided
      sessionId = token;
    }

    // Validate active session in DB
    if (sessionId) {
      const sessionResult = await query(
        `SELECT s.id, s."expiresAt", a.id as admin_id, a.name, a.email
         FROM "Session" s
         JOIN "AdminUser" a ON s."adminId" = a.id
         WHERE s.id = $1 AND s."expiresAt" > CURRENT_TIMESTAMP`,
        [sessionId]
      );

      if (sessionResult.rows.length === 0) {
        return res.status(401).json({ error: 'Unauthorized: Session expired or invalid' });
      }

      req.admin = {
        id: sessionResult.rows[0].admin_id,
        name: sessionResult.rows[0].name,
        email: sessionResult.rows[0].email
      };
      return next();
    }

    if (adminId) {
      const adminResult = await query(
        'SELECT id, name, email FROM "AdminUser" WHERE id = $1',
        [adminId]
      );
      if (adminResult.rows.length === 0) {
        return res.status(401).json({ error: 'Unauthorized: Admin user not found' });
      }
      req.admin = adminResult.rows[0];
      return next();
    }

    return res.status(401).json({ error: 'Unauthorized: Invalid credentials' });
  } catch (err) {
    console.error('Auth verification error:', err);
    return res.status(401).json({ error: 'Unauthorized: ' + err.message });
  }
}

module.exports = {
  loginAdmin,
  requireAdmin,
  JWT_SECRET
};
