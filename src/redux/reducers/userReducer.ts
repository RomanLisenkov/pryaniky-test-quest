import { UserType } from "../types/userEnum.ts";

export type ActionUserType = {
  type: UserType;
  payload: {
    token: string;
    error: string | null;
  };
};

const token: string | null = localStorage.getItem("token");

const initState: { isAuth: boolean; loading: boolean; error: null | string } = {
  isAuth: !!token,
  loading: false,
  error: null,
};

export const userReducer = (state = initState, action: ActionUserType) => {
  switch (action.type) {
    case UserType.loginSucceed: {
      localStorage.setItem("token", action.payload.token);

      return { ...state, isAuth: true, loading: false };
    }

    case UserType.logout:
      return { ...state, isAuth: false };

    case UserType.startLoginLoading: {
      return { ...state, loading: true };
    }
    case UserType.stopLoginLoading: {
      return { ...state, loading: false };
    }

    case UserType.loginFailed: {
      return { ...state, error: action.payload.error, loading: false };
    }
    default:
      return state;
  }
};
