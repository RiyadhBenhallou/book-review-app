"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addBook } from "../actions";
import AddBookForm from "./add-book-form";

export default function AddBookDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>Add a book</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a book</DialogTitle>
          {/* <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription> */}
        </DialogHeader>
        <AddBookForm addBook={addBook} />
      </DialogContent>
    </Dialog>
  );
}
