import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAddBookMutation,
  useBorrowBookMutation,
  useDeleteBookMutation,
  useGetBooksQuery,
  useUpdateBookMutation,
} from "@/redux/api/baseApi";
import type { Book } from "@/redux/api/types";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const BookList = () => {
  const { data, isLoading, error } = useGetBooksQuery(undefined);
  const [addBook] = useAddBookMutation();
  const [deleteBook] = useDeleteBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [borrowBook] = useBorrowBookMutation();
  const [borrowDialogBook, setBorrowDialogBook] = useState<Book | null>(null);
  const [borrowData, setBorrowData] = useState({
    quantity: 1,
    dueDate: "",
  });
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    copies: 1,
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4">Error loading books</div>;

  const handleAdd = async () => {
    await addBook({ ...newBook, available: newBook.copies > 0 });
    setIsAdding(false);
    setNewBook({ title: "", author: "", genre: "", isbn: "", copies: 1 });
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteBook(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h1 className="text-2xl font-bold">Book List</h1>
        <Button onClick={() => setIsAdding(true)} className="w-full sm:w-auto">
          Add New Book
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell">Title</TableHead>
              <TableHead className="hidden md:table-cell">Author</TableHead>
              <TableHead className="hidden lg:table-cell">Genre</TableHead>
              <TableHead className="hidden lg:table-cell">ISBN</TableHead>
              <TableHead className="hidden md:table-cell">Copies</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((book: Book) => (
              <TableRow key={book._id}>
                <TableCell className="font-medium sm:font-normal">
                  {book.title}
                  <div className="sm:hidden text-sm text-muted-foreground">
                    {book.author}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {book.author}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {book.genre}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {book.isbn}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {book.copies}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      book.available
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {book.available ? "Available" : "Unavailable"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full sm:w-auto"
                      asChild
                    >
                      <Link to={`/books/${book._id}`}>Details</Link>
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="hidden sm:inline-flex"
                        onClick={() => setCurrentBook(book)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="hidden sm:inline-flex"
                        disabled={!book.available}
                        onClick={() => {
                          setBorrowDialogBook(book);
                          setBorrowData({ quantity: 1, dueDate: "" });
                        }}
                      >
                        Borrow
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="hidden sm:inline-flex"
                        onClick={() => setDeleteId(book._id || null)}
                      >
                        Delete
                      </Button>
                    </div>
                    <div className="sm:hidden grid grid-cols-3 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCurrentBook(book)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={!book.available}
                        onClick={() => {
                          setBorrowDialogBook(book);
                          setBorrowData({ quantity: 1, dueDate: "" });
                        }}
                      >
                        Borrow
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteId(book._id || null)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Borrow Dialog */}
      <Dialog
        open={!!borrowDialogBook}
        onOpenChange={(open) => !open && setBorrowDialogBook(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Borrow Book</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="quantity" className="text-right">
                Quantity
              </label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={borrowDialogBook?.copies}
                className="col-span-3"
                value={borrowData.quantity}
                onChange={(e) =>
                  setBorrowData({
                    ...borrowData,
                    quantity: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="dueDate" className="text-right">
                Due Date
              </label>
              <Input
                id="dueDate"
                type="date"
                className="col-span-3"
                value={borrowData.dueDate}
                onChange={(e) =>
                  setBorrowData({ ...borrowData, dueDate: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setBorrowDialogBook(null)}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (borrowDialogBook) {
                  try {
                    await borrowBook({
                      book: borrowDialogBook._id ?? "",
                      quantity: borrowData.quantity,
                      dueDate: borrowData.dueDate,
                    }).unwrap();
                    toast.success("Book borrowed successfully.");
                    setBorrowDialogBook(null);
                  } catch {
                    toast.error("Failed to borrow book.");
                  }
                }
              }}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!currentBook}
        onOpenChange={(open) => !open && setCurrentBook(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right">
                Title
              </label>
              <Input
                id="title"
                value={currentBook?.title || ""}
                className="col-span-3"
                onChange={(e) =>
                  setCurrentBook({ ...currentBook!, title: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="author" className="text-right">
                Author
              </label>
              <Input
                id="author"
                value={currentBook?.author || ""}
                className="col-span-3"
                onChange={(e) =>
                  setCurrentBook({ ...currentBook!, author: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="genre" className="text-right">
                Genre
              </label>
              <Select
                value={currentBook?.genre}
                onValueChange={(value) =>
                  setCurrentBook({ ...currentBook!, genre: value })
                }
              >
                <SelectTrigger className="col-span-3">
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
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="isbn" className="text-right">
                ISBN
              </label>
              <Input
                id="isbn"
                value={currentBook?.isbn || ""}
                className="col-span-3"
                onChange={(e) =>
                  setCurrentBook({ ...currentBook!, isbn: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="copies" className="text-right">
                Copies
              </label>
              <Input
                id="copies"
                type="number"
                min="0"
                value={currentBook?.copies || 0}
                className="col-span-3"
                onChange={(e) =>
                  setCurrentBook({
                    ...currentBook!,
                    copies: parseInt(e.target.value),
                    available: parseInt(e.target.value) > 0,
                  })
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCurrentBook(null)}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (currentBook) {
                  await updateBook(currentBook);
                  setCurrentBook(null);
                }
              }}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={isAdding} onOpenChange={setIsAdding}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Book</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-title" className="text-right">
                Title
              </label>
              <Input
                id="new-title"
                value={newBook.title}
                className="col-span-3"
                onChange={(e) =>
                  setNewBook({ ...newBook, title: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-author" className="text-right">
                Author
              </label>
              <Input
                id="new-author"
                value={newBook.author}
                className="col-span-3"
                onChange={(e) =>
                  setNewBook({ ...newBook, author: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-genre" className="text-right">
                Genre
              </label>
              <Select
                value={newBook.genre}
                onValueChange={(value) =>
                  setNewBook({ ...newBook, genre: value })
                }
              >
                <SelectTrigger className="col-span-3">
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
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-isbn" className="text-right">
                ISBN
              </label>
              <Input
                id="new-isbn"
                value={newBook.isbn}
                className="col-span-3"
                onChange={(e) =>
                  setNewBook({ ...newBook, isbn: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-copies" className="text-right">
                Copies
              </label>
              <Input
                id="new-copies"
                type="number"
                min="1"
                value={newBook.copies}
                className="col-span-3"
                onChange={(e) =>
                  setNewBook({ ...newBook, copies: parseInt(e.target.value) })
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd}>Add Book</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this book record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BookList;
