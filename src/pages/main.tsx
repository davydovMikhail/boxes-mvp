import { useEthers } from "@usedapp/core";
import { useTypedSelector } from "../hooks/useTypedSelector";
import Boxes from "../components/boxes";
import Tablo from "../components/tablo";
import History from "../components/history";
import Claimblock from "../components/claimblock";
import { EBox } from "../types/main";

const Main = () => {
    const { currentBox } = useTypedSelector(state => state.main);
    const { account, activateBrowserWallet, deactivate } = useEthers();

    function connect() {
        if(account) {
            deactivate();
        } else {
            activateBrowserWallet();
        }   
    }

    return (
        <>
            <div className="wrapper">
                <Claimblock />
                <div className="connect">
                    <div className="connect__address">
                        {account ? account : "not connected"}
                    </div>
                    <div className="connect__button">
                        <button onClick={() => connect()}>
                            {account ? "disconnect" : "connect wallet"}
                        </button>
                    </div>
                </div>
                {currentBox === EBox.None ?
                    <Boxes /> :
                    <Tablo />
                }
                <History />
            </div>
        </>
    )
}

export default Main;