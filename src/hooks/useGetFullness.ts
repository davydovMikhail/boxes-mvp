import { providerETH } from "../utils/provider";
import { useCallback } from "react"; 
import { EBox } from "../types/main";
import { boxesInfo } from "../utils/boxes";
import { Contract } from "ethers";
import GameAbi from '../abi/Game.json';
const addressGame = process.env.REACT_APP_GAME_CONTRACT as string;
const contractGame = new Contract(addressGame, GameAbi, providerETH);

export const useGetFullness = () => {
    return useCallback(
        async (box: EBox) => {  
            try {
                const token: string = boxesInfo[box].token;
                const requestedBox = (await contractGame.boxes(token)).currentBox;
                const fullness = await contractGame.getFullness(requestedBox);      
                return Number(fullness);    
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