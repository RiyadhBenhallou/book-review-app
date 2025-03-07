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
import { useState, useTransition } from "react";
import { Loader2Icon, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/wix";
import { addReview } from "../actions";
import { toast } from "sonner";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

// Types for our data
export type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
};

export default function AddReviewForm({ bookId }: { bookId: string }) {
  const [pending, startTransition] = useTransition();
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

  const queryClient = useQueryClient();
  // Handle rating selection
  const handleRatingChange = (rating: number) => {
    setNewReview((prev) => ({
      ...prev,
      rating,
    }));
  };

  // Handle form submission
  const handleSubmitReview = (e: React.FormEvent) => {
    startTransition(async () => {
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
      try {
        await addReview(newReview, bookId);
      } catch (error) {
        toast.error("Failed to add review. Please try again later.");
        return;
      }

      // Add to reviews

      // Reset form
      setNewReview({
        userName: "",
        rating: 0,
        comment: "",
      });
      toast.success("Review added successfully");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    });
  };
  return (
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

          <Button type="submit" className="mt-6" disabled={pending}>
            {pending && <Loader2Icon className="animate-spin w-4 h-4 mr-2" />}
            Submit Review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
