import Image from 'next/image';
import Link from 'next/link';
import nodata from '../../../../public/Images/nodata.png';

const NoDataFound = ({ text, btnText, btnLink }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 text-center p-5">
      <div className="rounded-full">
        <Image src={nodata} width={200} height={200} alt="no data found" className="rounded-full w-full h-full object-cover" />
      </div>
      <p className="text-xl md:text-2xl font-bold text-gray-700 dark:text-white/80">{text}</p>
      {btnText && (
        <div>
          <Link href={btnLink}>
            <button className="px-6 py-3 capitalize bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md transition-all duration-500 text-sm hover:scale-105 flex gap-1 items-center group ${className} dark:bg-gray-50 text-white">
              {btnText}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NoDataFound;
