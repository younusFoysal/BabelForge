import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import bd from '@/image/Home/sponser/bd.png';
import canva from '@/image/Home/sponser/canva.png';
import carrefour from '@/image/Home/sponser/carrefour.png';
import coca_cola from '@/image/Home/sponser/coca_cola.png';
import oxy from '@/image/Home/sponser/oxy.png';
import netflix from '@/image/Home/sponser/netflix.png';
import google from '@/image/Home/sponser/google.png';
import microsoft from '@/image/Home/sponser/microsoft.png';
import prime from '@/image/Home/sponser/prime.png';
const Sponser = () => {
  return (
    <div className="py-[60px] px-4 text-center max-w-6xl mx-auto">
      <p className="text-[#333] font-normal dark:text-white">Trusted by 225,000+ customers, from startups to enterprises </p>
      <div className="mt-9 bg-white/50 dark:bg-white/5 backdrop-blur-lg p-12 ">
        <Marquee pauseOnHover autoFill speed={30}>
          <Image height={200} width={300} className="max-w-[90px] max-h-[50px]  hover:scale-110 mx-4 duration-500" src={bd} alt="Bd logo" />
          <Image
            height={200}
            width={300}
            className="max-w-[90px] max-h-[50px]  hover:scale-110 mx-4 duration-500"
            src={canva}
            alt="canva logo"
          />
          <Image
            height={200}
            width={300}
            className="max-w-[90px] max-h-[50px]  hover:scale-110 mx-4 duration-500"
            src={carrefour}
            alt="carrefour logo"
          />
          <Image
            height={200}
            width={300}
            className="max-w-[90px] max-h-[50px]  hover:scale-110 mx-4 duration-500"
            src={coca_cola}
            alt="coca_cola logo"
          />
          <Image
            height={200}
            width={300}
            className="max-w-[90px] max-h-[50px]  hover:scale-110 mx-4 duration-500"
            src={netflix}
            alt="netflix logo"
          />
          <Image height={200} width={300} className="max-w-[90px]   hover:scale-110 mx-4 duration-500" src={prime} alt="" />
          <Image
            height={200}
            width={300}
            className="max-w-[90px] max-h-[50px]  hover:scale-110 mx-4 duration-500"
            src={google}
            alt="google logo"
          />
          <Image
            height={200}
            width={300}
            className="max-w-[90px] max-h-[50px]  hover:scale-110 mx-4 duration-500"
            src={microsoft}
            alt="microsoft logo"
          />
          <Image height={200} width={300} className="max-w-[60px]   hover:scale-110 mx-4 duration-500" src={oxy} alt="oxy logo" />
        </Marquee>
      </div>
    </div>
  );
};

export default Sponser;

// className="flex flex-wrap mt-9 items-center justify-center gap-9"
