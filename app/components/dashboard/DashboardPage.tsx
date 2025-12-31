import { Suspense } from "react";
import SidebarWithLogo from "./SidebarWithLogo";
import StatsPanel from "./StatsPanel";
import PublicationSection from "./PublicationSection";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1 px-4 md:px-8 py-6">
        <section
          className="
            grid gap-6
            grid-cols-1
            md:grid-cols-[240px_1fr]
            lg:grid-cols-[260px_1fr_320px]
          "
        >
          {/* SIDEBAR */}
          <aside className="hidden md:block">
            <SidebarWithLogo />
          </aside>

          {/* CENTER (CLIENT) */}
          <Suspense fallback={<div>Loading publications...</div>}>
            <PublicationSection />
          </Suspense>

          {/* STATS - DESKTOP */}
          <aside className="hidden lg:block">
            <StatsPanel />
          </aside>

          {/* STATS - TABLET */}
          <section className="hidden md:block lg:hidden col-span-2">
            <StatsPanel />
          </section>
        </section>
      </main>

    </div>
  );
}
