import { useState } from "react";
import { EBox } from "../types/main";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import eth from "../img/eth.svg";
import usdt from "../img/usdt.svg";
import usdc from "../img/usdc.svg";
import { boxesInfo } from "../utils/boxes";

const Tablo = () => {
    const [percent, setPercent] = useState(1);
    const { currentBox } = useTypedSelector(state => state.main);
    const { SetBox } = useActions();

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
        return (boxInfo().minStake * percent).toFixed(boxInfo().roundingUp);
    }

    function boxAmount() {
        return (boxInfo().minStake * 100);
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
                        box fullness: 28%
                    </div>
                    <div className="tablo__line">
                        <div 
                            style={{width: '28%'}}
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
                    <button className="tablo__button">
                        Contribute
                    </button>
                </div>
                <div className="tablo__contributors">
                    <div className="tablo__text">
                        Contributors
                    </div>
                    <div className="tablo__item">
                        <div>Wallet</div>
                        <div>Diapason</div>
                        <div>Odds(%)</div>
                    </div>
                    <hr />
                    <div className="tablo__item">
                        <div>0x3f7...760</div>
                        <div>5-15</div>
                        <div>11</div>
                    </div>
                                                            
                </div>
            </div>
        </>  
    );
}   

export default Tablo;