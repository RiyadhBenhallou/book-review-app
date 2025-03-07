import { Button } from "@/components/ui/button"
import { BookOpen, Users, Star } from "lucide-react"
import Link from "next/link"

export default function BookClubLanding() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Welcome to{" "}
                <span className="font-dancing">
                  Book<span className="text-pink-700">C</span>lub
                </span>
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Discover your next favorite book with our community of passionate readers. Share reviews, join
                discussions, and track your reading journey.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/books">Get Started</Link>
                </Button>
              <Button size="lg" variant="outline" asChild>
              <Link href="/books">Explore Books</Link>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-medium">4.9/5 rating</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span className="font-medium">10k+ members</span>
              </div>
              <div className="flex items-center space-x-1">
                <BookOpen className="h-4 w-4" />
                <span className="font-medium">50k+ reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Why Join{" "}
                <span className="font-dancing">
                  Book<span className="text-pink-700">C</span>lub
                </span>
                ?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Our platform offers everything you need to enhance your reading experience
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Track Your Reading</h3>
              <p className="text-center text-muted-foreground">
                Keep a digital bookshelf of what you've read, want to read, and are currently reading.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Share Reviews</h3>
              <p className="text-center text-muted-foreground">
                Write and share your thoughts on books with a community of fellow readers.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Join Discussions</h3>
              <p className="text-center text-muted-foreground">
                Participate in book clubs and discussions about your favorite titles and authors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-dancing">
                Book<span className="text-pink-700">C</span>lub
              </span>
              . All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">Made with ❤️ by Riyadh Benhallou</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

