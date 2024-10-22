import fs from 'fs';
import readline from 'readline';

export async function getModelCost(modelName: string) {
    const fileStream = fs.createReadStream('./costs/model-costs.jsonl');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        const modelData = JSON.parse(line);
        if (modelData.model.toLowerCase() === modelName.toLowerCase()) {
            return {
                tokensInCost: modelData.tokenInputCostPer10K,
                tokensOutCost: modelData.tokenOutputCostPer10K
            };
        }
    }

    return null; // If model is not found
}

console.log(await getModelCost('Claude 3.5 sonnet'));