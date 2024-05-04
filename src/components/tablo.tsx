import { useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { toast } from "react-toastify";
import { EBox } from "../types/main";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useGetFullness } from "../hooks/useGetFullness"; 
import { useGetParticipate } from "../hooks/useGetParticipate";
import { useGetAllowance } from "../hooks/useGetAllowance";
import { useApproveToGame } from "../hooks/useApproveToGame"; 
import { useGetBalance } from "../hooks/useGetBalance";
import { useGetContributors } from "../hooks/useGetContributors";
import eth from "../img/eth.svg";
import usdt from "../img/usdt.svg";
import usdc from "../img/usdc.svg";
import { boxesInfo } from "../utils/boxes";
import Contributors from "./contributors";

const Tablo = () => {
    const [percent, setPercent] = useState(1);
    const { currentBox } = useTypedSelector(state => state.main);
    const { SetBox, SetIntervals } = useActions();
    const { account } = useEthers();
    const [fullness, setFullness] = useState(NaN);
    const fullnessHook = useGetFullness();
    const participateHook = useGetParticipate();
    const allowanceHook = useGetAllowance();
    const approveHook = useApproveToGame();
    const balanceHook = useGetBalance();
    const contributorsHook = useGetContributors();

    useEffect(() => {
        const fetchData = async () => {
            const fullness = await fullnessHook(currentBox);
            setFullness(fullness as number);
        }
        fetchData().catch(console.error);
    },[]);

    function boxInfo() {
        return boxesInfo[currentBox];
    }

    function getIcon() {
        if(currentBox === EBox.ETH) {
            return eth;
        }
        if(currentBox === EBox.USDT) {
            return usdt;
        }
        if(currentBox === EBox.USDC) {
            return usdc;
        }
    }

    function getStakeAmount() {
        return Number((boxInfo().minStake * percent).toFixed(boxInfo().roundingUp));
    }

    function boxAmount() {
        return (boxInfo().minStake * 100);
    }

    async function contribute() {
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
        if (
            (await balanceHook(account, currentBox) as number) < getStakeAmount()
        ) {
            toast.info('NOT ENOUGH BALANCE', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: true,
                pauseOnHover: false,
                draggable: true,
                theme: "dark",
            });
            return;
        }
        if(currentBox !== EBox.ETH) {
            if((await allowanceHook(account, currentBox) as number) < getStakeAmount()) {
              await approveHook(currentBox);
            }
        }        
        await participateHook(currentBox, getStakeAmount());
        const fullness = await fullnessHook(currentBox);
        setFullness(fullness as number);
        const _intervals = await contributorsHook(currentBox);
        SetIntervals(_intervals as any[]); 
    }

    function goBack() {
        SetBox(EBox.None);
    }

    return (
        <>
            <div className="back">
                <button
                    onClick={() => {goBack()}}
                >
                    ⇐ go back
                </button>
            </div>
            <div className="tablo">
                <div className="tablo__box">
                    <div className="tablo__text">
                        box fullness: {fullness} %
                    </div>
                    <div className="tablo__line">
                        <div 
                            style={{width: `${Number.isNaN(fullness) ? 0 : fullness}%`}}
                            className="tablo__line_active">
                        </div>
                    </div>
                    <img className="tablo__img" src={getIcon()} alt="" />
                    <div className="tablo__text tablo__border">
                        {boxAmount()} {currentBox} Box
                    </div>
                    <input 
                        type="range" 
                        className="tablo__range"  
                        min="1" max="75"  
                        value={percent}
                        onChange={(e) => {setPercent(Number(e.target.value))}}
                    />
                    <div className="tablo__text tablo__border">
                      Stake Amount: <br /> {getStakeAmount()} {currentBox}
                    </div>
                    <div className="tablo__text tablo__border">
                      Odds: {percent} %
                    </div>
                    <button
                        onClick={() => {contribute()}} 
                        className="tablo__button"
                    >
                        Contribute
                    </button>
                </div>
                <Contributors />
            </div>
        </>  
    );
}   

export default Tablo;