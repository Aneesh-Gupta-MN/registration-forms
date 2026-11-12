import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { registrations } from "@/db/schema";
import { RegistrationDashboard } from "./registration-dashboard";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const [{ status }, records] = await Promise.all([
    searchParams,
    getDb().select().from(registrations).orderBy(desc(registrations.createdAt)),
  ]);
  return <RegistrationDashboard initialRecords={records} status={status} />;
}
