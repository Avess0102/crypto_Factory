import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { dialogReducer } from "@/Slices/openSilce";
import { coinsReducer } from "@/Slices/coinsSlice";

export const store = configureStore({
  reducer: { dialog: dialogReducer, coins: coinsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
