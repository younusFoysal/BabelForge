import React, {Suspense} from 'react';
import Profile from "@/components/UserProfile/Profile";

const Page = () => {
    return (
        <div>
            <Suspense fallback={<p className="text-fuchsia-500">Loading Profile..</p>}>
                <Profile></Profile>
            </Suspense>


        </div>
    );
};

export default Page;