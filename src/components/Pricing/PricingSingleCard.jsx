import Link from "next/link";

const PricingSingleCard = ({ pricing }) => {
  const {
    buttonText,
    features,
    featuresTitle,
    priceDetails,
    price,
    title,
    _id,
  } = pricing;

  return (
    <div
      className="relative overflow-hidden flex flex-col gap-3 p-4 w-full max-h-[650px] space-y-4 rounded-lg bg-[#503baa] border-2 border-[#7a308f] text-white"
      data-aos="fade-down"
    >
      {/* Circle decoration */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-b  from-[#762ab4] to-[#c75fe4] shadow-[0_1px_5px_3px_#c75fe4,_0_0_30px_5px_#c75fe4]"></div>

      <h4 className="text-4xl font-semibold ">{title}</h4>

      <p className="text-5xl font-semibold">
        ${price}{" "}
        <span className="text-sm text-[#b884c7] font-medium">
          {priceDetails}
        </span>
      </p>

      <Link href={`/checkout/${_id}`}>
        <button
          type="button"
          className="mt-auto relative px-2 py-2 w-full bg-[#9c50b1] text-xs font-semibold rounded-lg shadow-[0_0_2px_1px_#7a308f] transition-all duration-300 ease-in-out hover:shadow-sky-600"
        >
          <span className="relative z-10">{buttonText}</span>
        </button>
      </Link>

      <p className="text-sm text-[#b884c7] font-medium">{featuresTitle}</p>

      <ul className="flex flex-col gap-3 text-xs md:text-base font-medium flex-grow">
        {features?.map((feature, idx) => (
          <li key={idx} className="flex items-center">
            <span className="text-[#c75fe4] font-black mr-1">✓</span> {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingSingleCard;
