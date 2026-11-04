import { CallbackProvider } from "@/components/callback-dialog";
import { Footer } from "@/components/sections/footer";
import { SiteNavbar } from "@/components/sections/site-navbar";

/** Marketing chrome. The admin area under /admin has its own layout. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <CallbackProvider>
      <SiteNavbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </CallbackProvider>
  );
}
