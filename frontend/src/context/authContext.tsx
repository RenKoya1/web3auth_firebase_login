"use client";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "@firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

//AC = AuthContext
type AC = {
  user: User | false | null;
};

const AuthContext = createContext<AC>({} as AC);

export const useAuth = (): AC => useContext(AuthContext);

export function AuthContextProvider(props: any) {
  const [user, setUser] = useState<User | false | null>(null);
  function observeAuth() {
    return onAuthStateChanged(auth, (usr) => {
      if (usr) {
        setUser(usr);
      } else {
        resetUserState();
      }
    });
  }

  useEffect(() => {
    const observe = observeAuth();
    return observe;
  }, []);

  function resetUserState() {
    setUser(false);
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    </>
  );
}
