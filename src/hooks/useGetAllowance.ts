import { providerETH } from "../utils/provider";
import { EBox } from "../types/main";
import { boxesInfo } from "../utils/boxes";
import { useCallback } from "react"; 
import { Contract } from "ethers"
import TokenAbi from '../abi/Token.json';
import { formatUnits } from '@ethersproject/units';
const addressGame = process.env.REACT_APP_GAME_CONTRACT as string;

export const useGetAllowance = () => {

    return useCallback(
        async (account: string, token: EBox) => {
            const boxInfo = boxesInfo[token];
            const contractToken = new Contract(boxInfo.token, TokenAbi, providerETH);
            try {
                const allowed = await contractToken.allowance(account, addressGame);
                return Number(formatUnits(allowed, boxInfo.decimals));
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