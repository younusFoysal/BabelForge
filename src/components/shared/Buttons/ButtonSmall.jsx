const ButtonSmall = ({ color, text }) => {
  return (
    <>
      <button
        className={`bg-${color} font-light text-[13px] text-white py-[6px] px-6 rounded-full hover:bg-primary-dark transition-colors`}
      >
        {text}
      </button>
    </>
  );
};
export default ButtonSmall;
