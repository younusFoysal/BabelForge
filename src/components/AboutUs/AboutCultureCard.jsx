import Image from "next/image";

const AboutCultureCard = ({ image, headline, hoverText }) => {
  return (
    <div className="relative p-5 md:p-10 rounded-xl bg-blue-50 dark:bg-[#2E073F] ">
      <div className="space-y-5 md:space-y-10">
        <Image className="" src={image} alt="culture and values icon" />
        <p className="text-2xl md:text-3xl font-light">{headline}</p>
      </div>
      <div className="absolute inset-0 bg-blue-50 dark:bg-[#2E073F] bg-opacity-100 opacity-0 hover:opacity-100 flex justify-center items-center duration-300 px-3 md:px-10 rounded-xl">
        <span className="font-light text-sm md:text-base">{hoverText}</span>
      </div>
    </div>
  );
};

export default AboutCultureCard;
