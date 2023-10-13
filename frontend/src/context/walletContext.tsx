"use client";
import { auth } from "@/lib/firebase";
import { web3auth } from "@/lib/web3auth";
import { IProvider, WALLET_ADAPTERS } from "@web3auth/base";
import { ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";

type WC = {
  signer: ethers.Signer | ethers.BrowserProvider | null;
  address: `0x${string}` | null;
};

const WalletContext = createContext<WC>({} as WC);

export const useWallet = (): WC => useContext(WalletContext);

export function WalletContextProvider(props: any) {
  const [signer, setSigner] = useState<ethers.Signer | ethers.BrowserProvider | null>(
    null
  );
  const [address, setAddress] = useState<`0x${string}` | null>(null);
  const { user } = useAuth();

  async function connectWeb3Auth() {
    const idToken = await auth.currentUser?.getIdToken();
    console.log(web3auth.status);
    await web3auth!
      .connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: "jwt",
        extraLoginOptions: {
          id_token: idToken,
          verifierIdField: "sub",
        },
      })
      .then(async (web3authProvider: IProvider | null) => {
        if (web3authProvider) {
          const provider = new ethers.BrowserProvider(web3authProvider);
          setSigner(await provider.getSigner());
          setAddress((await (await provider.getSigner()).getAddress()) as `0x${string}`);
        }
      })
      .catch((e: any) => {
        alert(e.message);
        alert(e.code);
      });
  }

  useEffect(() => {
    console.log(user, signer);
    if (user && !signer) {
      connectWeb3Auth();
    } else if (user === false) {
      setSigner(null);
      setAddress(null);
    }
  }, [user, signer]);

  return (
    <>
      <WalletContext.Provider
        value={{
          signer,
          address,
        }}
      >
        {props.children}
      </WalletContext.Provider>
    </>
  );
}
