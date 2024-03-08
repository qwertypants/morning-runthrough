import {openaiInstance} from "@/app/lib/instance";

export const runtime = "edge";

export async function POST(req) {
  const {input} = await req.json();
  const res = await openaiInstance.audio.speech.create({
    model: "tts-1",
    voice: "nova",
    input,
  });

  const audio = await res.arrayBuffer();

  return new Response(audio, {
    headers: {
      "Content-Type": "audio/mpeg"
    }
  })
}
