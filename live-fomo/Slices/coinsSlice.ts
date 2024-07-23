import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface ICoinData {
  crypto_id: string;
  crypto_name: string;
  crypto_symbol: string;
  current_price: number;
  high_24: number;
  low_24: number;
  price_change_24h: number;
  _id: string;
  timestamp: Date;
}

interface CoinsState {
  coins: ICoinData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: CoinsState = {
  coins: [],
  status: "idle",
  error: null,
};

export const fetchCoinData = createAsyncThunk(
  "coins/fetchCoinData",
  async (coinId: string) => {
    const response = await axios.get(`http://localhost:4000/getData/${coinId}`);
    return response.data;
  }
);

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoinData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coins = action.payload;
      })
      .addCase(fetchCoinData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export const coinsReducer = coinsSlice.reducer;
