"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxiosCommon from "@/lib/axiosCommon";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { IoTrashOutline } from "react-icons/io5";
import { redirect } from "next/navigation";
import useRole from "@/hooks/useRole";
import Alert from "@/components/shared/Alert";
import { toast } from "@/hooks/use-toast";
import LoadingSpinner from "@/components/shared/LoadingSpinner/LoadingSpinner";

const AdminReview = () => {
  const [role, roleLoading] = useRole();

  const axiosCommon = useAxiosCommon();
  // get All reviews
  const {
    data: allReviews,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosCommon.get("/api/reviews");
      return res.data;
    },
    initialData: [],
  });

  // delete review
  const handleDelete = async (id) => {
    const res = await axiosCommon.delete(`/api/reviews/${id}`);
    if (res.data.deletedCount > 0) {
      toast({
        description: "Review Deleted",
      });
      refetch();
    }
  };

  if (roleLoading || isLoading) return <LoadingSpinner />;

  if (role !== "admin") redirect("/");

  return (
    <section className="container mx-auto">
      {/* Table container */}
      <div className="dark:bg-[#181024] border dark:border-[#3e1878c2] rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-black dark:text-gray-50">
                No
              </TableHead>

              <TableHead className="font-semibold text-black dark:text-gray-50">
                Name
              </TableHead>

              <TableHead className="font-semibold text-black dark:text-gray-50 ">
                Review Message
              </TableHead>

              <TableHead className="font-semibold text-black dark:text-gray-50 ">
                Review Date
              </TableHead>

              <TableHead className="font-semibold text-black dark:text-gray-50">
                Review Rating
              </TableHead>

              <TableHead className="font-semibold text-black dark:text-gray-50">
                {" "}
                Action{" "}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allReviews?.map((review, index) => (
              <TableRow key={review._id}>
                <TableCell>{index + 1}</TableCell>

                <TableCell className="p-2.5">{review.name}</TableCell>

                <TableCell>{review.message}</TableCell>

                <TableCell>{review?.reviewDate?.slice(0, 10)}</TableCell>

                <TableCell>{review?.reviewRating || "not given"}</TableCell>

                <TableCell>
                  <Alert onContinue={() => handleDelete(review._id)}>
                    {(openDialog) => (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDialog();
                        }}
                        className="border hover:bg-red-500 dark:hover:bg-red-500 dark:hover:text-white hover:text-white dark:text-red-500  p-2 rounded-md"
                      >
                        <span className="text-xl ">
                          <IoTrashOutline />
                        </span>
                      </button>
                    )}
                  </Alert>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default AdminReview;
