import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  JSONLinesLoader,
  JSONLoader,
} from "@langchain/classic/document_loaders/fs/json";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
import { DirectoryLoader } from "@langchain/classic/document_loaders/fs/directory";
import path from "path";
import { connectDB } from "@/config/db";
import { Settings } from "@/models/Settings";

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

    const GOOGLE_API_KEY =
      process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

    if (!GOOGLE_API_KEY) {
      console.error("AI API Key is not set in environment variables.");
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
      model: "gemini-1.5-flash",
      temperature: 0.7,
      maxOutputTokens: 2000,
      apiKey: GOOGLE_API_KEY,
    });

    try {
      // Load data from directory using absolute path
      let contextText = "No context data available.";
      try {
        const dataDirectory = path.join(process.cwd(), "data");
        const loader = new DirectoryLoader(dataDirectory, {
          ".json": (path) => new JSONLoader(path),
          ".jsonl": (path) => new JSONLinesLoader(path, "/html"),
          ".txt": (path) => new TextLoader(path),
        });
        const docs = await loader.load();
        if (docs.length > 0) {
          contextText = docs.map((doc) => doc.pageContent).join("\n");
        }

        // Fetch settings from DB and override/supplement context
        try {
          await connectDB();
          const settings = await Settings.findOne();
          if (settings) {
            contextText += "\n\nUpdated Personal & System Information from Database:\n" + JSON.stringify(settings, null, 2);
          }
        } catch (dbError) {
          console.error("Error fetching settings from DB for AI context:", dbError);
        }
      } catch (fileError) {
        console.error("Error loading data files:", fileError);
        // Continue without context if file loading fails
      }

      // Format the conversation properly
      const formattedHistory =
        history?.map((msg) => `${msg.role}: ${msg.content}`).join("\n") || "";

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
    } catch (innerError: unknown) {
      console.error("Model invocation error:", innerError);
      throw innerError; // Rethrow to be caught by outer catch
    }
  } catch (error: unknown) {
    console.error("AI message handling error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to process your request at the moment. Please try again.",
        error:
          process.env.NODE_ENV === "development"
            ? (error as Error).stack
            : undefined,
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
