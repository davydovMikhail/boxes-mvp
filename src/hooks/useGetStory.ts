import { providerETH } from "../utils/provider";
import { rewardsValue } from "../utils/boxes";
import { useCallback } from "react"; 
import { Contract } from "ethers";
import GameAbi from '../abi/Game.json';
const addressGame = process.env.REACT_APP_GAME_CONTRACT as string;
const contractGame = new Contract(addressGame, GameAbi, providerETH);

export const useGetStory = () => {
    return useCallback(
        async (index: number) => {
            try {
                let story = {
                    winner: "(Pending)",
                    randomNum: "(Pending)",
                    reward: "",
                    paid: false,
                    reqId: ""
                };
                const requestId = await contractGame.requestIds(index); 
                const status = await contractGame.statuses(requestId);
                story.reward = rewardsValue[status.token.toLocaleUpperCase()];
                story.paid = status.paid;
                story.reqId = requestId._hex;
                if(Number(status.randomNum) > 0) {
                    story.randomNum = status.randomNum.toString();
                    story.winner = await contractGame.getWinner(status.boxId, status.randomNum);
                }
                return story;
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