import { client } from "@/lib/wix";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { truncateString } from "@/utils/format/truncateString";
import Image from "next/image";
import { placeholderImage } from "@/utils/placeholderImage";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { X } from "lucide-react";
import AddBookDialog from "./_components/add-book-dialog";

export default async function Books({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const { search } = await searchParams;
  const { items: books } = await client.items
    .query("Books")
    .startsWith("name", search || "")
    .find();
  // const { items: books } = await client.items.query("Books").find();

  return (
    <div className="container mx-auto p-4 min-h-screen mt-8">
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-8 pr-8">
        <h1 className="font-bold text-2xl mb-6">Books</h1>
        <form
          className="flex items-center gap-1"
          action={async (formData: FormData) => {
            "use server";
            const search = formData.get("search");
            if (search) redirect(`/books?search=${search}`);
          }}
        >
          <Input
            name="search"
            defaultValue={search || ""}
            placeholder="Search for a book..."
            className="placeholder:text-xs"
          />
          <Button>Search</Button>
          {search && (
            <Button asChild size={"icon"} variant={"destructive"}>
              <Link href={"/books"}>
                <X />
              </Link>
            </Button>
          )}
        </form>
        <AddBookDialog />
      </div>
      <div className="grid grid-cols-3 gap-4 mx-auto max-w-5xl">
        {books.map((book) => (
          <Card
            key={book._id}
            className="w-[300px] flex flex-col justify-between items-center"
          >
            <CardHeader>
              <CardTitle>{book.name}</CardTitle>
              {/* <CardDescription>{truncateString(book.description)}</CardDescription> */}
            </CardHeader>
            <CardContent>
              <Image
                height={350}
                width={250}
                src={book?.cover || placeholderImage}
                alt={`${book.name} cover`}
                className="w-[250px] h-[350px] rounded-lg"
              />
              <p className="mt-2">{book.author}</p>
            </CardContent>
            <CardFooter className="w-full">
              <Button asChild>
                <Link href={`/books/${book._id}`}>Read Reviews</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
        {books.length === 0 && (
          <div className="flex justify-center items-center min-h-[300px] col-span-3">
            <p>No books found...</p>
          </div>
        )}
      </div>
    </div>
  );
}
