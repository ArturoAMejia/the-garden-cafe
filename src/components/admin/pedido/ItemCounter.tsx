import { FC } from "react";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

interface Props {
  currentValue?: number;
  maxValue: number;

  // Methods
  updatedQuantity: (newValue: number) => void;
}

export const ItemCounter: FC<Props> = ({
  currentValue = 0,
  updatedQuantity,
  maxValue,
}) => {
  const addOrRemove = (value: number) => {
    if (value === -1) {
      if (currentValue === 1) return;

      return updatedQuantity(currentValue - 1);
    }

    if (currentValue >= maxValue) return;

    updatedQuantity(currentValue + 1);
  };

  return (
    <div className="flex items-center">
      <button onClick={() => addOrRemove(-1)}>
        <MinusCircleIcon className="h-6 w-6 text-black" />
      </button>
      <h1 className="w-8 text-center"> {currentValue} </h1>
      <button onClick={() => addOrRemove(+1)}>
        <PlusCircleIcon className="h-6 w-6 text-black" />
      </button>
    </div>
  );
};
