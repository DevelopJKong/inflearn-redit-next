import { createContext, useReducer } from 'react';
import { User } from '../types';

interface State {
   authenticated: boolean;
   user: User | undefined | null;
   loading: boolean;
}
interface Action {
   type: string;
   payload: any;
}

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
   result = map[type] ? map[type]() : new Error('Invalid action type');
   return result;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [state, dispatch] = useReducer(reducer, {
      user: null,
      authenticated: false,
      loading: true,
   });
   return (
      <DispatchContext.Provider value={dispatch}>
         <StateContext.Provider value={state}>{children}</StateContext.Provider>
      </DispatchContext.Provider>
   );
};
