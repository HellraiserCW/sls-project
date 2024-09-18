import { v4 as uuidv4 } from "uuid";

export interface User {
  id: typeof uuidv4;
  name: string;
  email: string;
}
