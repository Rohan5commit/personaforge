"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Sparkles className="h-5 w-5 text-primary" />
          PersonaForge
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/intake" className="hover:text-foreground transition-colors">
            Start Run
          </Link>
          <Link href="/architecture" className="hover:text-foreground transition-colors">
            Architecture
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
