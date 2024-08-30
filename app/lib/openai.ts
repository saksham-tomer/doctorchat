import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function generateImage(
  description: string
): Promise<string | undefined> {
  try {
    const response = await openai.createImage({
      prompt: description,
      n: 1,
      size: "256x256",
    });
    const data = await response.json();
    const image_url = data.data[0].url;
    return image_url as string;
  } catch (err) {
    console.log(err);
  }
}
