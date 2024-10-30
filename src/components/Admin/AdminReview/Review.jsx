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

const AdminReview = () => {
  const [role] = useRole();
  if (role !== "admin") redirect("/");

  const axiosCommon = useAxiosCommon();
  // get All reviews
  const { data: allReviews, refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosCommon.get("/api/reviews");
      // console.log(res.data);
      return res.data;
    },
    initialData: [],
  });

  // delete review
  const handleDelete = (id) => {
    // console.log(item);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7066e3",
      cancelButtonColor: "#707a83",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //
        const res = await axiosCommon.delete(`/api/reviews/${id}`);
        // console.log(res.data);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: `Review has been deleted`,
            icon: "success",
          });

          // refetch for delete from ui instantly
          refetch();
        }
      }
    });
  };

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
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="border hover:bg-red-400 dark:hover:bg-[#3e1878c2]  hover:text-white dark:text-red-400  p-2 rounded-md"
                  >
                    <span className="text-xl ">
                      <IoTrashOutline />
                    </span>
                  </button>
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
