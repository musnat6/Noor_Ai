'use client';

import { useState } from 'react';
import { extractHadithInsights } from '@/ai/flows/extract-hadith-insights';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';

export default function HadithInsightPage() {
  const [hadith, setHadith] = useState('');
  const [insight, setInsight] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hadith.trim()) return;

    setIsLoading(true);
    setError('');
    setInsight('');

    try {
      const result = await extractHadithInsights({ hadithText: hadith });
      setInsight(result.insights);
    } catch (err) {
      setError('Failed to get insights. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl flex items-center gap-2">
            <Sparkles className="text-accent" />
            Hadith Insight
          </CardTitle>
          <CardDescription className="text-base">
            Enter a Hadith to receive detailed explanations and context from
            major collections.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full gap-4">
              <Textarea
                placeholder="Enter the text of the Hadith here..."
                value={hadith}
                onChange={(e) => setHadith(e.target.value)}
                rows={5}
                disabled={isLoading}
                className="text-base"
              />
              <Button
                type="submit"
                disabled={isLoading || !hadith.trim()}
                className="w-full sm:w-auto"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Get Insight'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        {(isLoading || insight || error) && (
          <CardFooter className="flex flex-col items-start gap-4">
            {insight && (
              <div className="p-4 bg-secondary/50 rounded-lg w-full">
                <h3 className="font-headline text-xl mb-2 text-primary">
                  Insights from NoorAI
                </h3>
                <p className="whitespace-pre-wrap text-foreground/90 text-base">
                  {insight}
                </p>
              </div>
            )}
            {error && <p className="text-destructive">{error}</p>}
          </CardFooter>
        )}
      </Card>
    </main>
  );
}
