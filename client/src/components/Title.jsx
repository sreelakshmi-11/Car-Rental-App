import React from "react";

const Title = ({ title, subTitle }) => {
  return (
    <div className="flex flex-col justify-center items-center text-center ">
      <h1 className="font-semibold text-4xl md:text-[40px] text-center items-center justify-center">
        {title}
      </h1>
      <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-156 text-center">
        {subTitle}
      </p>
    </div>
  );
};

export default Title;
