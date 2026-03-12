import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'MISSING_API_KEY',
});

/**
 * Backend Service for AI Operations
 * Decoupled from the UI to ensure scalability
 */
export const AIService = {
  async analyzeSchedule(employees: any[], schedule: any[]) {
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a workforce management expert for BSW Store. Analyze the 14-day schedule and provide a brief optimization summary. Mention any days with low coverage. Tuesdays and Wednesdays usually need more staff.'
          },
          {
            role: 'user',
            content: `Analyze this workforce: ${JSON.stringify(employees)}. Current schedule summary: ${JSON.stringify(schedule)}`
          }
        ],
        model: 'mixtral-8x7b-32768',
      });

      return chatCompletion.choices[0]?.message?.content || "No analysis available.";
    } catch (error) {
      console.error('Groq AI Error:', error);
      return "AI analysis unavailable (Check Groq API Key).";
    }
  }
};
