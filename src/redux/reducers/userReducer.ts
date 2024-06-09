import { initState } from '../initState';
import { UserType } from '../types/userEnum.ts';

export type ActionUserType = {
  type: UserType;
};

export const userReducer = (state = initState, action: ActionUserType) => {
  switch (action.type) {
    case UserType.login:
      return { ...state, isAuth: true };
    case UserType.logout:
      return { ...state, isAuth: false };
    default:
      return state;
  }
};
