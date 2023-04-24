import { FC, useContext, useState } from "react";

import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { Bars3CenterLeftIcon, BellIcon } from "@heroicons/react/24/outline";
import { AdminSidebar } from "../ui/AdminSidebar";

import { AuthContext } from "../../context";
import { ProfileDropdown } from "../ui/admin/ProfileDropdown";
import Cookies from "js-cookie";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const AdminLayout: FC<Props> = ({ title, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="min-h-full">
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:border-none">
            {/**
             
             // ! Boton que abre y cierra el sidebar
             */}
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Search bar */}
            <div className="flex flex-1 justify-end px-4 sm:px-6">
              <div className="ml-4 flex items-center md:ml-6">
                {/* Profile dropdown */}
                <ProfileDropdown />
              </div>
            </div>
          </div>
          <main className="flex-1 px-8">
            {children}
            {/* Page header */}
          </main>
        </div>
      </div>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
};
