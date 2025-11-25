import { NextRequest, NextResponse } from 'next/server';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

interface AIRequestBody {
  message: string;
  history?: Array<{ role: string; content: string }>;
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json() as AIRequestBody;

    if (!message) {
      return NextResponse.json(
        { success: false, message: "Message is required" },
        { status: 400 }
      );
    }

    const GOOGLE_API_KEY: string | undefined = process.env.GOOGLE_API_KEY;

    if (!GOOGLE_API_KEY) {
      console.error("GOOGLE_API_KEY is not set in environment variables.");
      return NextResponse.json(
        { success: false, message: "AI service is currently unavailable. Please try again later." },
        { status: 503 }
      );
    }

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      temperature: 0.7,
      maxOutputTokens: 2000,
      apiKey: GOOGLE_API_KEY,
    });

    // Enhanced prompt with portfolio context
    const portfolioContext = `
You are Soruj Mahmud's AI assistant. Soruj is a full-stack developer specializing in:
- LangChain and AI applications
- MCP Server development
- Next.js, React, TypeScript
- MongoDB, Node.js
- Modern web technologies

Key information about Soruj:
- Email: sorujmahmudb2h@gmail.com
- Phone: +8801795397598
- Location: Nagur Pur, Tangail, Dhaka, Bangladesh
- Experience: 3+ years in web development
- Education: HSC Science background
- Skills: Full-stack development, AI integration, modern frameworks

Please provide helpful, professional responses about Soruj's:
1. Projects and technical implementations
2. Skills and technology stack
3. Work experience and background
4. Contact information
5. Education and certifications

Be concise but informative. If you're unsure about specific details, direct them to contact Soruj directly.

${history && history.length > 0 ? `Conversation history: ${JSON.stringify(history)}\n\n` : ''}
User message: ${message}
`;

    const aiResponse = await model.invoke(portfolioContext);
    
    return NextResponse.json({
      success: true,
      response: aiResponse.content
    });
    
  } catch (error: unknown) {
    console.error('AI message handling error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Unable to process your request at the moment. Please try again.' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, message: "Method not allowed" },
    { status: 405 }
  );
}