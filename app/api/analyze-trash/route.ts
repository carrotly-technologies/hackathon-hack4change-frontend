import { NextRequest, NextResponse } from 'next/server';
import { openAIService, TrashPoint } from '../../../src/api/openai/openai.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { trashPoints }: { trashPoints: TrashPoint[] } = body;

    if (!trashPoints || !Array.isArray(trashPoints)) {
      return NextResponse.json(
        { error: 'Invalid trash points data' },
        { status: 400 }
      );
    }

    if (trashPoints.length === 0) {
      return NextResponse.json(
        { error: 'No trash points provided' },
        { status: 400 }
      );
    }

    const analysis = await openAIService.analyzeTrashPoints(trashPoints);

    return NextResponse.json({
      success: true,
      analysis,
      metadata: {
        totalPoints: trashPoints.length,
        analyzedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('API route error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 