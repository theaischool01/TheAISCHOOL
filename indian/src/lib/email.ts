import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { prisma } from '@/lib/prisma';

// Setup AWS SES Client
const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'MOCK_KEY',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'MOCK_SECRET',
  },
});

interface EmailParams {
  leadId: string;
  recipientEmail: string;
  candidateName: string;
  overallScore: number;
  aiReadiness: number;
  technicalFoundation: number;
  recommendedCourse: string;
  confidenceScore: number;
  skillGapSummary: {
    currentSkills: string[];
    missingSkills: string[];
  };
}

export function generateEmailHtml(params: EmailParams): string {
  const currentSkillsMarkup = params.skillGapSummary.currentSkills
    .map((s) => `<li style="margin-bottom: 6px; color: #15803d;">✓ ${s}</li>`)
    .join('');

  const missingSkillsMarkup = params.skillGapSummary.missingSkills
    .map((s) => `<li style="margin-bottom: 6px; color: #b91c1c;">✗ ${s}</li>`)
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your AI Career Report</title>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; color: #171717; margin: 0; padding: 20px; }
        .container { max-width: 600px; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 16px; padding: 40px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
        .header { text-align: center; border-bottom: 2px solid #EE1C25; padding-bottom: 20px; margin-bottom: 30px; }
        .brand { font-size: 20px; font-weight: 900; tracking: -0.5px; text-transform: uppercase; color: #171717; }
        .brand span { color: #EE1C25; }
        h1 { font-size: 24px; font-weight: 800; text-align: center; margin-top: 0; }
        .score-box { background-color: #fcfcfc; border: 1px solid #f0f0f0; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 30px; }
        .overall-score { font-size: 48px; font-weight: 900; color: #EE1C25; line-height: 1; }
        .metrics-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 15px; margin-bottom: 30px; }
        .metric-card { background-color: #fafafa; border: 1px solid #f0f0f0; border-radius: 10px; padding: 15px; text-align: center; }
        .metric-val { font-size: 20px; font-weight: 800; color: #171717; }
        .recommendation { background-color: #fff5f5; border: 1px solid #ffebeb; border-radius: 12px; padding: 25px; margin-bottom: 30px; }
        .rec-title { font-size: 18px; font-weight: 800; color: #EE1C25; margin-top: 0; }
        .btn { display: block; text-align: center; background-color: #EE1C25; color: #ffffff !important; text-decoration: none; font-weight: 800; font-size: 14px; text-transform: uppercase; padding: 15px 25px; border-radius: 10px; margin-bottom: 15px; transition: background-color 0.2s; }
        .btn-secondary { background-color: #171717; }
        .btn-tertiary { background-color: #ffffff; color: #6b7280 !important; border: 1px solid #e5e5e5; }
        .footer { font-size: 11px; text-align: center; color: #9ca3af; border-top: 1px solid #f0f0f0; padding-top: 20px; margin-top: 40px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="brand">THE <span>AI</span> SCHOOL</div>
        </div>
        
        <h1>Your AI Career Report</h1>
        <p>Dear ${params.candidateName},</p>
        <p>Thank you for completing the AI Career Path Assessment. We have analyzed your results and mapped your career readiness score parameters.</p>
        
        <div class="score-box">
          <div class="overall-score">${params.overallScore}%</div>
          <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280; margin-top: 5px;">Overall Readiness</div>
        </div>

        <div class="metrics-grid">
          <div class="metric-card">
            <div style="font-size: 11px; color: #6b7280; font-weight: bold;">AI Readiness</div>
            <div class="metric-val">${params.aiReadiness}%</div>
          </div>
          <div class="metric-card">
            <div style="font-size: 11px; color: #6b7280; font-weight: bold;">Technical Foundation</div>
            <div class="metric-val">${params.technicalFoundation}%</div>
          </div>
        </div>

        <div class="recommendation">
          <div class="rec-title">${params.recommendedCourse}</div>
          <p style="font-size: 12px; color: #4b5563; margin-bottom: 0;">Match Confidence: <strong>${params.confidenceScore}%</strong></p>
          
          <h4 style="font-size: 12px; text-transform: uppercase; margin-top: 20px; margin-bottom: 10px; color: #6b7280;">Skill Gap Analysis</h4>
          <div style="font-size: 13px;">
            <ul style="padding-left: 20px; margin: 0;">
              ${currentSkillsMarkup}
              ${missingSkillsMarkup}
            </ul>
          </div>
        </div>

        <div style="margin-top: 30px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/assessment-leads" class="btn">View Full Results</a>
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/courses" class="btn btn-secondary">Enroll in Recommended Course</a>
          <a href="https://calendly.com" class="btn btn-tertiary">Book Career Guidance Session</a>
        </div>

        <div class="footer">
          &copy; ${new Date().getFullYear()} The AI School. All rights reserved. <br/>
          Secure Data Ingestion Active • Role-Routed Pipeline
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function sendAssessmentEmail(params: EmailParams) {
  const senderEmail = process.env.SES_SENDER_EMAIL || 'admissions@theaischool.com';
  const htmlContent = generateEmailHtml(params);

  console.log(`[EmailService] Attempting to send report to ${params.recipientEmail}`);

  // Check if credentials are mock/default
  const isMock = 
    process.env.AWS_ACCESS_KEY_ID === undefined || 
    process.env.AWS_SECRET_ACCESS_KEY === undefined || 
    process.env.SES_SENDER_EMAIL === undefined;

  if (isMock) {
    console.warn('[EmailService] AWS SES credentials missing. Logging email contents & simulating delivery...');
    // Create log inside PostgreSQL
    try {
      await prisma.assessmentEmailLog.create({
        data: {
          assessmentLeadId: params.leadId,
          emailType: 'ASSESSMENT_COMPLETED',
          status: 'SENT',
          error: 'SIMULATED: Credentials not configured',
        },
      });
      console.log('[EmailService] Simulated delivery log created in database.');
    } catch (dbErr) {
      console.error('[EmailService] Failed to create simulated log:', dbErr);
    }
    return { success: true, simulated: true };
  }

  try {
    const command = new SendEmailCommand({
      Source: senderEmail,
      Destination: {
        ToAddresses: [params.recipientEmail],
      },
      Message: {
        Subject: {
          Data: 'Your AI Career Assessment Report',
        },
        Body: {
          Html: {
            Data: htmlContent,
          },
        },
      },
    });

    const response = await sesClient.send(command);
    console.log(`[EmailService] SES Send completed. Msg ID: ${response.MessageId}`);

    // Log success
    await prisma.assessmentEmailLog.create({
      data: {
        assessmentLeadId: params.leadId,
        emailType: 'ASSESSMENT_COMPLETED',
        status: 'SENT',
      },
    });

    return { success: true, messageId: response.MessageId };
  } catch (error: any) {
    console.error('[EmailService] SES Send failed:', error);
    
    // Log failure
    try {
      await prisma.assessmentEmailLog.create({
        data: {
          assessmentLeadId: params.leadId,
          emailType: 'ASSESSMENT_COMPLETED',
          status: 'FAILED',
          error: error.message,
        },
      });
    } catch (logErr) {
      console.error('[EmailService] Failed to write failure log to database:', logErr);
    }

    return { success: false, error: error.message };
  }
}
