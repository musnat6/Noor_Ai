
import { generateQuranicGuidance } from '@/ai/flows/generate-quranic-guidance';
import { type Message } from '@/app/page';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { history, lifeSituation } = (await req.json()) as {
      history: Message[];
      lifeSituation: string;
    };

    if (!lifeSituation) {
      return NextResponse.json(
        { error: 'lifeSituation is required' },
        { status: 400 }
      );
    }
    
    // Call the existing Genkit flow
    const result = await generateQuranicGuidance({
      history: history || [],
      lifeSituation,
    });

    return NextResponse.json({ advice: result.advice });

  } catch (err: any) {
    console.error("Server API Error:", err);
    return NextResponse.json(
      { error: err.message || "An unknown server error occurred." },
      { status: 500 }
    );
  }
}
