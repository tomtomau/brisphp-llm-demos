import {ChatOpenAI} from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config({path: '.env'});
const openAiModel = 'gpt-4o';

const model = new ChatOpenAI({
    model: openAiModel,
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
});

(async () => {
    const result = await model.invoke('Hello world!');
    console.log({result});
})();