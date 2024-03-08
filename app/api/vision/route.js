import {openaiInstance} from "@/app/lib/instance";

export const runtime = "edge";

export async function POST(req) {
  try {
    const {url} = await req.json();

    const response = await openaiInstance.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {type: "text", text: "Caption this image"},
            {
              type: "image_url",
              image_url: {url}
            }
          ]
        }
      ]
    });

    return new Response(response.choices[0].message.content);


  } catch (error) {
    console.error(error);
  }
}
