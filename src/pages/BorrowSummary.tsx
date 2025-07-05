import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";

const BorrowSummary = () => {
  const { data, isLoading, error } = useGetBorrowSummaryQuery(undefined);

  console.log(data, isLoading, error);

  if (isLoading) return <div>Loading summary...</div>;
  if (error) return <div>Error loading summary</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data?.data.map(
        (
          item: {
            book: { title: string; isbn: string };
            totalQuantity: number;
          },
          index: number
        ) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{item.book.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">ISBN: {item.book.isbn}</p>
              <p className="mt-2 text-base font-semibold">
                Total Borrowed: {item.totalQuantity}
              </p>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
};

export default BorrowSummary;
