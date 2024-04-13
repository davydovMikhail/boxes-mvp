import { providers } from "ethers";
const rpcETH = process.env.REACT_APP_RPC as string;

export const providerETH = new providers.JsonRpcProvider(rpcETH);