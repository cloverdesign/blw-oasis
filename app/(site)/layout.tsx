'use client'
import Nav from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { usePathname } from "next/navigation";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  const isLocationsPage = pathname.includes("/locations")
  return (
    <>
      {!isLocationsPage && <Nav />}
      {children}
      <Footer />
    </>
  );
}
