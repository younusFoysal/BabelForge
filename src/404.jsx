import React from 'react';
import pagenotfound from "@/image/Home/404.png"
import Image from "next/image";

const Page = () => {
    return (
        <div>

            <div>
                <Image src={pagenotfound} alt={"404 page not found"} width={1000} height={1000}></Image>
            </div>


            
        </div>
    );
};

export default Page;