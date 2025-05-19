import { ethers } from "ethers";
export async function decodeTransaction(data, tokenInterface) {

    // Decode input data for token transfer
    const decodedData = tokenInterface.parseTransaction({ data });

    return ({to: decodedData.args[0], value: ethers.formatUnits(decodedData.args[1], 18)}); // Assuming 18 decimals
}