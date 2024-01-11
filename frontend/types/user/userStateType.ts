import { ReduxStateType } from "../reduxStateType";
import { UserType } from "./userType";

export type UserStateType = {
  userData: UserType;
  signup: ReduxStateType;
  checkId: ReduxStateType;
  checkNickName: ReduxStateType;
  checkEmail: ReduxStateType;
  signin: ReduxStateType;
};
