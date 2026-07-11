import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminShell from "@/features/admin/components/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userRole = (session?.user as { role?: string })?.role;

  if (!session || userRole !== "admin") {
    redirect("/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
