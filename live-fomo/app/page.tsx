"use client";

import { useAppSelector } from "@/lib/store/store";
import Image from "next/image";
import Button from "./Components/Button";
import Table from "./Components/Table";

export default function Home() {
  const coin = useAppSelector((state) => state.coins.coins);
  const status = useAppSelector((state) => state.coins.status);
  const error = useAppSelector((state) => state.coins.error);
  const imgPath = useAppSelector((state) => state.dialog.imgPath);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen min-h-screen bg-gray-900 py-10">
        <Image
          height={100}
          width={100}
          className="w-16 h-16 rounded-full"
          src="https://storage.tally.so/c346cbb8-01db-4f91-85b0-3bd41156f79f/fflogo.png"
          alt="FomoFactory Logo"
        />
        <Button />
        {imgPath && (
          <Table coin={coin} status={status} imgPath={imgPath} error={error} />
        )}
      </div>
    </>
  );
}
