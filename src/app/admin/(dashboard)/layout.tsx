import { Suspense } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getAdmin } from "@/lib/admin";

/** Signed-in area: shadcn sidebar plus the page. Each page checks the session itself. */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AdminSidebar
          account={
            <Suspense fallback={null}>
              <SignedInAs />
            </Suspense>
          }
        />
        <SidebarInset id="main">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-background/90 px-4 backdrop-blur print:hidden">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-1 h-4 data-vertical:self-center" />
            <span className="text-sm text-muted-foreground">Admin</span>
          </header>
          <div className="flex-1 p-4 md:p-6 print:p-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}

async function SignedInAs() {
  const admin = await getAdmin();
  return admin ? <>Signed in as {admin.email}</> : null;
}
