import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712]">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-cyan-500 animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-500 font-bold">
          Dev
        </div>
      </div>
    </div>
  );
};

export default Loading;
