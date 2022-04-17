import dotenv from "dotenv";
import path from "path";

export default (): void => {
  dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
};
