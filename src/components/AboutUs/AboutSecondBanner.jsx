import banner2 from "@/image/About/banner2.jpg";
import banner3 from "@/image/About/banner3.jpg";
import banner4 from "@/image/About/banner4.jpg";
import Image from "next/image";
import CommonText from "./CommonText";

const AboutSecondBanner = () => {
  return (
    <div className="mt-12">
      {/* top */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-0 lg:gap-10 mx-2 lg:px-10 ">
        {/* left-text*/}
        <CommonText text="As we integrated and automated, built workflows, created templates, and expanded our community beyond our wildest expectations, we continued to grow. It is through this journey that the bableforge.com Work OS was born."></CommonText>
        {/* right-images */}
        <div className="w-full lg:w-3/5 flex justify-center gap-5 mt-12">
          <figure className="w-1/3 h-[350px]">
            <Image
              className="w-full h-full rounded-xl object-cover"
              src={banner2}
              alt="banner image2"
            />
          </figure>

          <figure className="w-3/5 h-[350px]">
            <Image
              className="w-full h-full rounded-xl object-cover"
              src={banner3}
              alt="banner image3"
            />
          </figure>
        </div>
      </div>

      {/* bottom */}
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-7 lg:gap-16 mx-2 lg:px-10 mt-16">
        {/* left-image */}
        <div className="w-full lg:w-1/2">
          <Image
            className="w-full h-full rounded-xl object-cover"
            src={banner4}
            alt="banner image2"
          />
        </div>
        {/* right-text */}
        <div className="w-full lg:w-1/2 space-y-3 lg:space-y-7">
          <CommonText
            text={
              "June 10th, 2021 marked the start of a new era for babelforge.com we rang the opening bell and officially became a publicly traded company on Nasdaq."
            }
            fullWidth="1"
          ></CommonText>
          <CommonText
            text={
              "These days, we continue to fuel our growth by evolving into a multi-product company, providing people, teams, and companies powerful products to help turn their work visions into a reality."
            }
            text2={"We’re only just getting started."}
            fullWidth="1"
          ></CommonText>
        </div>
      </div>
    </div>
  );
};

export default AboutSecondBanner;
