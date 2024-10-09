"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useAxiosCommon from "@/lib/axiosCommon";
import { useQuery } from "@tanstack/react-query";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";



const Review = () => {

    const axiosCommon = useAxiosCommon();

    // get All reviews 
    const { data: allReviews, refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosCommon.get('/api/reviews')
            // console.log(res.data);
            return res.data;

        }, initialData: []

    })


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
            confirmButtonText: "Yes, delete it!"
        })


            .then(async (result) => {
                if (result.isConfirmed) {
                    // 
                    const res = await axiosCommon.delete(`/api/reviews/${id}`);
                    // console.log(res.data);
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: `Review has been deleted`,
                            icon: "success"
                        });


                        // refetch for delete from ui instantly
                        refetch();

                    }
                }

            })



    }



    return (
        <section className="container mx-auto">

            {/* Table container */}
            <div>
                
                <Table>
                    <TableHeader>
                        <TableRow>

                            <TableHead className="font-semibold text-black text-base">Name</TableHead>

                            <TableHead className="font-semibold text-black text-base ">Review Message</TableHead>

                            <TableHead className="font-semibold text-black text-base ">Review Date</TableHead>

                            <TableHead className="font-semibold text-black text-base">Review Rating</TableHead>

                            <TableHead className="font-semibold text-black text-base"></TableHead>


                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                            allReviews.map((review, index) =>
                                <TableRow key={review._id}>

                                    <TableCell >{review.name}</TableCell>

                                    <TableCell>{review.message}</TableCell>

                                    <TableCell>{review.reviewDate.slice(0, 10)}</TableCell>

                                    <TableCell >{review?.reviewRating || "not given"}</TableCell>

                                    {/*   <TableCell >
                                        <span onClick={() => handleDelete(review._id)} className="px-3 py-1 font-semibold rounded-md bg-red-500 text-gray-50 hover:bg-red-700 cursor-pointer">
                                            <span>Delete</span>
                                        </span>
                                    </TableCell> */}

                                    <TableCell >
                                        <button onClick={() => handleDelete(review._id)}
                                            className="bg-red-400 hover:bg-red-600  p-2 rounded-md">
                                            <span className="text-xl text-base-200"><FaRegTrashAlt></FaRegTrashAlt></span>
                                        </button>
                                    </TableCell>

                                </TableRow>

                            )
                        }

                    </TableBody>

                </Table>

            </div>


        </section>
    );
};

export default Review;