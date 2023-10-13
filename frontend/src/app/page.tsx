import { Providers } from "@/context";
import "../lib/firebase";
import Login from "./components/login";

export default function Home() {
  return (
    <Providers>
      <Login />;
    </Providers>
  );
}
