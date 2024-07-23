import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DialogState {
  dialogState: boolean;
  imgPath: string;
}

const initialState: DialogState = {
  dialogState: false,
  imgPath: "",
};

export const openSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setDialogState: (state, action: PayloadAction<boolean>) => {
      state.dialogState = action.payload;
    },
    setImgPath: (state, action: PayloadAction<string>) => {
      state.imgPath = action.payload;
    },
  },
});

export const { setDialogState, setImgPath } = openSlice.actions;
export const dialogReducer = openSlice.reducer;
