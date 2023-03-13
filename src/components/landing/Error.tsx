import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import React, { FC } from "react";

interface Props {
  error: any
}
export const Error:FC<Props> = ({error}) => {
  return (
    <div className="bg-red-700 rounded-lg p-2 inset-y-0 right-0 pr-3 flex items-center pointer-events-none mb-2">
      <ExclamationCircleIcon
        className="h-6 w-6 text-white"
        aria-hidden="true"
      />
      <p className="text-white text-md font-bold ml-1">{error}</p>
    </div>
  );
};
