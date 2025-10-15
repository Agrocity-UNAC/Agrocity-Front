import { Mission } from "./Mission";

export interface UserMission {
  _id: string;
  user: string;
  mission: Mission;
  progress: number;
  completed: boolean;
  assignedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
