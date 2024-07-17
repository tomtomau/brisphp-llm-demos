import express from 'express';
import {z} from "zod";
import {CategoriseRecipe} from "./llm-call";

const inputSchema = z.object({
    recipe: z.string().describe('The recipe to categorise'),
});

export const categoriseHandler = async (req: express.Request, res: express.Response) => {
    const parseResult = inputSchema.safeParse(req.body);

    if (!parseResult.success) {
        res.status(400).send(parseResult.error.errors);
        return;
    }

    // Do something with the recipe name
    const recipe = parseResult.data.recipe;

    const {category} = await CategoriseRecipe.invoke({
            recipe
        },
        {
            runName: 'HTTP /categorise'
        }
    );

    res.json({category});
};
