import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { superpowersReducer } from './slices/superpowers/superpowers.slice';
import { superheroesReducer } from './slices/superheroes/superheroes.slice';

const rootReducer = combineReducers({
  superpowers: superpowersReducer,
  superheroes: superheroesReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      })
  });
};

export const store = setupStore();
export type AppStateType = ReturnType<typeof rootReducer>;
export type AppStoreType = ReturnType<typeof setupStore>;
export type AppDispatchType = AppStoreType['dispatch'];
