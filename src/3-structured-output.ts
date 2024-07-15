import {ChatPromptTemplate} from "@langchain/core/prompts";
import {ChatOpenAI} from "@langchain/openai";
import dotenv from "dotenv";
import {Categories} from "./categories";
import {z} from "zod";

dotenv.config({path: '.env'});
const openAiModel = 'gpt-3.5-turbo';

const schema = z.object({
    category: z.string().nullable().describe('The category of the recipe'),
});

const model = new ChatOpenAI({
    model: openAiModel,
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
}).withStructuredOutput(schema);

const categories = Object.values(Categories).map((c) => c.toString()).join('\n');

const prompt = ChatPromptTemplate.fromMessages([
    ['system', `When the human provides the name of the recipe, you must classify it into one of the following categories: \n${categories}`],
    ['human', `Coconut Prawns with Crushed Chickpeas & Basil`], // TODO Replace with parameters
]);

(async () => {
    const result = await model.invoke(await prompt.invoke({}));
    console.log({result});
})();