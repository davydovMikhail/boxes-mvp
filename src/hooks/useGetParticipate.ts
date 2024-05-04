import { useEthers } from "@usedapp/core";
import { useCallback } from "react";
import { useContracts } from "./useContracts";
import { toast } from "react-toastify";
import { EBox } from "../types/main";
import { boxesInfo } from "../utils/boxes";
import { parseUnits } from '@ethersproject/units';
const chain = process.env.REACT_APP_CHAIN;

export const useGetParticipate = () => {
  const { GameContract } = useContracts();
  const { switchNetwork, account, activateBrowserWallet } = useEthers();

  return useCallback(
    async (token: EBox, amount: number) => {
      const box = boxesInfo[token];  
      const amountDecimals = parseUnits(amount.toString(), box.decimals);
      if (!GameContract) return;
      await switchNetwork(Number(chain));
      activateBrowserWallet();
      try {
        let txPromise;
        if(token === EBox.ETH) {
            txPromise = await GameContract?.participateETH({
              value: amountDecimals,
              gasLimit: 1000000
            });
        } else {
            txPromise = await GameContract?.participateERC20(
              box.token, 
              amountDecimals, 
              {gasLimit: 1000000}
            );
        }
        const tx = await txPromise.wait();
        toast.success('PARTICIPATED', {
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