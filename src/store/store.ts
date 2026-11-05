import { configureStore } from "@reduxjs/toolkit";
import skillsReducer from "./skillsSlice";
import { skillsApi } from "./api/skillsApi";

const store = configureStore({
  reducer: {
    skills: skillsReducer,
    [skillsApi.reducerPath]: skillsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(skillsApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
