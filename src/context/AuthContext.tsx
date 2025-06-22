import { EStorageKeys } from "@/constants/storage-keys";
import { ILoginForm } from "@/pages/auth/Login";
import { IProfile } from "@/types/auth.interface";
import { decrypt, encrypt } from "@/utils/encrypt-decrypt";
import { createContext, useContext } from "react";

export interface IAuthRes {
  status: string;
  code: number;
  message: string;
  data: null | IProfile;
}

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
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
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

  const onLogout = () => localStorage.clear();

  const value = {
    onLogin,
    setProfile,
    getProfile,
    onLogout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
