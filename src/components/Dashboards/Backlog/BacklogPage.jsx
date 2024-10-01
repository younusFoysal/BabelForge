"use client"
import React, {useEffect, useState} from 'react';
import TableView from "@/components/Dashboards/Backlog/TableView";


const BacklogPage = () => {






    return (
        <div>
            <div className="flex flex-col gap-4 justify-center items-center w-full h-full px-3 md:px-0">
                <div className="shadow-lg rounded-lg overflow-hidden m-3 md:mx-4 w-full">

                        <TableView/>

                </div>
            </div>

        </div>
    );
};

export default BacklogPage;