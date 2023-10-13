import { CHAIN_NAMESPACES } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
const polygonChainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x89", // hex of 137, polygon mainnet
  rpcTarget: "https://rpc.ankr.com/polygon",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Polygon Mainnet",
  blockExplorer: "https://polygonscan.com",
  ticker: "MATIC",
  tickerName: "Matic",
};
const mumbaiChainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x13881", // hex of 80001, polygon testnet
  rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Polygon Mumbai Testnet",
  blockExplorer: "https://mumbai.polygonscan.com/",
  ticker: "MATIC",
  tickerName: "Matic",
};
export const web3auth = new Web3AuthNoModal({
  clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!,
  web3AuthNetwork: "sapphire_devnet",
  chainConfig: mumbaiChainConfig,
});
const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: mumbaiChainConfig },
});
const openloginAdapter = new OpenloginAdapter({
  adapterSettings: {
    uxMode: "popup", // redirect or popup
    loginConfig: {
      jwt: {
        verifier: "forGithub", // name of the verifier created on Web3Auth Dashboard
        typeOfLogin: "jwt",
        clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID, // client id of the application created on Web3Auth Dashboard
      },
    },
  },
  privateKeyProvider,
});
web3auth.configureAdapter(openloginAdapter);
web3auth.init();
