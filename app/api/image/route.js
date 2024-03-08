import {openaiInstance} from "@/app/lib/instance";

export const runtime = "edge";

export async function POST(req) {
  try {
    const {prompt} = await req.json();

    const image = await openaiInstance.images.generate({
      model: "dall-e-2",
      size: "512x512",
      prompt,
    });

    return new Response(image.data[0].url);

  } catch (error) {
    console.error(error);
  }
}
