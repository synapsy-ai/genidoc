import OpenAI from "openai";

export async function getModels(key: string): Promise<string[]> {
  const openai = new OpenAI({
    apiKey: key,
    dangerouslyAllowBrowser: true, // defaults to process.env["OPENAI_API_KEY"]
  });
  let models = await openai.models.list();
  const modelsString: string[] = [];
  models.data.forEach((el) => {
    modelsString.push(el.id);
  });
  return modelsString;
}
