import { Button } from "@/components/ui/button";
import { BookHeart } from "lucide-react";
import Link from "next/link";
import { loginAction } from "../actions";
import { getMember, getServerClient } from "@/lib/wix";

export default async function Navbar() {
  const member = await getMember();
  const isLoggedIn = (await getServerClient()).auth.loggedIn();
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
          <Link href={"/books"}>Books</Link>
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <p className="text-sm">Hello, {member?.nickname}</p>
              {/* <form action={}> */}
              <Button variant="outline">Logout</Button>
              {/* </form> */}
            </div>
          ) : (
            <form action={loginAction}>
              <Button variant="outline">Login</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
