import type { Metadata } from "next";
import Logo from "@/assets/logo.svg";

export const metadata: Metadata = {
  title: "Under construction | BLW Oasis",
  description: "We're making some updates. Please check back soon.",
  robots: { index: false, follow: false },
};

export default function UnderConstructionPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-10 px-6 text-center bg-background text-foreground">
      <Logo className="w-32 lg:w-40 text-foreground" aria-label="BLW Oasis" />
      <div className="flex flex-col gap-4 max-w-md">
        <h1
          className="text-4xl lg:text-6xl capitalize"
          style={{ fontFamily: "var(--font-cal-sans)" }}
        >
          Under construction
        </h1>
        <p className="text-base lg:text-lg text-foreground/70">
          We&apos;re making some updates to the site. Please check back soon.
        </p>
      </div>
    </main>
  );
}
