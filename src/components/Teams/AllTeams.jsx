"use client";
import React from 'react';
import useTeams from "@/hooks/useTeams";
import Link from "next/link";

const AllTeams = () => {

    const teams = useTeams();
    console.log("all teams", teams);

    return (
        <div>

            <div className="">
                <h6>All Posts</h6>
                <div className="grid grid-cols-4 gap-6">
                    {teams[0]?.slice(0, 10)?.map(({ name, body, _id }) => (
                        <div key={_id} className="border-2 p-6">
                            <h6 className="font-bold">Title: {name}</h6>
                            <br />
                            <hr />
                            <p>Description: {body}</p>
                            <button className="btn border bg-green-600 p-2"><Link href={`/dashboard/teams/${_id}`}>Details</Link>
                            </button>
                        </div>
                    ))}
                </div>
                Post Page
            </div>

        </div>
    );
};

export default AllTeams;