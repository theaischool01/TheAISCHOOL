const bcrypt = require('bcryptjs');
const { query, pool } = require('./db');

async function migrate() {
  console.log('--- Starting Database Migration on Neon Postgres ---');

  // 1. Create students table
  await query(`
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      phone VARCHAR(50),
      college VARCHAR(255),
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log('✓ Created/verified table: students');

  // 2. Create interview_reports table
  await query(`
    CREATE TABLE IF NOT EXISTS interview_reports (
      id SERIAL PRIMARY KEY,
      student_email VARCHAR(255) NOT NULL REFERENCES students(email) ON DELETE CASCADE,
      self_intro_text TEXT,
      self_intro_evaluation JSONB,
      chat_transcript JSONB,
      resume_structured JSONB,
      technical_quiz JSONB,
      evaluation_report JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log('✓ Created/verified table: interview_reports');

  // 3. Create AdminUser table (matching previous schema)
  await query(`
    CREATE TABLE IF NOT EXISTS "AdminUser" (
      "id" VARCHAR(255) PRIMARY KEY,
      "name" VARCHAR(255) NOT NULL,
      "email" VARCHAR(255) UNIQUE NOT NULL,
      "passwordHash" VARCHAR(255) NOT NULL,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log('✓ Created/verified table: "AdminUser"');

  // 4. Create Session table (matching previous schema)
  await query(`
    CREATE TABLE IF NOT EXISTS "Session" (
      "id" VARCHAR(255) PRIMARY KEY,
      "adminId" VARCHAR(255) NOT NULL REFERENCES "AdminUser"("id") ON DELETE CASCADE,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "expiresAt" TIMESTAMPTZ NOT NULL
    );
  `);
  console.log('✓ Created/verified table: "Session"');

  // 5. Seed Admin User
  const adminEmail = 'admin@theaischool.com';
  const adminPassword = 'Admin@TheAISchool2026!';
  const existingAdmin = await query('SELECT * FROM "AdminUser" WHERE email = $1', [adminEmail]);

  if (existingAdmin.rows.length === 0) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    const adminId = 'admin_' + Date.now();
    await query(
      `INSERT INTO "AdminUser" ("id", "name", "email", "passwordHash") VALUES ($1, $2, $3, $4)`,
      [adminId, 'System Admin', adminEmail, passwordHash]
    );
    console.log(`✓ Created initial AdminUser: ${adminEmail} (password: ${adminPassword})`);
  } else {
    console.log(`ℹ AdminUser ${adminEmail} already exists.`);
  }

  console.log('--- Migration Completed Successfully ---');
}

if (require.main === module) {
  migrate()
    .then(() => pool.end())
    .catch((err) => {
      console.error('Migration failed:', err);
      pool.end();
      process.exit(1);
    });
}

module.exports = { migrate };
