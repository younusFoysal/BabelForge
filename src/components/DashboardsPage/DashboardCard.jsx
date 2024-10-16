import Image from 'next/image';
const DashboardCard = ({ row, subtitle, title, description, image }) => {
  return (
    <div className={`flex  flex-col md:flex-row lg:${row} items-center gap-4 justify-evenly p-10`}>
      <div className="justify-center  ">
        <h6 className="text-blue-500">{subtitle}</h6>
        <h1 className="text-3xl md:text-4xl font-bold my-4">{title}</h1>
        <p className="max-w-[500px]">{description}</p>
      </div>
      <div>
        <Image height={400} width={600} src={image} alt="card 1" />
      </div>
    </div>
  );
};

export default DashboardCard;
