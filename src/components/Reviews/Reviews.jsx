import emoji1 from '@/image/Emoji/fire.png';
import emoji2 from '@/image/Emoji/perfect.png';
import emoji3 from '@/image/Emoji/thumbs.png';
import Image from 'next/image';
const Reviews = () => {
    return (
        <section>


            {/* card */}
            <div className="flex justify-center ">

                <div className="flex flex-col  lg:w-[45%]  px-8 shadow-sm rounded-xl  bg-white text-black border-gray-300 border-[1px] ">

                    <div className="flex flex-col  w-full py-4 ">

                        <h2 className="text-3xl font-semibold ">Help us improve!</h2>
                        <span className="text-sm opacity-85 pt-2 pb-3">How would you like to describe your experience with our AppName?</span>

                        {/* review emojis container */}
                        <div className="flex flex-col py-6 space-y-5 ">
                           

                            <div className="flex items-center lg:space-y-0 space-y-2 lg:flex-nowrap flex-wrap space-x-4 ">
                                {/* emoji 1 */}
                                <button type="button" className='hover:shadow-xl duration-200' >
                                    <Image
                                        className='rounded-md px-4 py-2 border-[1px] border-gray-300 hover:border-blue-400 hover:border-2 object-cover  '
                                        src={emoji1}
                                        alt='fire'
                                        height={70}
                                        width={70}
                                    >

                                    </Image>
                                </button>
                                {/* emoji 2 */}
                                <button type="button" className='hover:shadow-xl duration-200' >
                                    <Image
                                        className='rounded-md px-4 py-2 border-[1px] border-gray-300 hover:border-blue-400 hover:border-2 object-cover '
                                        src={emoji1}
                                        alt='fire'
                                        height={70}
                                        width={70}
                                    >

                                    </Image>
                                </button>
                                {/* emoji 3 */}
                                <button type="button" className='hover:shadow-xl duration-200' >
                                    <Image
                                        className='rounded-md px-4 py-2 border-[1px] border-gray-300 hover:border-blue-400 hover:border-2 object-cover '
                                        src={emoji2}
                                        alt='fire'
                                        height={70}
                                        width={70}
                                    >

                                    </Image>
                                </button>
                                {/* emoji 4 */}
                                <button type="button" className='hover:shadow-xl duration-200' title="Rate 1 stars" aria-label="Rate 1 stars">
                                    <Image
                                        className='rounded-md px-4 py-2 border-[1px] border-gray-300  hover:border-blue-400 hover:border-2 object-cover'
                                        src={emoji3}
                                        alt='fire'
                                        height={70}
                                        width={70}
                                    >

                                    </Image>
                                </button>
                                {/* emoji 5 */}
                                <button type="button" className='hover:shadow-xl duration-200' title="Rate 1 stars" aria-label="Rate 1 stars">
                                    <Image
                                        className='rounded-md px-4 py-2 border-[1px] border-gray-300  hover:border-blue-400 hover:border-2 object-cover'
                                        src={emoji1}
                                        alt='fire'
                                        height={70}
                                        width={70}
                                    >

                                    </Image>
                                </button>


                            </div>

                        </div>

                        {/* text area, cancel and submit button */}
                        <div className="flex flex-col w-full mt-4 ">
                            <p className='pb-2 opacity-90'>whats your overall experience?</p>

                            <textarea rows="5" placeholder="please share your thoughts..." className="p-2 rounded-md resize-none text-black border-gray-300 border-[1px]"></textarea>

                            <div className='py-4 flex items-center gap-3 mt-3'>
                                <button class="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100  text-black border-gray-300 border-[1px] rounded-lg text-sm w-full">
                                    Cancel
                                </button>
                                <button class="px-5 py-2.5 font-medium bg-primary  text-white rounded-lg text-sm w-full hover:bg-blue-700">
                                    Submit
                                </button>
                            </div>
                        </div>

                    </div>


                </div>
            </div>

        </section>
    );
};

export default Reviews;