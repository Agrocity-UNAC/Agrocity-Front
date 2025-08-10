export interface User {
  userId: string;
  avatar: string | null;
  email: string;
  name: string;
  role: "USER" | "CONTRIBUTOR";
}
