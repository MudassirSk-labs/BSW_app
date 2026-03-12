'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { AIService } from '@/services/ai-service';
import { Card, CardContent } from '@/components/ui/card';

interface AIHelperProps {
  employees: any[];
  schedule: any;
}

export function AIHelper({ employees, schedule }: AIHelperProps) {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAnalysis = async () => {
    setIsLoading(true);
    const result = await AIService.analyzeSchedule(employees, schedule);
    setAnalysis(result);
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <Button 
        onClick={getAnalysis} 
        disabled={isLoading}
        variant="outline"
        className="w-full bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900 dark:text-indigo-400"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Sparkles className="w-4 h-4 mr-2" />
        )}
        Ask Groq AI to Analyze Coverage
      </Button>

      {analysis && (
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 animate-in fade-in slide-in-from-top-2 duration-300">
          <CardContent className="pt-6 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap">
            {analysis}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
