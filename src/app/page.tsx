'use client';

import { useState } from 'react';
import { generateQuranicGuidance } from '@/ai/flows/generate-quranic-guidance';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Logo } from '@/components/icons';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function QuranGuidancePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const result = await generateQuranicGuidance({
        history: messages,
        lifeSituation: input,
      });
      const assistantMessage: Message = {
        role: 'assistant',
        content: result.advice,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError('Failed to get guidance. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-full flex flex-col">
      <div className="p-4 sm:p-6">
        <CardHeader className="p-0">
          <CardTitle className="font-headline text-3xl flex items-center gap-2">
            <Sparkles className="text-accent" />
            Qur'an & Sunnah Guidance
          </CardTitle>
          <CardDescription className="text-base">
            Chat with NoorAI to receive advice rooted in Islamic teachings for
            your life situations.
          </CardDescription>
        </CardHeader>
      </div>

      <ScrollArea className="flex-grow p-4 sm:p-6">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 ${
                message.role === 'user' ? 'justify-end' : ''
              }`}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <Logo className="p-1" />
                </Avatar>
              )}
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary'
                }`}
              >
                <p className="whitespace-pre-wrap text-base">
                  {message.content}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10 border-2 border-primary">
                <Logo className="p-1" />
              </Avatar>
              <div className="rounded-lg p-3 bg-secondary">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
          )}
          {error && <p className="text-destructive text-center">{error}</p>}
        </div>
      </ScrollArea>

      <div className="p-4 sm:p-6 border-t bg-background">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your situation here..."
              disabled={isLoading}
              className="text-base h-12"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              size="icon"
              className="h-12 w-12 shrink-0"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
