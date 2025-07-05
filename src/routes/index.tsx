import App from "@/App";
import BookDetails from "@/pages/BookDetails";
import BookList from "@/pages/BookList";
import BorrowSummary from "@/pages/BorrowSummary";
import AddBook from "@/pages/CreateBook";
import NotFoundPage from "@/pages/NotFound";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        // path: "/books",
        element: <BookList />,
      },
      {
        path: "/books",
        element: <BookList />,
      },
      {
        path: "/create-book",
        element: <AddBook />,
      },
      {
        path: "/borrow-summary",
        element: <BorrowSummary />,
      },
      {
        path: "/books/:id",
        element: <BookDetails />,
      },
      {
        path: "*", // ✅ Catch-all route for unmatched paths
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
