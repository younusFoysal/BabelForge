import { useRouter } from "next/navigation";

const ButtonSmall = ({ color, text }) => {
  const Router = useRouter();
  return (
    <>
      <button onClick={()=>Router.push('/dashboard')}
        className={`bg-${color} dark:text-black font-light text-[13px] text-white py-[6px] px-6 rounded-full hover:bg-primary-dark transition-colors`}
      >
        {text}
      </button>
    </>
  );
};
export default ButtonSmall;
