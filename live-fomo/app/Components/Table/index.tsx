import Image from "next/image";
import { ICoinData } from "@/Slices/coinsSlice";

interface ButtonProps {
  coin: ICoinData[];
  imgPath: string;
  status: string;
  error: string | null;
}

export default function Button({ coin, imgPath, status, error }: ButtonProps) {
  function timeSince(date: any) {
    const now: any = new Date();
    const givenDate: any = new Date(date);
    const seconds = Math.floor((now - givenDate) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " years ago";
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }

    return Math.floor(seconds) + " seconds ago";
  }

  return (
    <>
      <div className="flex flex-col mt-16 min-w-full sm:-mx-56 lg:-mx-56">
        <div className="-my-2 overflow-x-auto ">
          <div className="py-2 align-middle sm:px-56 lg:px-56">
            <div className="shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 font-medium">
                  <tr>
                    <th scope="col" className="px-6 py-3 tracking-wider">
                      Cryptocoin
                    </th>
                    <th scope="col" className="px-6 py-3 tracking-wider">
                      Current Price
                    </th>
                    <th scope="col" className="px-6 py-3 tracking-wider">
                      24h High
                    </th>
                    <th scope="col" className="px-6 py-3 tracking-wider">
                      24h Low
                    </th>
                    <th scope="col" className="px-6 py-3 tracking-wider">
                      Price Change 24h
                    </th>
                    <th scope="col" className="px-6 py-3 tracking-wider">
                      Time Fetched at
                    </th>
                  </tr>
                </thead>

                {status === "loading" && <p>Loading...</p>}
                {status === "failed" && <p>Error: {error}</p>}
                {status === "succeeded" && (
                  <tbody className="bg-gray-800">
                    {coin.map((coinData: any) => {
                      if (
                        coinData.current_price &&
                        coinData.high_24h &&
                        coinData.low_24h
                      ) {
                        return (
                          <>
                            <tr className="bg-black bg-opacity-20 border-b dark:bg-gray-800 dark:border-gray-700 text-gray-200 hover:bg-gray-50 hover:text-black">
                              <th
                                scope="row"
                                className="flex items-center px-6 py-2 whitespace-nowrap hover:text-black"
                              >
                                <Image
                                  height={100}
                                  width={100}
                                  className="w-5 h-5 rounded-full"
                                  src={imgPath}
                                  alt="Jese image"
                                />
                                <div className="ps-3">
                                  <div className="text-base font-semibold">
                                    {coinData?.crypto_name}
                                  </div>
                                  <div className="font-normal text-gray-500">
                                    {coinData?.crypto_symbol}
                                  </div>
                                </div>
                              </th>
                              <td className="px-6 py-4 whitespace-nowrap">
                                ${coinData && coinData?.current_price}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                ${coinData && coinData?.high_24h}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                ${coinData && coinData?.low_24h}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center text-left">
                                  {coinData.price_change_24h > 0 && (
                                    <svg
                                      width="15"
                                      height="15"
                                      viewBox="0 0 50 50"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="me-1"
                                    >
                                      <polygon
                                        points="25,5 45,45 5,45"
                                        fill="green"
                                      />
                                    </svg>
                                  )}
                                  {coinData.price_change_24h < 0 && (
                                    <svg
                                      width="14"
                                      height="14"
                                      viewBox="0 0 50 50"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="me-1"
                                    >
                                      <polygon
                                        points="5,5 45,5 25,45"
                                        fill="red"
                                      />
                                    </svg>
                                  )}
                                  $
                                  {coinData &&
                                    coinData?.price_change_24h.toFixed(7)}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                ${coinData && timeSince(coinData?.timestamp)}
                              </td>
                            </tr>{" "}
                          </>
                        );
                      }
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
