import {ChatPromptTemplate} from "@langchain/core/prompts";
import {ChatOpenAI} from "@langchain/openai";
import dotenv from "dotenv";
import {Categories} from "./categories";

dotenv.config({path: '.env'});
const openAiModel = 'gpt-3.5-turbo';

const model = new ChatOpenAI({
    model: openAiModel,
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
});

const categories = Object.values(Categories).map((c) => c.toString()).join('\n');

// TODO: Why are there multiple messages?
// const prompt = ChatPromptTemplate.fromMessages([
//     ['human', `What's the capital of France?`],
//     ['assistant', `The capital of France is Paris.`],
//     ['human', `And the name of the big thing?`],
// ]);

const prompt = ChatPromptTemplate.fromMessages([
    ['system', `When the human provides the name of the recipe, you must classify it into one of the following categories: \n${categories}`],
    ['human', `Coconut Prawns with Crushed Chickpeas & Basil`], // TODO Replace with parameters
]);

(async () => {
    const result = await prompt.pipe(model).invoke({input: 'Chocolate Pudding'});
    console.log(result.content);
})();

// TODO: Next: Setup structured output