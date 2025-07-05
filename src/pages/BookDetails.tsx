// import { Button } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { useGetBookQuery } from "@/redux/api/baseApi";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: books, isLoading, error } = useGetBookQuery(id || "");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    toast.error("Failed to load book details");
    navigate("/books");
    return null;
  }

  // Check if book exists and has successful status
  if (!books) {
    toast.error("Book not found");
    navigate("/books");
    return null;
  }

  const book = books?.data;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <Button variant="outline" onClick={() => navigate("/books")}>
            Back to List
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Author</h2>
              <p className="text-lg">{book.author}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Genre</h2>
              <p className="text-lg capitalize">{book.genre.toLowerCase()}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">ISBN</h2>
              <p className="text-lg">{book.isbn}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-medium text-gray-500">
                Availability
              </h2>
              <p className="text-lg">
                {book.available ? "Available" : "Not Available"}
                {book.copies && ` (${book.copies} copies)`}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Added On</h2>
              <p className="text-lg">
                {new Date(book.createdAt ?? new Date()).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">
                Last Updated
              </h2>
              <p className="text-lg">
                {new Date(book.updatedAt ?? new Date()).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
