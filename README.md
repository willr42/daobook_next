# Daobook - Next Edition

After creating [Daobook](https://www.daobook.com.au/) for my final project at CoderAcademy, I re-created it in NextJS using the latest `app` router, Server Actions, and [Auth.js](authjs.dev/) including building my own custom adapter.

See it live here: [Daobook Next](https://daobook-next.vercel.app).

## Dependencies

[NextJS 13](https://nextjs.org/) with the experimental App Router & Server Actions. Cutting-edge tech that cut me a few times.
🧮 [Postgres.js](https://github.com/porsager/postgres) and its querybuilder for all DB interaction.
🧭 [Auth.js](https://authjs.dev), where I wrote my own custom Adapter to work with the Postgres.js library above.
🎨 [TailwindCSS](https://tailwindcss.com/) for all styling.

## Running locally

You'll need to set up the database locally and run `create.sql` from the db folder, and provide your environment variables as per the `.env` file in the root of the project. This app uses GitHub OAuth for sign-in. Something like;

```bash
# set up your db before this. Manually edit the db:reset script to your values.
pnpm run db:reset
pnpm install
pnpm run dev
```
