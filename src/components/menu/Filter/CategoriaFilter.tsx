import { Dispatch, FC, SetStateAction, useState } from "react";

import { RadioGroup } from "@headlessui/react";
import { ICategoriaProducto } from "@/interfaces";

interface Props {
  categorias: ICategoriaProducto[];
  setFiltro: Dispatch<SetStateAction<string>>;
}

export const CategoriaFilter: FC<Props> = ({ categorias, setFiltro }) => {
  const [selected, setSelected] = useState(categorias[0]);

  return (
    <div className="mt-4 h-52 w-full overflow-y-auto ">
      <div className="">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="flex flex-col gap-4 p-2 lg:grid lg:grid-cols-2">
            {categorias.map((categoria) => (
              <RadioGroup.Option
                key={categoria.nombre}
                onClick={() => setFiltro(categoria.nombre)}
                value={categoria.nombre}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
                  ${
                    checked ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {categoria.nombre}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-gray-500"
                            }`}
                          ></RadioGroup.Description>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
