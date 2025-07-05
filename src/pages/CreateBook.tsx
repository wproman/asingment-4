import BookForm from "@/components/BookFrom";
import { useAddBookMutation } from "@/redux/api/baseApi";
import type { Book } from "@/redux/api/types";

import { useNavigate } from "react-router";

const AddBookPage = () => {
  const navigate = useNavigate();
  const [addBook, { isLoading }] = useAddBookMutation();

  const handleSubmit = async (bookData: Omit<Book, "_id">) => {
    await addBook(bookData).unwrap();
    navigate("/books"); // Redirect back to book list after successful submission
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
      <BookForm onSubmit={handleSubmit} isSubmitting={isLoading} />
    </div>
  );
};

export default AddBookPage;
