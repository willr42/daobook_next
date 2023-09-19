import postgres from "postgres";

const portNumber = parseInt(process.env.POSTGRES_PORT as string);

const options: postgres.Options<{}> = {
  transform: postgres.camel,
  host: process.env.POSTGRES_HOST,
  ssl: false,
  port: portNumber,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  pass: process.env.POSTGRES_PASSWORD,
};
console.log("sql options", options);

const sql = postgres(process.env.POSTGRES_URL as string, options);

export default sql;
