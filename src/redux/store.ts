import { Action, configureStore, Middleware } from '@reduxjs/toolkit';
import { usersReducer } from './usersSlice';
import { useDispatch } from 'react-redux';
// import logger from 'redux-logger';
// import additionalMiddleware from 'additional-middleware'

export type RootState = ReturnType<typeof store.getState>
const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(
        // correctly typed middlewares can just be used
        // additionalMiddleware,
        // you can also type middlewares manually
        // untypedMiddleware as Middleware<
        //   (action: Action<'specialAction'>) => number,
        //   RootState
        // >,
      )
      // prepend and concat calls can be chained
      // .concat(logger),
});


export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>() 

export default store;