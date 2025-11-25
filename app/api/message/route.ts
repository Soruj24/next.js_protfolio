import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  JSONLinesLoader,
  JSONLoader,
} from "@langchain/classic/document_loaders/fs/json";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
import { DirectoryLoader } from "@langchain/classic/document_loaders/fs/directory";

interface AIRequestBody {
  message: string;
  history?: Array<{ role: string; content: string }>;
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = (await request.json()) as AIRequestBody;

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
        {
          success: false,
          message:
            "AI service is currently unavailable. Please try again later.",
        },
        { status: 503 }
      );
    }

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      temperature: 0.7,
      maxOutputTokens: 2000,
      apiKey: GOOGLE_API_KEY,
    });

    try {
      // Load data from directory
      const loader = new DirectoryLoader("./data", {
        ".json": (path) => new JSONLoader(path),
        ".jsonl": (path) => new JSONLinesLoader(path, "/html"),
        ".txt": (path) => new TextLoader(path),
      });
      const docs = await loader.load();

      // Format the conversation properly
      const formattedHistory =
        history?.map((msg) => `${msg.role}: ${msg.content}`).join("\n") || "";

      // Create the prompt with context from loaded data and conversation history
      const contextText =
        docs.length > 0
          ? docs.map((doc) => doc.pageContent).join("\n")
          : "No context data available.";

      const prompt = `
Context from data:
${contextText}

${formattedHistory ? `Conversation history:\n${formattedHistory}\n\n` : ""}
User: ${message}

Assistant:`;

      // Invoke the model with the proper prompt
      const aiResponse = await model.invoke([
        {
          role: "user",
          content: prompt,
        },
      ]);

      return NextResponse.json({
        success: true,
        response: aiResponse.content,
      });
    } catch (fileError) {
      console.error("Error loading data files:", fileError);
      // If file loading fails, continue without context
      const formattedHistory =
        history?.map((msg) => `${msg.role}: ${msg.content}`).join("\n") || "";

      const prompt = `${
        formattedHistory ? `Conversation history:\n${formattedHistory}\n\n` : ""
      }User: ${message}\n\nAssistant:`;

      const aiResponse = await model.invoke([
        {
          role: "user",
          content: prompt,
        },
      ]);

      return NextResponse.json({
        success: true,
        response: aiResponse.content,
      });
    }
  } catch (error: unknown) {
    console.error("AI message handling error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to process your request at the moment. Please try again.",
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
