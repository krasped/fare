import { configureStore } from '@reduxjs/toolkit';
import { usersReducer, billingReducer , dashboardReducer, leadsReducer, settingReducer, supportReducer, analyticsReducer  } from "./admin";
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import logger from 'redux-logger';
// import additionalMiddleware from 'additional-middleware'

export type RootState = ReturnType<typeof store.getState>
const store = configureStore({
  reducer: {
    users: usersReducer,
    billing: billingReducer,
    dashboard: dashboardReducer,
    leads: leadsReducer,
    setting: settingReducer,
    support: supportReducer,
    analytics: analyticsReducer,
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
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;