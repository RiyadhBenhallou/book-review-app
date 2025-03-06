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

export default async function Books() {
  const { items: books } = await client.items.query("Books").find();
  console.log(books);

  return (
    <div>
      <h1 className="font-bold text-2xl">Books</h1>
      <div className="grid grid-cols-3 gap-4">
        {books.map((book) => (
          <Card key={book._id}>
            <CardHeader>
              <CardTitle>{book.name}</CardTitle>
              <CardDescription>{book.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{book.author}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/books/${book._id}`}>Read Reviews</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
