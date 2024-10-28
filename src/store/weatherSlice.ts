import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
  city: string;
}

const initialState: WeatherState = {
  city: "",
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCity: (state: any, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },
});

export const { setCity } = weatherSlice.actions;
export default weatherSlice.reducer;
