import Button from "@/components/common/Button";
const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-3">
      <h1 className="text-5xl font-semibold text-slate-700">
        Welcome To Ella's Market
      </h1>
      <p className="text-slate-400 text-xl ">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum,
        voluptas.
      </p>
      <Button
        style="bg-blue-500 rounded-full px-4 p-1 text-white cursor-pointer hover:shadow-lg"
        title="Let's Start"
      />
    </div>
  );
};

export default Home;
