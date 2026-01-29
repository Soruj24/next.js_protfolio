import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

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

  return (
    <div className="flex min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto relative scrollbar-hide">
        {/* Ambient background effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
