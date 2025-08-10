export type PlantType =
  | "VEGETABLE"
  | "HERB"
  | "FRUIT"
  | "FLOWER"
  | "SUCCULENT"
  | "TREE"
  | "SHRUB"
  | "VINE"
  | "GRAIN"
  | "LEGUME";

export type Lifespan = "ANNUAL" | "BIENNIAL" | "PERENNIAL";

export type SunlightNeed =
  | "FULL_SUN"
  | "PARTIAL_SUN"
  | "PARTIAL_SHADE"
  | "FULL_SHADE";

export type WaterNeed = "LOW" | "MODERATE" | "HIGH";

export type Difficulty = "EASY" | "MODERATE" | "HARD";

export interface Plant {
  id: string;
  image: string;
  commonName: string;
  scientificName: string;
  variety: string;
  plantType: PlantType;
  difficulty: Difficulty;
  lifespan: Lifespan;
  sunlight: SunlightNeed;
  waterNeed: WaterNeed;
  harvestable: boolean;
  daysToMaturity: number;
  plantingMonths: string[];
  harvestMonths: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
}
