import React from "react";

const Title = ({ title, subTitle }) => {
  return (
    <div className="flex flex-col justify-center items-center text-center p-2 ">
      <h1 className="font-semibold text-4xl md:text-[40px] text-center items-center justify-center">
        {title}
      </h1>
      <p className="text-gray-500 md:w-[500px] text-center">{subTitle}</p>
    </div>
  );
};

export default Title;
