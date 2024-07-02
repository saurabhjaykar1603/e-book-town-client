import React from "react";
import Image from "next/image";
import { Book } from "@/types";
import DownloadButton from "./components/DownloadButton";

const SingleBookPage = async ({ params }: { params: { bookId: string } }) => {
  console.log("params", params);
  let book: Book | null = null;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bookId}`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error fetching book");
    }
    let data = await response.json();
    book = data.data;
  } catch (err: any) {
    throw new Error("Error fetching book");
  }

  if (!book) {
    throw new Error("Book not found");
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-10 md:grid-cols-3">
      <div className="md:col-span-2 md:pr-16 text-primary-950">
        <h2 className="mb-5 text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
          {book.title}
        </h2>
        <span className="font-semibold">by {book.author.name}</span>
        <p className="mt-5 text-base leading-7 sm:text-lg md:text-xl md:leading-8">
          {book.description}
        </p>
        <DownloadButton fileLink={book.file} />
      </div>
      <div className="flex justify-center md:justify-end">
        <Image
          src={book.coverImage}
          alt={book.title}
          className="rounded-md border"
          height={0}
          width={0}
          sizes="100vw"
          style={{ width: "auto", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default SingleBookPage;
