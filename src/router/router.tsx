import * as Lazy from "./LazyComponent";

import { createBrowserRouter, Navigate } from "react-router";
import { ERoutePath } from "./path.enum";
import SuspenseLazy from "@/components/shared/suspense/SuspenseLazy";
import AuthMiddleware from "./middleware/AuthMiddleware";
import GuestMiddleware from "./middleware/GuestMiddleware";

const router = createBrowserRouter([
  {
    element: <GuestMiddleware />,
    children: [
      {
        path: ERoutePath.Login,
        element: (
          <SuspenseLazy>
            <Lazy.Login />
          </SuspenseLazy>
        )
      }
    ]
  },
  {
    element: <AuthMiddleware />,
    children: [
      {
        path: "/",
        element: (
          <Navigate
            to={ERoutePath.TeamList}
            replace
          />
        )
      },
      {
        path: ERoutePath.TeamList,
        element: (
          <SuspenseLazy>
            <></>
            {/* <Lazy. /> */}
          </SuspenseLazy>
        )
      },
    ]
  }
]);

export default router;
