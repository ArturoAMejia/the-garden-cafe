import { Loader } from "@/components/ui/Loader";
import { useObtenerPoliticasInventarioQuery } from "@/store/slices/inventario";
import { Card, Metric, CategoryBar, Legend, Text, Title } from "@tremor/react";
import React, { FC } from "react";

const PoliticasInventarioStats = () => {
  let { data: politicas, isLoading } = useObtenerPoliticasInventarioQuery();

  if (isLoading) return <Loader />;

  politicas = politicas.map((politica) => {
    return {
      ...politica,
      color:
        politica.clasificacion === "A"
          ? "red"
          : politica.clasificacion === "B"
          ? "blue"
          : "amber",
    };
  });

  return (
    <div>
      <Title className="text-2xl font-bold">Politicas </Title>
      <Legend
        className="mt-3"
        categories={politicas.map((politica) => politica.clasificacion)}
        colors={politicas.map((politica) => politica.color)}
      />
    </div>
  );
};

export default PoliticasInventarioStats;
