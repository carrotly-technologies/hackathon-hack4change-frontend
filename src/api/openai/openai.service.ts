import OpenAI from 'openai';

export interface TrashPoint {
  lat: string;
  lon: string;
}

export interface TrashAnalysis {
  thoughts: string;
  insights: string[];
  recommendations: string[];
  environmentalImpact: string;
}

class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async analyzeTrashPoints(trashPoints: TrashPoint[]): Promise<TrashAnalysis> {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = this.buildAnalysisPrompt(trashPoints);

    try {
      const completion = await this.openai.chat.completions.create({
        model: "o4-mini",
        messages: [
          {
            role: "system",
            content: "You are an environmental expert analyzing trash collection data. Provide thoughtful insights about the distribution and patterns of trash locations."
          },
          {
            role: "user",
            content: prompt
          }
        ],
      });

      const response = completion.choices[0]?.message?.content;
      
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      return this.parseAnalysisResponse(response);
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to analyze trash points');
    }
  }

  private buildAnalysisPrompt(trashPoints: TrashPoint[]): string {
    const totalPoints = trashPoints.length;
    const coordinates = trashPoints.map(point => `(${point.lat}, ${point.lon})`).join(', ');
    
    return `
Analyze the following trash collection data and provide comprehensive thoughts:

Total trash points: ${totalPoints}
Coordinates: ${coordinates}

Please provide:
1. General thoughts about the trash distribution pattern
2. Key insights about the data
3. Recommendations for improvement
4. Environmental impact assessment

Format your response as JSON with the following structure:
{
  "thoughts": "Your general thoughts about the trash points",
  "insights": ["insight 1", "insight 2", "insight 3"],
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"],
  "environmentalImpact": "Assessment of environmental impact"
}
    `;
  }

  private parseAnalysisResponse(response: string): TrashAnalysis {
    try {
      // Try to extract JSON from the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback parsing if JSON extraction fails
      return {
        thoughts: response,
        insights: ['Analysis completed successfully'],
        recommendations: ['Review the generated thoughts for specific recommendations'],
        environmentalImpact: 'Impact assessment included in thoughts'
      };
    } catch (error) {
      console.error('Failed to parse OpenAI response:', error);
      return {
        thoughts: response,
        insights: ['Analysis completed successfully'],
        recommendations: ['Review the generated thoughts for specific recommendations'],
        environmentalImpact: 'Impact assessment included in thoughts'
      };
    }
  }
}

export const openAIService = new OpenAIService(); 