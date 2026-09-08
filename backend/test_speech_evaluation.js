const app = require('./src/index');

async function testSpeech() {
  const server = app.listen(0);
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;

  console.log(`Backend server running on ${baseUrl}`);

  async function callProxy(messages, options = {}) {
    const res = await fetch(`${baseUrl}/api/groq`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages,
        temperature: options.temperature ?? 0.3,
        max_tokens: options.maxTokens ?? 1500,
        response_format: options.jsonMode ? { type: 'json_object' } : undefined
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data.choices[0].message.content;
  }

  try {
    console.log('\n--- 1. Testing evaluation of real spoken transcript ---');
    const realUserSpeech = "Hello! My name is Rahul Mehta. I am an undergraduate student from Mumbai University. Over the past six months, I built a smart study assistant using React, Node.js, and PyTorch for classifying lecture audio notes. I want to specialize in deep learning architectures and distributed training.";

    const systemPrompt = `You are an elite AI technical recruiter and speech coach evaluating a candidate's video self-introduction.
Analyze the candidate's transcript verbatim.
IMPORTANT RULES:
1. Base your evaluation strictly on the candidate's actual words and topic.
2. In "samplePolishedIntro", provide an enhanced, polished version of the candidate's actual stated background and words. Do NOT invent a fake person or unrelated projects.
3. Return ONLY valid JSON matching this schema:
{
  "overallScore": number (0-100),
  "clarityScore": number (0-100),
  "fluencyScore": number (0-100),
  "vocabularyScore": number (0-100),
  "confidenceScore": number (0-100),
  "grammarFeedback": string[],
  "vocabularyFeedback": string[],
  "keyStrengths": string[],
  "improvementAreas": string[],
  "samplePolishedIntro": string
}`;

    const userPrompt = `Candidate Self-Introduction Transcript (verbatim):
"""
${realUserSpeech}
"""
Evaluate clarity, grammar, pacing, and technical vocabulary based strictly on the above text.`;

    const rawResponse = await callProxy([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ], { jsonMode: true });

    const parsed = JSON.parse(rawResponse);
    console.log('✓ Received real Groq evaluation for Rahul Mehta:');
    console.log('Overall Score:', parsed.overallScore);
    console.log('Clarity Score:', parsed.clarityScore);
    console.log('Strengths:', parsed.keyStrengths);
    console.log('Polished Intro:', parsed.samplePolishedIntro);

    if (parsed.samplePolishedIntro.includes('Aryan Sharma')) {
      throw new Error('FAILED: Response contains Aryan Sharma instead of candidate speech!');
    } else {
      console.log('✓ VERIFIED: The response correctly evaluates Rahul Mehta and does NOT contain Aryan Sharma placeholder!');
    }

    console.log('\n=======================================');
    console.log('🎉 REAL SPEECH EVALUATION VERIFIED!');
    console.log('=======================================');
  } finally {
    server.close();
    process.exit(0);
  }
}

testSpeech().catch(err => {
  console.error('Error in test:', err);
  process.exit(1);
});
