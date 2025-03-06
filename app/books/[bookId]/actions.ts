"use server";

import { client } from "@/lib/wix";

export async function getBook(bookId: string) {
  const book = await client.items.get("Books", bookId);
  return book;
}
