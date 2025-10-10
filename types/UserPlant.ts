import { BasePlant } from "./Plant";

export interface UserPlant {
  _id: string;
  user: string;
  plant: BasePlant;
  nickname: string;
  careProgress: number;
  health: number;
  emotionalState: EmotionalState;
  daysAlive: number;
  wateringScore: number;
  hasFlowered: boolean;
  achievements: string[];
  perfectCareDays: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  lastWatered: string;
  lastFertilized: string;
}

enum EmotionalState {
  HAPPY = "HAPPY",
  THIRSTY = "THIRSTY",
  COLD = "COLD",
  HOT = "HOT",
  LOW_LIGHT = "LOW_LIGHT",
  OVERWATERED = "OVERWATERED",
  CRITICAL = "CRITICAL",
}

export interface SensorReading {
  userPlant: string;
  TEMPERATURE: number;
  AMBIENT_HUMIDITY: number;
  SOIL_HUMIDITY: number;
  LIGHT: number;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
