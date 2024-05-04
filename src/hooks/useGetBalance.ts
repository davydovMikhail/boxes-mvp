import { providerETH } from "../utils/provider";
import { EBox } from "../types/main";
import { boxesInfo } from "../utils/boxes";
import { useCallback } from "react"; 
import { Contract } from "ethers";
import TokenAbi from '../abi/Token.json';
import { formatUnits } from '@ethersproject/units';

export const useGetBalance = () => {

    return useCallback(
        async (account: string, box: EBox) => {  
            const boxInfo = boxesInfo[box];
            try {
                if(box === EBox.ETH) {
                    const balance = await providerETH.getBalance(account);
                    return Number(formatUnits(balance, boxInfo.decimals));
                } else {
                    const contractToken = new Contract(boxInfo.token, TokenAbi, providerETH);
                    const balance = await contractToken.balanceOf(account);
                    return Number(formatUnits(balance, boxInfo.decimals));
                }                
            } catch(error: any) {
                const errorMessage =
                    error?.error?.message ||
                    error?.message ||
                    "Check console logs for error";
                console.error(error);
                console.error(errorMessage);
            } 
        }
        ,[]
    );
}