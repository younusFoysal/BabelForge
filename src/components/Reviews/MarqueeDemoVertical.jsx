import { cn } from '@/lib/utils';
import Marquee from '@/components/ui/marquee';
import useAxiosCommon from '@/lib/axiosCommon';
import { useQuery } from '@tanstack/react-query';
import { FaStar } from 'react-icons/fa';
import usericon from '@/image/icon/user.png';
import ImageWithFallback from '../ImageWithFallback';

export const ReviewCard = ({ image, name, message, companyName, reviewRating }) => {
  return (
    <figure
      className={cn(
        'relative h-40 cursor-pointer duration-500 overflow-hidden rounded-xl border p-4',
        // light styles
        // 'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        // dark styles
        'border-gray-50/[.1]  bg-white dark:bg-white/5 text-black dark:text-white hover:bg-gray-50/[.15]'
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <ImageWithFallback className="rounded-full" width="32" height="32" src={image} fallbackSrc={usericon} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-black dark:text-white">{name}</figcaption>
          <p className="text-xs opacity-65 font-medium text-black dark:text-white/40">{companyName}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{message}</blockquote>
      <ul className="flex gap-2 mt-4">
        {Array.from({ length: reviewRating }, (_, index) => (
          <li key={`star-${index}`}>
            <FaStar className="text-[20px] text-purple-500 dark:text-white/80" />
          </li>
        ))}
      </ul>
    </figure>
  );
};

export function MarqueeDemoVertical() {
  const axiosCommon = useAxiosCommon();

  // get All reviews
  const { data: reviews } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosCommon.get('/api/reviews');
      return res.data;
    },
    initialData: [],
  });

  const limitedReviews = reviews.slice(0, 12);
  const reviewSize = Math.ceil(limitedReviews.length / 3);

  const firstRow = limitedReviews.slice(0, reviewSize);
  const secondRow = limitedReviews.slice(reviewSize, reviewSize * 2);
  const thirdRow = limitedReviews.slice(reviewSize * 2);

  return (
    <div className="  mb-24 px-4">
      <div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
        <div className="mb-12 space-y-5 md:mb-16 text-center">
          <div className="inline-block px-3 py-1 text-sm font-semibold text-indigo-100 rounded-lg md:text-center text-cn bg-[#202c47] bg-opacity-60 hover:cursor-pointer hover:bg-opacity-40">
            Words from Others
          </div>
          <h1 className="mb-5 text-3xl font-semibold text-black dark:text-white md:text-center md:text-5xl">It&apos;s not just us.</h1>
          <p className="text-xl dark:text-white text-gray-800 md:text-center md:text-2xl">Here&apos;s what others have to say about us.</p>
        </div>
      </div>
      <div className="relative backdrop-blur-lg border-[#ffffff5a] rounded-xl border  mx-auto container grid md:h-[500px] lg:h-[650px] w-full grid-cols-1 md:grid-cols-3  overflow-hidden ">
        {/* For mobile */}
        <div className="space-y-4 md:hidden">
          {reviews?.slice(0, 4)?.map(review => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </div>

        <Marquee vertical className="[--duration:40s] space-y-4 hidden md:block">
          {firstRow?.map(review => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee reverse vertical className="[--duration:40s] space-y-4  hidden md:block">
          {secondRow?.map(review => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee vertical className="[--duration:30s] space-y-4  hidden md:block">
          {thirdRow?.map(review => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
