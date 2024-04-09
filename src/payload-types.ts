export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: "admin" | "writer";
  createdAt: string;
  updatedAt: string;
}
