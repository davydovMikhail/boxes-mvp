import { useEthers } from "@usedapp/core";
import { toast } from "react-toastify";
import { EBox } from "../types/main";
import { useClaim } from "../hooks/useClaim";

const Claimblock = () => {

    const { account } = useEthers();
    const claimHook = useClaim();

    async function claimTest(token: EBox) {
        if (!account) {
            toast.info('FIRST CONNECT YOUR WALLET', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: true,
                pauseOnHover: false,
                draggable: true,
                theme: "dark",
            });        
            return;
        }
        await claimHook(token);
    }

    return (
        <div className="claimblock">
            <button
                onClick={() => {claimTest(EBox.USDC)}}
            >Claim USDC</button>
            <button
                onClick={() => {claimTest(EBox.USDT)}}
            >Claim USDT</button>
        </div>
    );
}   

export default Claimblock;