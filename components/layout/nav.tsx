"use client";
import { useState, useEffect, useRef } from "react";
import Logo from "@/assets/logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Menu, Xmark } from "iconoir-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Watch", href: "/watch" },
  { label: "Resources", href: "/resources" },
  { label: "Fellowships", href: "/fellowships" },
  { label: "Give", href: "/give" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  const pathname = usePathname();
  const isDarkBgPage =
    pathname.includes("/fellowship") || pathname.includes("/locations");

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const scrollY = window.scrollY;

        if (scrollY <= 0) {
          setIsScrolled(false);
          setIsNavVisible(true);
        } else {
          setIsScrolled(true);
          if (scrollY < lastScrollY.current) {
            setIsNavVisible(true);
          } else if (scrollY > lastScrollY.current && scrollY > 200) {
            setIsNavVisible(false);
          }
        }

        lastScrollY.current = scrollY;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 80) {
        setIsNavVisible(true);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const close = () => setIsOpen(false);

  return (
    <>
      <nav
        className={cn(
          "fixed w-full z-[1001] flex justify-between items-center py-1 px-10",
          "transition-transform duration-300 ease-in-out",
          isScrolled && "bg-background border border-secondary",
          // Auto-hide on scroll only at lg+; hiding the whole bar on mobile breaks touch/scroll on iOS
          !isNavVisible && "lg:-translate-y-full",
          isDarkBgPage && !isScrolled && "text-background",
        )}
      >
        <Link href="/" className="flex items-center group">
          <Logo className="group-hover:text-primary size-20" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-3">
          {navItems.map((item) => (
            <NavItem key={item.href} label={item.label} href={item.href} />
          ))}
        </ul>
        <div className="hidden lg:block">
          <Button
            variant="default"
            asChild
            className={cn(
              isDarkBgPage && !isScrolled && "bg-background text-foreground",
            )}
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={isOpen ? "mobile-nav-panel" : undefined}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((v) => !v)}
          className="lg:hidden p-2 -m-2"
        >
          {isOpen ? <Xmark className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Only mount when open so a fixed high-z layer never sits over the page on iOS */}
      {isOpen ? (
        <div
          id="mobile-nav-panel"
          data-state="open"
          className={cn(
            "fixed inset-x-0 top-0 z-[9999] bg-background px-10 pt-11 pb-8 shadow-lg border-b border-border",
            "animate-in fade-in-0 slide-in-from-top-4 duration-200",
          )}
        >
          <div className="flex justify-between items-center mb-8">
            <Link href="/" onClick={close} className="flex items-center group">
              <Logo className="group-hover:text-primary" />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="p-2 -m-2"
            >
              <Xmark className="size-6" />
            </button>
          </div>
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                label={item.label}
                href={item.href}
                onClick={close}
                mobile
              />
            ))}
          </ul>
          <Button variant="default" asChild className="mt-6 w-full">
            <Link href="/contact" onClick={close}>
              Contact Us
            </Link>
          </Button>
        </div>
      ) : null}
    </>
  );
}

function NavItem({
  label,
  href,
  onClick,
  mobile,
}: {
  label: string;
  href: string;
  onClick?: () => void;
  mobile?: boolean;
}) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <li className="font-body text-sm">
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "hover:text-primary flex items-center rounded-full",
          mobile ? "px-4 py-3 w-full" : "px-4 h-8 justify-center",
          isActive && "bg-primary text-white hover:text-white",
        )}
      >
        {label}
      </Link>
    </li>
  );
}
