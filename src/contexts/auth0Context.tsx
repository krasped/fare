import {
  createContext,
  useEffect,
  useReducer,
  FC,
  PropsWithChildren,
  useCallback,
} from "react";
import {
  Auth0Client,
  LogoutOptions,
  PopupLoginOptions,
  User,
} from "@auth0/auth0-spa-js";
// CUSTOM COMPONENT
import { LoadingProgress } from "@/components/loader";

interface INITIAL_AUTH_STATE {
  user: User | null;
  isInitialized: boolean;
  isAuthenticated: boolean;
}

const auth0Client = new Auth0Client({
  clientId: import.meta.env.VITE_APP_AUTH0_CLIENT_ID as string,
  domain: import.meta.env.VITE_APP_AUTH0_DOMAIN as string,
  authorizationParams: { redirect_uri: window.location.origin },
});

const initialAuthState: INITIAL_AUTH_STATE = {
  user: null,
  isInitialized: false,
  isAuthenticated: false,
};

const reducer = (state: INITIAL_AUTH_STATE, action: any) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialized: true, user };
    }

    case "LOGIN": {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }

    case "LOGOUT": {
      return { ...state, isAuthenticated: false, user: null };
    }

    default: {
      return state;
    }
  }
};

interface ContextProps extends INITIAL_AUTH_STATE {
  method: string;
  logout: (options?: LogoutOptions) => void;
  loginWithPopup: (options?: PopupLoginOptions) => Promise<void>;
}

export const AuthContext = createContext({} as ContextProps);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  // LOGIN HANDLE
  const loginWithPopup = useCallback(async (options?: PopupLoginOptions) => {
    await auth0Client.loginWithPopup(options);

    const isAuthenticated = await auth0Client.isAuthenticated();

    if (isAuthenticated) {
      const user = await auth0Client.getUser();

      dispatch({
        type: "LOGIN",
        payload: {
          user: {
            id: user?.sub,
            name: user?.name,
            email: user?.email,
            avatar: user?.picture,
          },
        },
      });
    }
  }, []);

  // LOGOUT HANDLE
  const logout = useCallback((options?: LogoutOptions) => {
    auth0Client.logout(options);
    dispatch({ type: "LOGOUT" });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await auth0Client.checkSession();
        const isAuthenticated = await auth0Client.isAuthenticated();

        if (isAuthenticated) {
          const user = await auth0Client.getUser();

          const payload = {
            isAuthenticated,
            user: {
              role: "admin",
              id: user?.sub,
              name: user?.name,
              email: user?.email,
              avatar: user?.picture,
            },
          };

          dispatch({ type: "INIT", payload });
        } else {
          dispatch({
            type: "INIT",
            payload: { isAuthenticated, user: null },
          });
        }
      } catch (err) {
        // console.log(err);
        dispatch({
          type: "INIT",
          payload: { isAuthenticated: false, user: null },
        });
      }
    })();
  }, []);

  if (!state.isInitialized) return <LoadingProgress />;

  return (
    <AuthContext.Provider
      value={{ ...state, method: "AUTH0", loginWithPopup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
