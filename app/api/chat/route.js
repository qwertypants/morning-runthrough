import { OpenAIStream, StreamingTextResponse } from "ai";
import { openaiInstance } from "@/app/lib/instance";

export const runtime = "edge";

export async function POST(req) {
  const { messages } = await req.json();

  const response = await openaiInstance.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    stream: true,
    messages,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
