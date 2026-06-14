import { ProductInput } from "@/lib/schemas";

export async function normalizeIntake(input: ProductInput): Promise<ProductInput> {
  return {
    ...input,
    description: input.description.trim(),
    idea: input.idea.trim(),
    audienceType: input.audienceType.toLowerCase(),
    market: input.market.toLowerCase(),
    pricingModel: input.pricingModel.toLowerCase(),
    stage: input.stage.toLowerCase(),
  };
}
