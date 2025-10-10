export interface User {
  level: number;
  experience: number;
  rank: string;
  unlockedBadges: any[];
  completedMissions: any[];
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  __v: number;
  currentStreak: number;
  lastActivityDate: Date;
  longestStreak: number;
  updatedAt: Date;
  currentPoints: number;
  totalPoints: number;
}
