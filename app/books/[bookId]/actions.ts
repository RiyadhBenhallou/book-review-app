"use server";

import { client } from "@/lib/wix";

export async function getBook(bookId: string) {
  const book = await client.items.get("Books", bookId);
  return book;
}

export async function getReviews(bookId: string) {
  const reviews = await client.items.query("Reviews").eq("bookId", bookId).find();
  return reviews;
}


export async function addReview(
  review: { userName: string; rating: number; comment: string },
  bookId: string
) {
  await client.items.insert("Reviews", {
    name: review.userName,
    review: review.comment,
    rating: review.rating,
    bookId: bookId,
  });
}
