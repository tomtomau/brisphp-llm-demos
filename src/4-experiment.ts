import {ChatPromptTemplate} from "@langchain/core/prompts";
import {ChatOpenAI} from "@langchain/openai";
import dotenv from "dotenv";
import {Categories} from "./categories";
import {z} from "zod";
import {evaluate, EvaluationResult} from "langsmith/evaluation";
import {RunnableSequence} from "@langchain/core/runnables";
import {Example, Run} from "langsmith";

dotenv.config({path: '.env'});
const openAiModel = 'gpt-3.5-turbo';
// TODO: Try gpt-4o instead
// const openAiModel = 'gpt-4o';

const schema = z.object({
    category: z.string().nullable().describe('The category of the recipe'),
});

const model = new ChatOpenAI({
    model: openAiModel,
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
}).withStructuredOutput(schema, { strict: true });

const categories = Categories
    // TODO: Does formatting the categories like this help the model?
    // .map((c) => `- ${c}`)
    .join('\n');

const prompt = ChatPromptTemplate.fromMessages([
    ['system', `Categorise please`],
    // TODO: Use the garbage prompt above first to see what happens, then try a real prompt again
    // ['system', `When the human provides the name of the recipe, you must classify it into one of the following categories: \n${categories}`],
    ['human', `{recipe}`],
]);

function correctCategory(rootRun: Run, example?: Example): EvaluationResult {
    const exampleOutputs = example?.outputs ?? {};
    const targetCategory = exampleOutputs.target_category;
    const actualCategory = schema.parse(rootRun.outputs).category;
    const score = actualCategory === targetCategory;

    console.log({
        recipe: example?.inputs.recipe,
        actualCategory,
        targetCategory,
        score: score ? '✅' : '❌',
    });

    return {key: 'correctness', score};
}

(async () => {
    await evaluate(RunnableSequence.from([prompt, model]), {
        data: '', // TODO: Upload a real dataset to langsmith and put name here
        metadata: {
            model: openAiModel,
        },
        experimentPrefix: 'brisphp-llm-demo',
        evaluators: [correctCategory],
    });
})();