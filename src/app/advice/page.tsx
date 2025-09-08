'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { personalizeIslamicAdvice } from '@/ai/flows/personalize-islamic-advice';
import { type PersonalizeIslamicAdviceOutput } from '@/ai/schemas';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';

const adviceFormSchema = z.object({
  situation: z
    .string()
    .min(10, { message: 'Please describe your situation in at least 10 characters.' }),
  personalValues: z
    .string()
    .min(5, { message: 'Please describe your values in at least 5 characters.' }),
  culturalContext: z
    .string()
    .min(3, { message: 'Please describe your context in at least 3 characters.' }),
  age: z.coerce.number().min(1, { message: 'Please enter a valid age.' }),
  gender: z.enum(['male', 'female', 'other'], {required_error: "Please select a gender."}),
});

type AdviceFormValues = z.infer<typeof adviceFormSchema>;

export default function PersonalizedAdvicePage() {
  const [result, setResult] = useState<PersonalizeIslamicAdviceOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<AdviceFormValues>({
    resolver: zodResolver(adviceFormSchema),
    defaultValues: {
      situation: '',
      personalValues: '',
      culturalContext: '',
      age: 18,
    },
  });

  async function onSubmit(data: AdviceFormValues) {
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await personalizeIslamicAdvice(data);
      setResult(response);
    } catch (err) {
      setError('Failed to get personalized advice. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-8">
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl flex items-center gap-2">
            <Sparkles className="text-accent" />
            Personalized Advice
          </CardTitle>
          <CardDescription className="text-base">
            Share some details about yourself and your situation for tailored
            guidance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="situation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Your Situation</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the challenge or question you're facing."
                        {...field}
                        rows={5}
                        className="text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personalValues"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Personal Values</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., family, honesty, compassion"
                        {...field}
                        className="text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="culturalContext"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Cultural Context</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., living in a Western country, student"
                        {...field}
                        className="text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Age</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} className="text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="text-base">
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">
                            Prefer not to say / Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isLoading} size="lg" className="w-full sm:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Finding a path...
                  </>
                ) : (
                  'Get Personalized Advice'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex justify-center items-center text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Thinking...
        </div>
      )}

      {error && <p className="text-destructive text-center">{error}</p>}

      {result && (
        <div className="w-full max-w-3xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">
                Your Personalized Guidance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-base">{result.advice}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">
                Relevant Qur'anic Verses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-base">
                {result.relevantQuranicVerses}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Relevant Hadith</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-base">{result.relevantHadith}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Explanation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-base">{result.explanation}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
