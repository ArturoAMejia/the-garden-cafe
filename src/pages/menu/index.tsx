import { useMenu } from "@/hooks";
import { Card } from "../../components/landing/Card";
import Layout from "../../components/Layout/Layout";

import { FilterItem } from "../../components/menu";


const Menu = () => {
  const { productos, categoriaProductos, filtro, setFiltro, menuFiltrado } =
    useMenu();
    
  return (
    <Layout title="Menú - The Garden Cafe" pageDescription="Página de Menú">
      <>
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:items-start">
              <div className="lg:sticky lg:top-4 bg-[#FFF9EA]">
                <details
                  open={true}
                  className="overflow-hidden rounded border border-gray-200"
                >
                  <summary className="flex items-center justify-between bg-[#FFF9EA] px-5 py-3 lg:hidden">
                    <span className="text-sm font-medium">
                      {" "}
                      Toggle Filters{" "}
                    </span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </summary>
                  <form className="border-t border-gray-200 lg:border-t-0">
                    <fieldset>
                      <legend className="block w-full bg-[#FFF9EA] px-5 py-3 text-xs font-medium">
                        Categorías
                      </legend>
                      <div className="space-y-2 px-5 py-6">
                        {categoriaProductos.map((categoria) => (
                          <FilterItem
                            key={`${categoria.nombre}-${categoria.id}`}
                            categoria={categoria}
                            setFiltro={setFiltro}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between border-t border-gray-200 px-5 py-3">
                        <button
                          name="reset"
                          type="button"
                          className="rounded text-xs font-medium text-gray-600 underline"
                          onClick={() => setFiltro("")}
                        >
                          Borrar filtro
                        </button>
 
                      </div>
                    </fieldset>
                  </form>
                </details>
              </div>
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#FFF9EA]0">
                    <span className="hidden sm:inline"> Mostrando </span>
                    {filtro ? menuFiltrado?.length : productos?.length} de{" "}
                    {productos?.length} productos
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {filtro
                    ? menuFiltrado?.map((prod) => (
                        <Card key={prod.id} producto={prod} />
                      ))
                    : productos?.map((prod) => (
                        <Card key={prod.id} producto={prod} />
                      ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
};

export default Menu;
