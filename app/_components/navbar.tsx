import { Button } from "@/components/ui/button";
import { BookHeart } from "lucide-react";
import Link from "next/link";
import AddBookDialog from "../books/_components/add-book-dialog";

export default async function Navbar() {
  return (
    <div className="bg-slate-200">
      <div className="container mx-auto px-4 py-4 max-w-6xl flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-1">
          <BookHeart className="text-pink-700" />
          <div className="text-xl font-bold font-dancing">
            Book<span className="text-pink-700">C</span>lub
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="secondary" asChild>
            <Link href={"/books"}>Books</Link>
          </Button>
          <AddBookDialog />
        </div>
      </div>
    </div>
  );
}
