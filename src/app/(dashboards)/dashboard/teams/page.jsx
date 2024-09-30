
import React from 'react';
import useTeams from "@/hooks/useTeams";
import Link from "next/link";
import AllTeams from "@/components/Teams/AllTeams";

const Page = async () => {



    return (
        <div>
            <h2>This all Teams Page</h2>

            <AllTeams></AllTeams>

        </div>
    );
};

export default Page;