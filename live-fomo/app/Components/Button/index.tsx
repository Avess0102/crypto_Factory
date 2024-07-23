import Image from "next/image";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import coinData from "../../../json/coin-data.json";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import { setDialogState, setImgPath } from "@/Slices/openSilce";
import { fetchCoinData } from "@/Slices/coinsSlice";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  imgPath: string;
};

export default function Button() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.dialog.dialogState);
  const [coins, setCoins] = useState<Coin[]>([]);

  function getCoinsData() {
    setCoins(coinData);
    dispatch(setDialogState(true));
  }

  function getCoinData(coinId: string, imgPath: string) {
    try {
      dispatch(fetchCoinData(coinId));
      dispatch(setDialogState(false));
      dispatch(setImgPath(imgPath));
    } catch (error) {
      console.error("Error fetching coins data:", error);
    }
  }

  return (
    <>
      <div className="flex flex-col mt-16 sm:-mx-56 lg:-mx-56">
        <button
          onClick={() => getCoinsData()}
          type="button"
          data-modal-target="crypto-modal"
          data-modal-toggle="crypto-modal"
          className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
        >
          <svg
            aria-hidden="true"
            className="w-4 h-4 me-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            ></path>
          </svg>
          Select Coin
        </button>

        <Dialog
          open={open}
          onClose={() => dispatch(setDialogState(false))}
          className="relative z-10"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
              >
                <div>
                  <div className="mx-auto flex flex-shrink-0 items-center justify-center bg-black text-yellow-50 p-2 ">
                    Select Coin
                  </div>
                  <div className="mr-2">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <div className="mt-2">
                        <ul className="my-4 space-y-3">
                          {coins.map((coin: any) => {
                            return (
                              <>
                                <li
                                  onClick={() =>
                                    getCoinData(coin.id, coin.imgPath)
                                  }
                                >
                                  <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-800 hover:text-gray-50 group hover:shadow">
                                    <Image
                                      height={100}
                                      width={100}
                                      className="w-5 h-5"
                                      src={coin.imgPath}
                                      alt={coin.name}
                                    />
                                    <span className="flex-1 ms-3 whitespace-nowrap">
                                      {coin.name}
                                    </span>
                                    <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded ">
                                      {coin.symbol}
                                    </span>
                                  </div>
                                </li>
                              </>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
}
