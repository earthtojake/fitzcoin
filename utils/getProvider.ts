import { JSON_RPC_ENDPOINT } from "../constants";
import { StaticJsonRpcProvider } from "@ethersproject/providers";

const provider = new StaticJsonRpcProvider(JSON_RPC_ENDPOINT);

export default function getProvider() {
  return provider;
}
