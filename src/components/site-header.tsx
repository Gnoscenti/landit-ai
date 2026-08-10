import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function SiteHeader({ compact }: { compact?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/80 backdrop-blur-md">
      <div
        className={`mx-auto flex max-w-5xl items-center justify-between px-4 ${compact ? "py-3" : "py-4"} sm:px-6`}
      >
        <Link
          to="/"
          className="flex items-center gap-2 font-display font-semibold tracking-tight"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-fg">
            L
          </span>
          <span>LandIt AI</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          <a href="/#pricing" className="hidden text-sm text-muted hover:text-fg sm:inline">
            Pricing
          </a>
          <Link to="/app">
            <Button size="sm" variant="secondary">
              Open app
            </Button>
          </Link>
          <Link to="/checkout" search={{ plan: "pro" }}>
            <Button size="sm">Get packs</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
