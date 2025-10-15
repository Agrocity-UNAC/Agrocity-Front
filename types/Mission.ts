import { Difficulty } from "./Plant";

export interface Mission {
  _id: string;
  title: string;
  description: string;
  pointsReward: number;
  experienceReward: number;
  isActive: boolean;
  difficulty: Difficulty;
  actionType: string;
  conditionType: string;
  requirements: Requirements;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Requirements {
  targetCount?: number;
  trackingField?: string;
  targetItemId?: null;
}
