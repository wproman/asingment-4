export interface Book {
  _id?: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  copies: number;
  available: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface Borrow {
  id: string;
  book: string;
  quantity: number;
  dueDate: Date;
}
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export interface BorrowSummaryItem {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}
