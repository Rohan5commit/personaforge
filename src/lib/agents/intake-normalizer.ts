import { ProductInput } from "@/lib/schemas";

export async function normalizeIntake(input: ProductInput): Promise<ProductInput> {
  return {
    ...input,
    description: input.description.trim(),
    idea: input.idea.trim(),
    audienceType: input.audienceType.trim(),
    market: input.market.trim(),
    pricingModel: input.pricingModel.trim(),
    stage: input.stage.trim(),
  };
}
