import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Book } from "@/redux/api/types";
import { useState } from "react";
import { toast } from "sonner";

interface BookFormProps {
  initialData?: Partial<Book>;
  onSubmit: (bookData: Omit<Book, "_id">) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

const BookForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: BookFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    author: initialData?.author || "",
    genre: initialData?.genre || "FICTION",
    isbn: initialData?.isbn || "",
    copies: initialData?.copies || 1,
    // createdAt: initialData?.createdAt || "",
    // updatedAt: initialData?.updatedAt || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit({
        ...formData,
        available: formData.copies > 0,
      });
      toast.success(
        initialData?._id
          ? "Book updated successfully!"
          : "Book added successfully!"
      );
      if (!initialData?._id) {
        // Only reset if it's a new book
        setFormData({
          title: "",
          author: "",
          genre: "FICTION",
          isbn: "",
          copies: 1,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(
        initialData?._id ? "Failed to update book" : "Failed to add book"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <Input
        placeholder="Author"
        value={formData.author}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        required
      />
      <Select
        value={formData.genre}
        onValueChange={(value) => setFormData({ ...formData, genre: value })}
        required
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="FICTION">Fiction</SelectItem>
          <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
          <SelectItem value="SCIENCE">Science</SelectItem>
          <SelectItem value="HISTORY">History</SelectItem>
          <SelectItem value="BIOGRAPHY">Biography</SelectItem>
          <SelectItem value="FANTASY">Fantasy</SelectItem>
        </SelectContent>
      </Select>
      <Input
        placeholder="ISBN"
        value={formData.isbn}
        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
        required
      />

      <Input
        placeholder="Copies"
        type="number"
        min="1"
        value={formData.copies}
        onChange={(e) =>
          setFormData({ ...formData, copies: parseInt(e.target.value) || 0 })
        }
        required
      />
      <div className="flex justify-end space-x-2 pt-4">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Processing..."
            : initialData?._id
            ? "Update Book"
            : "Add Book"}
        </Button>
      </div>
    </form>
  );
};

export default BookForm;
