import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import portfolioReducer from "./slices/portfolioSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      ui: uiReducer,
      portfolio: portfolioReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
