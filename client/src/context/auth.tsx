import { createContext, useContext, useEffect, useReducer } from "react";
import { User } from "../types";
import axios from "axios";

interface State {
  authenticated: boolean;
  user: User | undefined | null;
  loading: boolean;
}
interface Action {
  type: string;
  payload: any;
}
export const MAP_TYPE_KEY = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  STOP_LOADING: "STOP_LOADING",
} as const;
interface MapType {
  [key: string]: () => State;
}

const StateContext = createContext<State>({
  authenticated: false,
  user: undefined,
  loading: true,
});

const DispatchContext = createContext<any>(null);

const reducer = (state: State, { type, payload }: Action) => {
  let result: any;

  const map: MapType = {
    LOGIN: () => {
      return { ...state, authenticated: true, user: payload };
    },
    LOGOUT: () => {
      return { ...state, authenticated: false, user: null };
    },
    STOP_LOADING: () => {
      return { ...state, loading: false };
    },
  };
  result = map[type] ? map[type]() : new Error("Invalid action type");
  return result;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true,
  });

  useEffect(() => {
    async function loadUser() {
      try {
        const { data } = await axios.get("/auth/me");
        defaultDispatch({ type: MAP_TYPE_KEY.LOGIN, payload: data });
      } catch (error) {
        console.log(error);
      } finally {
        defaultDispatch({ type: MAP_TYPE_KEY.STOP_LOADING, payload: null });
      }
    }
    loadUser();
  }, []);

  const dispatch = (type: string, payload?: any) => {
    defaultDispatch({ type, payload });
  };
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
