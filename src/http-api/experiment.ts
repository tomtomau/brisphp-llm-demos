import dotenv from "dotenv";
import {evaluate, EvaluationResult} from "langsmith/evaluation";
import {Example, Run} from "langsmith";
import {CategoriseRecipe, schema} from "./chain";

dotenv.config({path: '.env'});

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
    await evaluate(CategoriseRecipe, {
        data: 'brisphp-data-small-1', // TODO: Upload a real dataset to langsmith and put name here
        experimentPrefix: 'brisphp-llm-demo',
        evaluators: [correctCategory],
    });
})();