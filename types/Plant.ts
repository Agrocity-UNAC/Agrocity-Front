export interface BasePlant {
  _id: string;
  image: string;
  commonName: string;
  scientificName: string;
  difficulty: Difficulty;
  plantType: PlantType;
}

export interface Plant extends BasePlant {
  isActive: boolean;
  variety: string;
  family: string;
  maxHeight: number;
  plantDistance: number;
  rowDistance: number;
  depth: number;
  lifespan: Lifespan;
  sunlight: SunlightNeed;
  waterNeed: WaterNeed;
  soilType: string[];
  phRange: string;
  minTemp: number;
  maxTemp: number;
  plantingMonths: string[];
  harvestMonths: string[];
  daysToGerminate: number;
  daysToMaturity: number;
  wateringFrequency: number;
  wateringAmount: number;
  fertilizingFrequency: number;
  prunningRequired: boolean;
  companionPlants: string[];
  incompatiblePlants: string[];
  harvestable: boolean;
  harvestSize: string;
  storageMethod: string;
  shelfLife: number;
  edibleParts: string[];
  nutritionalInfo: string;
  description: string;
  growingTips: string[];
  commonPests: string[];
  commonDiseases: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export enum PlantType {
  VEGETABLE = "VEGETABLE",
  HERB = "HERB",
  FRUIT = "FRUIT",
  FLOWER = "FLOWER",
  SUCCULENT = "SUCCULENT",
  TREE = "TREE",
  SHRUB = "SHRUB",
  VINE = "VINE",
  GRAIN = "GRAIN",
  LEGUME = "LEGUME",
}

export enum Lifespan {
  ANNUAL = "ANNUAL",
  BIENNIAL = "BIENNIAL",
  PERENNIAL = "PERENNIAL",
}

export enum SunlightNeed {
  FULL_SUN = "FULL_SUN",
  PARTIAL_SUN = "PARTIAL_SUN",
  PARTIAL_SHADE = "PARTIAL_SHADE",
  FULL_SHADE = "FULL_SHADE",
}

export enum WaterNeed {
  LOW = "LOW",
  MODERATE = "MODERATE",
  HIGH = "HIGH",
}

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}
