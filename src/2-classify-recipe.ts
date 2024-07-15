import {ChatPromptTemplate} from "@langchain/core/prompts";
import {ChatOpenAI} from "@langchain/openai";
import dotenv from "dotenv";
import {categories} from "./categories";

dotenv.config({path: '.env'});
const openAiModel = 'gpt-3.5-turbo';

const model = new ChatOpenAI({
    model: openAiModel,
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
});

const prompt = ChatPromptTemplate.fromMessages([
    ['system', `When the human provides the name of the recipe, you must classify it into one of the following categories: ${categories.join(', ')}`],
    ['human', `Coconut Prawns with Crushed Chickpeas & Basil`], // TODO Replace with parameters
]);

(async () => {
    const result = await model.invoke(await prompt.invoke({}));
    console.log({result});
})();