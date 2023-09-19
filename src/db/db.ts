import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
console.log("envs: ", dotenv);
import postgres from "postgres";

const sql = postgres({ transform: postgres.camel });

export default sql;
