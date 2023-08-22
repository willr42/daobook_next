import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import postgres from "postgres";

const sql = postgres({transform: postgres.camel});

export default sql;
