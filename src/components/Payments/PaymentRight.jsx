import Image from "next/image";

const PaymentRight = () => {
  return (
    <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
      <h2 className="sr-only">Order summary</h2>
      <div>
        <Image
          src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
          alt=""
          height={600}
          width={600}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-blue-600 to-blue-400 opacity-95" />
      </div>

      <div className="relative mt-20 text-white ">
        <h3 className="mb-5 text-lg font-bold">Support</h3>
        <p className="text-sm font-semibold">
          +01 653 235 211 <span className="font-light">(International)</span>
        </p>
        <p className="mt-1 text-sm font-semibold">
          support@nanohair.com <span className="font-light">(Email)</span>
        </p>
        <p className="mt-2 text-xs font-medium">
          Call us now for payment related issues
        </p>
      </div>
      <div className="relative mt-10 flex">
        <p className="flex flex-col">
          <span className="text-sm font-bold text-white">
            Money Back Guarantee
          </span>
          <span className="text-xs font-medium text-white">
            within 30 days of purchase
          </span>
        </p>
      </div>
    </div>
  );
};

export default PaymentRight;
