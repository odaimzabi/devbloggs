import axios from "axios";
import { clientEnv } from "../../env/schema.mjs";

export const apiClient = axios.create({
  baseURL: `${clientEnv.NEXT_PUBLIC_DEFAULT_URL}/api`,
});
