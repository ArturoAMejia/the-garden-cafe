import { Transition, Dialog, Disclosure } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { FC, Fragment } from "react";
import Image from "next/image";
import { Modulo } from "../../interfaces/seguridad/rol-modulo";

import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminSidebar: FC<Props> = ({ setSidebarOpen, sidebarOpen }) => {
  const { data: session } = useSession();

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex w-full max-w-xs flex-1 flex-col rounded-r-md bg-[#FFCB43] pt-5 pb-4">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XCircleIcon
                      className="h-6 w-6 text-black"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex flex-grow flex-col overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                  <Image
                    height="52"
                    width="270"
                    src="/logo.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="mt-5 flex flex-grow flex-col">
                  <nav
                    className="flex-1 space-y-1 px-2 text-black"
                    aria-label="Sidebar"
                  >
                    {session?.user.modulos.map((modulo: any) =>
                      !modulo.modulo.sub_modulo ? (
                        <div key={modulo.modulo.nombre}>
                          <Link
                            className="group flex w-full items-center rounded-md py-2 pl-2 text-sm font-medium text-black"
                            href={`#`}
                            passHref
                          >
                            {/* <item.icono
                                className={`mr-3 h-6 w-6 flex-shrink-0 text-black`}
                                aria-hidden="true"
                              /> */}
                            {modulo.modulo.nombre}
                          </Link>
                        </div>
                      ) : (
                        <Disclosure
                          as="div"
                          key={modulo.modulo.nombre}
                          className="space-y-1"
                        >
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="group flex w-full items-center rounded-md py-2 pl-2 pr-1 text-left text-sm font-medium text-black">
                                {/* <item.icono
                                  className="mr-3 h-6 w-6 flex-shrink-0 text-black"
                                  aria-hidden="true"
                                /> */}
                                <span className="flex-1">
                                  {modulo.modulo.nombre}
                                </span>
                                <svg
                                  className={classNames(
                                    open
                                      ? "rotate-90 text-black"
                                      : "text-black",
                                    "ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out"
                                  )}
                                  viewBox="0 0 20 20"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M6 6L14 10L6 14V6Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </Disclosure.Button>
                              <Disclosure.Panel className="space-y-1">
                                {modulo.modulo.sub_modulo.map(
                                  (subItem: any) => (
                                    <Disclosure.Button
                                      key={subItem.nombre}
                                      as={Link}
                                      href={subItem.url}
                                      passHref
                                      className="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-black"
                                    >
                                      {subItem.nombre}
                                    </Disclosure.Button>
                                  )
                                )}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      )
                    )}
                  </nav>
                </div>
              </div>
            </div>
          </Transition.Child>
          <div className="w-14 flex-shrink-0" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-grow flex-col overflow-y-auto bg-[#FFCB43] pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <Image
              height="48"
              width="210"
              className="h-8 w-auto"
              src="/logo.svg"
              alt="Workflow"
            />
          </div>
          <div className="mt-5 flex flex-grow flex-col">
            <nav className="flex-1 space-y-1 px-2" aria-label="Sidebar">
              {session?.user.modulos.map((modulo: any) =>
                !modulo.modulo.sub_modulo ? (
                  <div key={modulo.modulo.nombre}>
                    <Link
                      className="group flex w-full items-center rounded-md py-2 pl-2 text-sm font-medium text-black"
                      href={`#`}
                      passHref
                    >
                      {/* <modulo.modulo.icono
                          className="mr-3 h-6 w-6 flex-shrink-0 text-black"
                          aria-hidden="true"
                        /> */}
                      {modulo.modulo.nombre}
                    </Link>
                  </div>
                ) : (
                  <Disclosure
                    as="div"
                    key={modulo.modulo.nombre}
                    className="space-y-1"
                  >
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="group flex w-full items-center rounded-md py-2 pl-2 pr-1 text-left text-sm font-medium text-black focus:outline-none">
                          {/* <item.icono
                            className="mr-3 h-6 w-6 flex-shrink-0 text-black"
                            aria-hidden="true"
                          /> */}
                          <span className="flex-1">{modulo.modulo.nombre}</span>
                          <svg
                            className={classNames(
                              open ? "rotate-90 text-black" : "text-black",
                              "ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out"
                            )}
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                          </svg>
                        </Disclosure.Button>
                        <Disclosure.Panel className="space-y-1">
                          {modulo.modulo.sub_modulo.map((subItem: any) => (
                            <Disclosure.Button
                              key={subItem.nombre}
                              as={Link}
                              href={subItem.url}
                              passHref
                              className="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-black"
                            >
                              {subItem.nombre}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
