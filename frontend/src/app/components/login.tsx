"use client";
import { useAuth } from "@/context/authContext";
import { useWallet } from "@/context/walletContext";
import "@/lib/firebase";
import { auth } from "@/lib/firebase";
import "@/lib/web3auth";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { signOut } from "firebase/auth";
export default function Login() {
  const { user } = useAuth();
  const { address } = useWallet();
  async function logout() {
    try {
      await signOut(auth);
      console.log("logout success");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  async function createAccount() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(() => {
        console.log("success");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-200 text-black">
      <button
        onClick={async () => await createAccount()}
        className="mb-2 rounded border p-2"
      >
        create Account
      </button>

      <p className="mb-4">env: {process.env.NODE_ENV}</p>
      {user && <p className="mb-4">User: {user.email}</p>}
      {address && <p className="mb-4">Address: {address}</p>}
      <button onClick={async () => await logout()} className="rounded border p-2">
        logout
      </button>
    </div>
  );
}
