import { EBox } from "../types/main";
import { useActions } from "../hooks/useActions";
// import { useTypedSelector } from "../hooks/useTypedSelector";
import { boxesInfo } from "../utils/boxes";
import eth from "../img/eth.svg";
import usdt from "../img/usdt.svg";
import usdc from "../img/usdc.svg";


const Box = (symbol: EBox) => {
    // const {  } = useTypedSelector(state => state.main);
    const { SetBox } = useActions();

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
                box fullness: 28 %
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