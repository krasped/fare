import {
  createContext,
  useReducer,
  FC,
  PropsWithChildren,
  useEffect,
  useCallback,
} from "react";
import { Amplify, Auth } from "aws-amplify";
// CUSTOM COMPONENT
import { SplashScreen } from "@/components/splash-screen";

// CONFIGURATION SETTINGS
import awsConfig from "../../src/aws-exports";
Amplify.configure(awsConfig);

interface INITIAL_AUTH_STATE {
  user: null | Record<string, any>;
  isInitialized: boolean;
  isAuthenticated: boolean;
}

const initialAuthState: INITIAL_AUTH_STATE = {
  user: null,
  isInitialized: false,
  isAuthenticated: false,
};

const reducer = (state: INITIAL_AUTH_STATE, action: any) => {
  switch (action.type) {
    case "INIT":
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, user, isInitialized: true };

    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };

    default:
      return state;
  }
};

interface ContextProps extends INITIAL_AUTH_STATE {
  method: string;
  logout: () => Promise<void>;
  resendCode: (email: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  emailVerify: (email: string, code: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<void>;
}

// AUTH CONTEXT INITIALIZE
export const AuthContext = createContext({} as ContextProps);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(() => {
    (async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();

        if (user) {
          const {
            attributes: { sub, name, email },
          } = user || {};

          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: true,
              user: { id: sub, name, email, role: "admin" },
            },
          });
        } else {
          dispatch({
            type: "INIT",
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (error) {
        dispatch({
          type: "INIT",
          payload: { isAuthenticated: false, user: null },
        });
      }
    })();
  }, []);

  // USER LOGIN HANDLER
  const login = useCallback(async (email: string, password: string) => {
    const user = await Auth.signIn(email, password);

    dispatch({
      type: "INIT",
      payload: {
        isAuthenticated: true,
        user: {
          id: user.attributes.sub,
          name: user.attributes.name,
          email: user.attributes.email,
        },
      },
    });
  }, []);

  // USER REGISTER HANDLER
  const register = useCallback(
    async (
      email: string,
      password: string,
      firstName: string,
      lastName: string,
    ) => {
      await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
          given_name: firstName,
          family_name: lastName,
          name: `${firstName} ${lastName}`,
        },
      });
    },
    [],
  );

  // USER EMAIL VERIFY HANDLER
  const emailVerify = useCallback(async (email: string, code: string) => {
    await Auth.confirmSignUp(email, code);
  }, []);

  // RESEND CODE HANDLER
  const resendCode = useCallback(async (email: string) => {
    await Auth.resendSignUp(email);
  }, []);

  // USER LOGOUT HANDLER
  const logout = useCallback(async () => {
    await Auth.signOut();
    dispatch({ type: "LOGOUT" });
  }, []);

  // SHOW LOADING
  if (!state.isInitialized) return <SplashScreen />;

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "AMPLIFY",
        login,
        logout,
        register,
        resendCode,
        emailVerify,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
