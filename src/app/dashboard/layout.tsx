import { createClient } from "@/utils/supabase/server";
import DashboardShell from "./DashboardShell";
import { Toaster } from "sonner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const userEmail = user?.email ?? "";
  const userName = user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? "";

  return (
    <>
      <Toaster position="top-right" richColors />
      <DashboardShell userEmail={userEmail} userName={userName}>
        {children}
      </DashboardShell>
    </>
  );
}
