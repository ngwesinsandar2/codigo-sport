import { EStorageKeys } from "@/constants/storage-keys";
import { ILoginForm } from "@/pages/auth/Login";
import { ERoutePath } from "@/router/path.enum";
import { IProfile } from "@/types/auth.interface";
import { IContextRes } from "@/types/context-res.interface";
import { decrypt, encrypt } from "@/utils/encrypt-decrypt";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router";

export type IAuthRes = IContextRes<IProfile>;

interface IAuthContext {
  onLogin: (data: ILoginForm) => IAuthRes;
  onLogout: () => void;
  setProfile: (data: IProfile) => void;
  getProfile: () => IProfile | null;
}

enum EDefaultUser {
  UserName = "admin",
  Password = "admin123"
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuthContext = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const onLogin = (data: ILoginForm): IAuthRes => {
    if (
      data.userName === EDefaultUser.UserName &&
      data.password === EDefaultUser.Password
    ) {
      return {
        status: "success",
        code: 200,
        message: "Login Successfully!",
        data: {
          userName: data.userName
        }
      };
    } else {
      return {
        status: "error",
        code: 400,
        message: "User name or Password wrong!",
        data: null
      };
    }
  };

  const setProfile = (data: IProfile) => {
    const encryptData = encrypt<IProfile>(data);
    localStorage.setItem(EStorageKeys.UserKey, encryptData);
  };

  const getProfile = () => {
    const encryptData = localStorage.getItem(EStorageKeys.UserKey);
    if (encryptData) {
      return decrypt<IProfile>(encryptData);
    }

    return null;
  };

  const onLogout = () => {
    localStorage.clear();
    navigate(ERoutePath.Login);
  };

  const value = {
    onLogin,
    setProfile,
    getProfile,
    onLogout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
