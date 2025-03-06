"use client";

import type React from "react";

import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getBook } from "./actions";
import { placeholderImage } from "@/utils/placeholderImage";

// Types for our data
type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
};

// Updated Book type to match the new schema
type Book = {
  _id: string;
  name: string;
  author: string;
  isbn: string;
  genre: string;
  publishedDate: string;
  description: string;
  coverImage?: string; // Optional as it's not in the schema but used in UI
};

type Props = {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function BookPage({ params }: Props) {
  const { bookId } = use(params);
  console.log(bookId);

  const { data: book } = useQuery({
    queryKey: ["book", bookId],
    queryFn: async () => {
      const book = await getBook(bookId as string);
      return book;
    },
  });
  console.log(book);

  // Sample reviews data
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      userName: "Alex Johnson",
      rating: 5,
      comment:
        "This book changed my perspective on life. The concept is fascinating and the execution is flawless.",
      date: "January 15, 2023",
    },
    {
      id: "2",
      userName: "Sam Taylor",
      rating: 4,
      comment:
        "A thought-provoking read that makes you reflect on your own choices. I couldn't put it down!",
      date: "February 3, 2023",
    },
    {
      id: "3",
      userName: "Jordan Lee",
      rating: 5,
      comment:
        "Beautifully written with characters that feel real. The philosophical questions it raises stayed with me long after finishing.",
      date: "March 20, 2023",
    },
  ]);

  // Form state
  const [newReview, setNewReview] = useState({
    userName: "",
    rating: 0,
    comment: "",
  });

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle rating selection
  const handleRatingChange = (rating: number) => {
    setNewReview((prev) => ({
      ...prev,
      rating,
    }));
  };

  // Handle form submission
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!newReview.userName || !newReview.comment || newReview.rating === 0) {
      alert("Please fill out all fields and provide a rating");
      return;
    }

    // Create new review
    const review: Review = {
      id: Date.now().toString(),
      userName: newReview.userName,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    // Add to reviews
    setReviews((prev) => [review, ...prev]);

    // Reset form
    setNewReview({
      userName: "",
      rating: 0,
      comment: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Book Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src={book?.cover || placeholderImage}
              alt={`Cover of ${book?.name}`}
              width={300}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{book?.name}</h1>
          <h2 className="text-xl text-muted-foreground mb-4">
            by {book?.author}
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Published
              </p>
              <p>{book?.publishedDate.toLocaleString().split(",")[0]}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">ISBN</p>
              <p>{book?.isbn}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Genre</p>
              <p>{book?.genre}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{book?.description}</p>
          </div>

          <div className="flex items-center">
            <div className="flex mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-5 w-5 ${
                    calculateAverageRating() >= star
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-medium">
              {calculateAverageRating().toFixed(1)}
            </span>
            <span className="text-muted-foreground ml-2">
              ({reviews.length} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Add Review Section */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
          <CardDescription>
            Share your thoughts about this book with other readers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitReview}>
            <div className="grid gap-6">
              <div>
                <Label htmlFor="userName">Your Name</Label>
                <Input
                  id="userName"
                  name="userName"
                  value={newReview.userName}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Rating</Label>
                <div className="flex mt-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => handleRatingChange(rating)}
                      className="mr-1"
                    >
                      <StarIcon
                        className={`h-6 w-6 ${
                          newReview.rating >= rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="comment">Your Review</Label>
                <Textarea
                  id="comment"
                  name="comment"
                  value={newReview.comment}
                  onChange={handleInputChange}
                  placeholder="What did you think about this book?"
                  className="mt-1"
                  rows={4}
                />
              </div>
            </div>

            <Button type="submit" className="mt-6">
              Submit Review
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Reviews Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Reader Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No reviews yet. Be the first to review this book!
          </p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{review.userName}</CardTitle>
                      <CardDescription>{review.date}</CardDescription>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`h-5 w-5 ${
                            review.rating >= star
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Helper function to calculate average rating
  function calculateAverageRating() {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return sum / reviews.length;
  }
}
