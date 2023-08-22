import postgres from "postgres";

const createConsult = async (db: postgres.Sql, consult: Consult) => {
  const [createdConsult] = await db`
  INSERT INTO
  consults ${db(consult)}
    RETURNING *
  `;
  return createdConsult;
};

export { createConsult };
