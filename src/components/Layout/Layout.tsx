import Head from "next/head";
import React, { FC } from "react";
import { Toaster } from "react-hot-toast";
import { Navbar } from "../landing/Navbar";
import { Footer } from "../ui/Footer";

interface Props {
  title: string;
  pageDescription: string;
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ title, pageDescription, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="logo.svg" type="image/x-icon" />
        <meta name="description" content={pageDescription} />
      </Head>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <Navbar />
      <main className="bg-[#FFF9EA]">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
