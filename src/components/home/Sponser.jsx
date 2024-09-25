import subimage1 from "@/image/Home/carousel/sub_service.avif";
import canva from "@/image/Home/sponser/canva.png";
import carrefour from "@/image/Home/sponser/carrefour.png";
import coca_cola from "@/image/Home/sponser/coca_cola.png";
import glossier from "@/image/Home/sponser/glossier.png";
import lionsgate from "@/image/Home/sponser/lionsgate.png";
import oxy from "@/image/Home/sponser/oxy.png";
import universal from "@/image/Home/sponser/universal.png";
import Image from "next/image";
const Sponser = () => {
  return (
    <div className="py-[120px] px-4 text-center">
      <p className="text-[#333] dark:text-white font-normal">
        Trusted by 225,000+ customers, from startups to enterprises{" "}
      </p>
      <div className="flex flex-wrap mt-9 items-center justify-center gap-9 bg-white dark:bg-[#EBD3F8] p-3">
        <Image
          height={200}
          width={300}
          className="max-w-[90px] max-h-[50px] hover:scale-110 duration-500"
          src={subimage1}
          alt=""
        />
        <Image
          height={200}
          width={300}
          className="max-w-[90px] max-h-[50px] hover:scale-110 duration-500"
          src={canva}
          alt=""
        />
        <Image
          height={200}
          width={300}
          className="max-w-[90px] max-h-[50px] hover:scale-110 duration-500"
          src={carrefour}
          alt=""
        />
        <Image
          height={200}
          width={300}
          className="max-w-[90px] max-h-[50px] hover:scale-110 duration-500"
          src={coca_cola}
          alt=""
        />
        <Image
          height={200}
          width={300}
          className="max-w-[90px] max-h-[50px] hover:scale-110 duration-500"
          src={glossier}
          alt=""
        />
        <Image
          height={200}
          width={300}
          className="max-w-[90px] max-h-[50px] hover:scale-110 duration-500"
          src={carrefour}
          alt=""
        />
        <Image
          height={200}
          width={300}
          className="max-w-[90px] max-h-[50px] hover:scale-110 duration-500"
          src={lionsgate}
          alt=""
        />
        <Image
          height={200}
          width={300}
          className="max-w-[90px] max-h-[50px] hover:scale-110 duration-500"
          src={oxy}
          alt=""
        />
        <Image
          height={200}
          width={300}
          className="max-w-[90px] max-h-[50px] hover:scale-110 duration-500"
          src={universal}
          alt=""
        />
      </div>
    </div>
  );
};

export default Sponser;
