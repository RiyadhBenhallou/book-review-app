"use server";

import { client } from "@/lib/wix";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addBook(formData: FormData) {
  const book = {
    name: formData.get("name"),
    author: formData.get("author"),
    description: formData.get("description"),
    cover: formData.get("cover"),
    isbn: formData.get("isbn"),
    genre: formData.get("genre"),
    publishedDate: formData.get("publishedDate"),
  };
  const newBook = await client.items.insert("Books", book);
  revalidatePath("/books");
  redirect(`/books/${newBook._id}`);
}
