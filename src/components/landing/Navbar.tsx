import { Fragment, useContext, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  ArrowLeftCircleIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  InboxIcon,
  ShoppingCartIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { navbar } from "../../helpers/navbar/navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { AuthContext, CartContext } from "@/context";
import { signOut, useSession } from "next-auth/react";
import { rolesValidos } from "@/helpers";

export const Navbar = () => {
  const router = useRouter();
  const [totalItemsCart, setTotalItemsCart] = useState(0);

  const { data: session } = useSession();

  const { numberOfItems } = useContext(CartContext);
  const path = router.pathname;

  useEffect(() => {
    if (numberOfItems) {
      setTotalItemsCart(numberOfItems);
    } else {
      setTotalItemsCart(0);
    }
  }, [numberOfItems]);

  return (
    <div className=" relative top-0 bg-[#FAB73A]">
      {rolesValidos.includes(session?.user.id_rol) ? (
        <div className="bg-black px-4 py-1.5 text-white sm:flex sm:items-center sm:justify-end sm:px-6 lg:px-60">
          <Link
            href="/admin"
            className="mt-4 flex items-center gap-2 rounded-lg bg-white px-5 py-1.5 text-center text-sm font-medium text-black transition hover:bg-white/90 focus:outline-none focus:ring active:text-indigo-500 sm:mt-0"
          >
            <InboxIcon className="h-6 w-6" />
            Ir al Dashboard
          </Link>
        </div>
      ) : (
        ""
      )}

      <Popover className="relative bg-[#FAB73A] shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center  justify-between py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/">
                <span className="sr-only">Workflow</span>
                <Image height={52} width={52} src="/logo.svg" alt="logo-tgc" />
              </Link>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-[#FAB73A] p-2 text-black hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset ">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden space-x-10 md:flex">
              {navbar.map((nav) => (
                <Link
                  className={
                    path === nav.href
                      ? ` text-lg font-medium text-black underline decoration-[#c08d2e] decoration-4 hover:text-gray-900`
                      : `text-base font-medium text-white hover:text-gray-900`
                  }
                  key={nav.name}
                  href={nav.href}
                >
                  {nav.name}
                </Link>
              ))}
              <button className="rounded-full p-1 text-black hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <Link className="static" href="/cart">
                  <ShoppingCartIcon className="h-6 w-6 text-black" />
                  <span className="absolute top-6 items-center rounded-full bg-[#5c7c10] px-2.5 py-0.5 text-xs font-medium text-white">
                    {totalItemsCart > 9 ? "9+" : totalItemsCart}
                  </span>
                </Link>
              </button>
            </Popover.Group>
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              {session?.user.email ? (
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="whitespace-nowrap text-base font-medium text-black hover:text-gray-900"
                >
                  Cerrar Sesión
                </button>
              ) : (
                <>
                  <Link
                    className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-full border border-transparent bg-[#8CA862] px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-[#899F56]"
                    href="/auth/login"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    className="ml-2 inline-flex items-center justify-center whitespace-nowrap rounded-full border border-transparent bg-[#388C04] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#8CA862]"
                    href="/auth/register"
                  >
                    <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5 text-white" />
                    Registrate
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-[#FAB73A] shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Image
                      height={52}
                      width={52}
                      src="/logo.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-[#FAB73A] p-2 text-black hover:bg-gray-100 hover:text-black ">
                      <span className="sr-only">Close menu</span>
                      <XCircleIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6"></div>
              </div>
              <div className="space-y-6 py-6 px-5">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {navbar.map((nav) => (
                    <Link
                      key={nav.name}
                      href={nav.href}
                      className={
                        path === nav.href
                          ? ` text-lg font-medium text-white underline decoration-[#FFCB43] decoration-4 hover:text-gray-900`
                          : `text-base font-medium text-black hover:text-gray-900`
                      }
                    >
                      {nav.name}
                    </Link>
                  ))}
                  <button className="rounded-full p-1 text-black hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <Link href="/cart" className="static">
                      <ShoppingCartIcon className="h-6 w-6 text-white" />

                      <span className="absolute top-56 left-1/2 items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 ">
                        {totalItemsCart > 9 ? "9+" : totalItemsCart}
                      </span>
                    </Link>
                  </button>
                </div>
                {session?.user.email ? (
                  <button
                    type="button"
                    onClick={() => signOut()}
                    className="flex w-full justify-center gap-2 whitespace-nowrap rounded-md bg-white p-2 text-base font-medium text-black hover:text-gray-900"
                  >
                    <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                    Cerrar Sesión
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-transparent bg-[#8CA862] px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-[#899F56]"
                      href="/auth/login"
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-transparent bg-[#388C04] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#8CA862]"
                      href="/auth/register"
                    >
                      <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5 text-white" />
                      Registrate
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};
