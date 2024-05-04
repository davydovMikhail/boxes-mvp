import { useEthers } from "@usedapp/core";
import { useCallback } from "react";
import { useContracts } from "./useContracts";
import { constants } from 'ethers';
import { toast } from "react-toastify";
import { EBox } from "../types/main";
import { boxesInfo } from "../utils/boxes";
const addressGame = process.env.REACT_APP_GAME_CONTRACT as string;
const chain = process.env.REACT_APP_CHAIN;

export const useApproveToGame = () => {
  const { TokenContract } = useContracts();
  const { switchNetwork, account, activateBrowserWallet } = useEthers();

  return useCallback(
    async (token: EBox) => {
      let contract = TokenContract(boxesInfo[token].token);
      if (!contract) return;
      await switchNetwork(Number(chain));
      activateBrowserWallet();
      try {
        const txPromise = await contract.approve(addressGame, constants.MaxUint256);
        const tx = await txPromise.wait();
        toast.success('APPROVED', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
        });
        return tx;
      } catch (error: any) {
        const errorMessage =
          error?.error?.message ||
          error?.message ||
          "Check console logs for error";
        console.error(error);
        console.error(errorMessage);
        toast.error('Err! See console', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
        });
      }
    },
    [switchNetwork, account]
  );
};