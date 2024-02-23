import { formatEther } from "ethers";

// helper function to convert wei to eth
export const convertToETh = (value: string | number) => formatEther(BigInt(value));