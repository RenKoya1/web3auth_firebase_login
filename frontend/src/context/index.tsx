import { AuthContextProvider } from "./authContext";
import { WalletContextProvider } from "./walletContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <WalletContextProvider>{children}</WalletContextProvider>
    </AuthContextProvider>
  );
}
