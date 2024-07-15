import {ChatOpenAI} from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config({path: '.env'});
const openAiModel = 'gpt-4o';

const model = new ChatOpenAI({
    model: openAiModel,
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0, // TODO: Explain temperature
});

const prompt = `What is the best meal to eat for breakfast? Provide only one answer, and one sentence justifying why.`;

(async () => {
    const result = await model.invoke(prompt);
    console.log({result});
})();