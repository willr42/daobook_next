import sql from "@/db/db";
async function getData() {}

// TODO: this page should only route to /home or /login
export default async function Root() {
  const data = await getData();
  return <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>;
}
