import { lazy } from "react";

//#region Auth
export const Login = lazy(() =>
  import("@/pages/auth/Login").then((module) => ({
    default: module.default
  }))
);
//#endregion
export const TeamList = lazy(() =>
  import("@/pages/teams/TeamList").then((module) => ({
    default: module.default
  }))
);