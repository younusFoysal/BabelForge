

const Faq = () => {
    return (
        <section className="bg-gray-100 ">

            <div className=" text-gray-800 ">
                <div className=" flex flex-col lg:justify-center  p-4 lg:w-[70%] mx-auto md:p-8">

                    <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">Frequently Asked Questions</h2>
                    <div className="space-y-4">

                        <details className="w-full border border-gray-300  rounded-lg">
                            <summary className="py-6 px-4 lg:text-2xl text-lg outline-none cursor-pointer focus:underline">Which pricing plan is right for me?</summary>
                            <div className="px-6 text-lg opacity-80 pb-4">
                                <p>We understand that each organization is unique, requiring specific features to support its workflows and projects. Above you can see the features included in the different plans to support your needs.</p>
                            </div>
                        </details>


                        <details className="w-full border border-gray-300 rounded-lg">
                            <summary className="py-6 px-4 lg:text-2xl text-lg outline-none cursor-pointer focus:underline">How does our pricing work?</summary>
                            <div className="px-6 text-lg opacity-80 pb-4">
                                <p>Our pricing is based on two factors; the feature plan you’d like to use, and the number of users on the platform. Once you’ve decided on the feature plan and users, choose your preferred subscription payment: month-to-month or annual. Payment is made in one upfront installment. If you purchase a plan for one year, you will pay for one year upfront.</p>
                            </div>
                        </details>


                        <details className="w-full border border-gray-300 rounded-lg">
                            <summary className="py-6 px-4 lg:text-2xl text-lg outline-none cursor-pointer focus:underline">Do you offer any discounted plans?</summary>
                            <div className="px-6 text-lg opacity-80 pb-4 space-y-2">
                                <p>Yes, by choosing a yearly plan, you will receive an 18% discount.</p>

                            </div>
                        </details>

                        <details className="w-full border border-gray-300 rounded-lg">
                            <summary className="py-6 px-4 lg:text-2xl text-lg outline-none cursor-pointer focus:underline">Can I change my plan?</summary>
                            <div className="px-6 text-lg opacity-80 pb-4 space-y-2">
                                <p>You can make changes to your plan at any time by changing your plan type and by adding or removing users. However, past the refund period, we offer no refunds for downgrades. To change your plan, simply go into the Admin div and click on the Billing option. From there, click 'change plan' and choose your desired plan.</p>

                            </div>
                        </details>
                    </div>
                </div>
            </div>



        



        </section>
    );
};

export default Faq;