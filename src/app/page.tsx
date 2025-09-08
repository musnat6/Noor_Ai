'use client';

import { useState, useRef, useEffect } from 'react';
import { generateQuranicGuidance } from '@/ai/flows/generate-quranic-guidance';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Send } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Logo } from '@/components/icons';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function QuranGuidancePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);
  
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);


  const handleTextareaKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

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
    <main className="h-[calc(100dvh)] flex flex-col bg-muted/20">
      <div className="p-4 sm:p-6 border-b bg-background">
        <CardTitle className="font-headline text-3xl flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          NoorAI
        </CardTitle>
        <CardDescription className="text-base mt-1">
          Chat with NoorAI to receive advice rooted in Islamic teachings for
          your life situations.
        </CardDescription>
        <p className="text-sm text-muted-foreground mt-1">Built by Musnat.</p>
      </div>

      <ScrollArea className="flex-grow" viewportRef={viewportRef}>
        <div className="space-y-6 max-w-3xl mx-auto p-4 sm:p-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 text-base ${
                message.role === 'user' ? 'justify-end' : ''
              }`}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-9 w-9 border-2 border-primary bg-background shrink-0">
                  <Logo className="p-1.5" />
                </Avatar>
              )}
              <div
                className={`rounded-xl p-3 max-w-[85%] shadow-sm ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-4">
              <Avatar className="h-9 w-9 border-2 border-primary bg-background shrink-0">
                <Logo className="p-1.5" />
              </Avatar>
              <div className="rounded-lg p-3 bg-background shadow-sm flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse delay-0"></span>
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse delay-150"></span>
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse delay-300"></span>
              </div>
            </div>
          )}
          {error && <p className="text-destructive text-center">{error}</p>}
        </div>
      </ScrollArea>

      <div className="p-4 sm:p-6 border-t bg-background/50">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleTextareaKeyDown}
              placeholder="Describe your situation here..."
              disabled={isLoading}
              rows={1}
              className="text-base max-h-[150px] resize-none p-3 pr-16"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 shrink-0"
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
