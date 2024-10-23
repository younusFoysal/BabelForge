import Image from 'next/image';
import Link from 'next/link';
import nodata from '../../../../public/Images/nodata.png'

const NoDataFound = ({ text, btnText, btnLink }) => {
    return (
        <div className="flex flex-col justify-center items-center gap-3 text-center p-5">
            <div className="rounded-full">
                <Image
                    src={nodata}
                    width={200}
                    height={200}
                    alt="no data found"
                    className="rounded-full w-full h-full object-cover"
                />
            </div>
            <p className='text-xl md:text-2xl font-bold text-gray-700 dark:text-white/80'>{text}</p>
            {
                btnText && <div>
                    <Link href={btnLink}>
                        <button className="bg-bgColor hover:bg-bgHoverColor text-white text-md hover:scale-105 duration-500 hover:shadow-lg hover:shadow-[#0362F3FF] font-medium px-4 py-2 rounded-md">
                            {btnText}
                        </button>
                    </Link>
                </div>
            }

        </div>
    );
};

export default NoDataFound;