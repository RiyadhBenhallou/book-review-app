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

export default async function Books() {
  const { items: books } = await client.items.query("Books").find();
  console.log(books);

  return (
    <div className="container mx-auto p-4 min-h-screen flex justify-center items-center flex-col mt-12">
      <h1 className="font-bold text-2xl mb-6">Books</h1>
      <div className="grid grid-cols-3 gap-4" >
        {books.map((book) => (
          <Card key={book._id} className="w-[220px] flex flex-col justify-between items-center">
            <CardHeader>
              <CardTitle>{book.name}</CardTitle>
              {/* <CardDescription>{truncateString(book.description)}</CardDescription> */}
            </CardHeader>
            <CardContent>
              <Image height={250} width={200} src={book?.cover || placeholderImage} alt={`${book.name} cover`} className="w-[200px] h-[250px]" />
              <p>{book.author}</p>
            </CardContent>
            <CardFooter className="w-full">
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
