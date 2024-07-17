import {Categories} from "../categories";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import {Runnable} from "@langchain/core/runnables";
import {z} from "zod";
import {ChatOpenAI} from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config({path: '.env'});

const categories = Object.values(Categories)
    .map((c) => c.toString())
    .map((c) => `- ${c}`)
    .join('\n');

const prompt = ChatPromptTemplate.fromMessages([
    ['system', `When the human provides the name of the recipe, you must classify it into one of the following categories: \n${categories}`],
    ['human', `{recipe}`],
]);

const schema = z.object({
    category: z.string().nullable().describe('The category of the recipe'),
});

const model = new ChatOpenAI({
    model: 'gpt-4o',
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
}).withStructuredOutput(schema);

export const CategoriseRecipe = prompt.pipe(model);
