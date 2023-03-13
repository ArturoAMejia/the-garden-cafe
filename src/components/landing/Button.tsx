import React, { FC } from "react";

interface Props {
  title: string;
}

export const Button: FC<Props> = ({ title }) => {
  return (
    <a
      href="#"
      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#FFAC4B] hover:bg-[#f5b56a]"
    >
      {title}
    </a>
  );
};
