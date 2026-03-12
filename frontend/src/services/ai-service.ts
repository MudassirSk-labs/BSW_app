const BACKEND_URL = 'http://127.0.0.1:5000/api';

/**
 * AI Service for Schedule Optimization
 * Proxied via Node.js Backend API
 */
export const AIService = {
  async analyzeSchedule(employees: string, schedule: string): Promise<string> {
    const prompt = `
      Analyze the following employee schedule for a retail store and provide optimization suggestions:
      
      Employees:
      ${employees}
      
      Schedule:
      ${schedule}
      
      Focus on:
      1. Store coverage (ensure enough people are working each day).
      2. Fairness (distribution of off-days).
    `;

    try {
      const response = await fetch(`${BACKEND_URL}/ai/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error('AI analysis failed');
      const data = await response.json();
      return data.analysis;
    } catch (error) {
      console.error('AI Service Error:', error);
      return "I'm sorry, I couldn't analyze the schedule right now. Please check if the backend is running.";
    }
  },
};
