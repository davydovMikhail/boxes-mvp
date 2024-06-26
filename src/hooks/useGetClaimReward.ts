import { useEthers } from "@usedapp/core";
import { useCallback } from "react";
import { useContracts } from "./useContracts";
import { toast } from "react-toastify";
const chain = process.env.REACT_APP_CHAIN;

export const useGetClaimReward = () => {
  const { GameContract } = useContracts();
  const { switchNetwork, account, activateBrowserWallet } = useEthers();

  return useCallback(
    async (reqId: string) => {
      if (!GameContract) return;
      await switchNetwork(Number(chain));
      activateBrowserWallet();
      try {
        let txPromise = await GameContract?.claimReward(reqId);
        const tx = await txPromise.wait();
        toast.success('CLAIMED', {
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