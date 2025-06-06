

const HeadLoader = () => {
  return (
    <div data-testid="head-loader" className="flex items-center gap-2"> 
     <div className="bg-gray-300 h-10 w-[120px] rounded-md animate-pulse"></div>
     <div className="bg-gray-300 h-10 w-16 rounded-md animate-pulse"></div>
    </div>
  );
};

export default HeadLoader;
