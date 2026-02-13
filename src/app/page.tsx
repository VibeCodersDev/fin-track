import Link from "next/link";
import { Wallet, BarChart3, Shield, Zap, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 text-white shadow-md shadow-primary/25">
              <Wallet className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">FinTrack</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-md shadow-primary/25">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute bottom-[-20%] left-[30%] h-[350px] w-[350px] rounded-full bg-blue-500/8 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-8">
            <Sparkles className="h-3.5 w-3.5" />
            Smart finance tracking made simple
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Take Control of
            <br />
            <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Your Finances
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Track expenses, set budgets, and gain clear insights into your spending
            habits. Simple, fast, and designed for real life.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/25 gap-2">
                Start Tracking Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Everything you need</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Powerful tools to help you understand and manage your money better
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="group rounded-2xl border border-border/60 bg-card p-7 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/15 to-primary/15 text-primary mb-5">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Visual Insights</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Beautiful charts that show exactly where your money goes each month.
            </p>
          </div>
          <div className="group rounded-2xl border border-border/60 bg-card p-7 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/15 to-teal-500/15 text-emerald-600 mb-5">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Budget Guards</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Set monthly and category budgets with warning alerts when you&apos;re
              close to limits.
            </p>
          </div>
          <div className="group rounded-2xl border border-border/60 bg-card p-7 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/15 to-orange-500/15 text-amber-600 mb-5">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Add expenses in seconds. No clutter, no complexity—just quick
              tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50">
        <div className="container mx-auto flex items-center justify-between px-4 py-6 text-sm text-muted-foreground">
          <span className="font-medium">FinTrack</span>
          <span>Built with Next.js, Tailwind CSS & shadcn/ui</span>
        </div>
      </footer>
    </div>
  );
}
