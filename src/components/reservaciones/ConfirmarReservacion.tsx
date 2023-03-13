/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BookmarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

export const ConfirmarReservacion = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);
  const openModal = () => setIsOpen(!isOpen);
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);
  const realizarPedido = () => {
    setOpen(false)
    router.push("/menu")
  }

  return (
<>
t3est</>
  );
};
