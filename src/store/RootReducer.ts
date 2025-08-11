// src/store/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";

import userLuckyDrawReducer from "./slices/UserLuckyDrawSlice";

const rootReducer = combineReducers({
  userLuckyDraw: userLuckyDrawReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
