import Image from "next/image";
import React, { FC } from "react";

interface Props {
  title: string;
  author: string;
  description?: string;
  date: string;
  imgSrc: string;
}

export const BlogCard: FC<Props> = ({
  title,
  author,
  description,
  date,
  imgSrc,
}) => {
  return (
    <>
      <div
        key={title}
        className="flex flex-col overflow-hidden rounded-lg shadow-lg"
      >
        <div className="flex-shrink-0">
          <Image className="h-48 w-full object-cover" src={imgSrc} alt="" />
        </div>
        <div className="flex flex-1 flex-col justify-between bg-white p-6">
          <div className="flex-1">
            <a href={title} className="mt-2 block">
              <p className="text-xl font-semibold text-gray-900">{title}</p>
              <p className="mt-3 text-base text-gray-500">{description}</p>
            </a>
          </div>
          <div className="mt-6 flex items-center">
            <div className="flex-shrink-0">
              <a href={author}>
                <span className="sr-only">{author}</span>
                {/* <img
                    className="h-10 w-10 rounded-full"
                    src={author}
                    alt=""
                  /> */}
              </a>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                <a href={author} className="hover:underline">
                  {author}
                </a>
              </p>
              <div className="flex space-x-1 text-sm text-gray-500">
                <time dateTime={date}>{date}</time>
                <span aria-hidden="true">&middot;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
