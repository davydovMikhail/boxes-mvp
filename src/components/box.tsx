import { useEffect, useState } from "react"; 
import { EBox } from "../types/main";
import { useActions } from "../hooks/useActions";
import { useGetFullness } from "../hooks/useGetFullness"; 
import { boxesInfo } from "../utils/boxes";
import eth from "../img/eth.svg";
import usdt from "../img/usdt.svg";
import usdc from "../img/usdc.svg";


const Box = (symbol: EBox) => {
    const { SetBox } = useActions();

    const [fullness, setFullness] = useState(NaN);
    const fullnessHook = useGetFullness();

    useEffect(() => {
        const fetchData = async () => {
            const fullness = await fullnessHook(symbol);
            setFullness(fullness as number);
        }
        fetchData().catch(console.error);
    },[]);

    function boxInfo() {
        return boxesInfo[symbol];
    }

    function boxAmount() {
        return (boxInfo().minStake * 100);
    }

    function getIcon() {
        if(symbol === EBox.ETH) {
            return eth;
        }
        if(symbol === EBox.USDT) {
            return usdt;
        }
        if(symbol === EBox.USDC) {
            return usdc;
        }
    }

    function contribute() {
        SetBox(symbol);
    }

    return (
        <div className="box">
            <div className="box__value">
                box fullness: {fullness} %
            </div>
            <img className="box__label" src={getIcon()} alt="" />
            <div className="box__name">
                {boxAmount()} {symbol} Box
            </div>
            <button
                onClick={() => {contribute()}}
                className="box__button"
            >Contribute</button>
        </div>
    );
}   

export default Box;