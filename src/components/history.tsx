import { useEffect, useState } from "react"; 
import { useGetStory } from "../hooks/useGetStory";
import { useGetLength } from "../hooks/useGetLength";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useGetClaimReward } from "../hooks/useGetClaimReward";
import { useEthers } from "@usedapp/core";
import { toast } from "react-toastify";

const History = () => {
    const { history, historyLength, showMore } = useTypedSelector(state => state.main);
    const { PushStory, SetLength, SetShowMore, SetPaidTrue } = useActions();
    const { account } = useEthers();

    const storyHook = useGetStory();
    const lengthHook = useGetLength();
    const claimHook = useGetClaimReward();

    useEffect(() => {
        const fetchData = async () => {
            SetShowMore(false);
            const initLength = await lengthHook();
            SetLength(initLength - 5);
            let max: number = 0;
            for (let index = initLength - 1; index >= 0; index--) {
                const story = await storyHook(index);
                PushStory(story);
                max += 1;
                if(max === 5) {
                    SetShowMore(true);
                    break;
                }
            }
        }
        fetchData().catch(console.error);
    },[]);

    async function handleShowMore() {
        SetShowMore(false);
        const currLength = historyLength;
        SetLength(currLength - 5);
        let max: number = 0;
        for (let index = currLength - 1; index >= 0; index--) {
            const story = await storyHook(index);
            PushStory(story);
            max += 1;
            if(max === 5) {
                SetShowMore(true);
                break;
            }
        }
    }

    async function claimReward(id: string, index: number) {
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
        await claimHook(id);
        SetPaidTrue(index);
    }

    return (
        <div className="history">
            <div className="history__text">
                History
            </div>
            <hr/>
            <div className="history__item">
                <div>Winner</div>
                <div></div>
                <div>Random Num</div>
                <div>Reward</div>
            </div>
            <hr/>
            {
                history.length > 0 &&
                history.map((el, index) => 
                    <div 
                        className="history__item"
                        key={index}
                    >
                        <div>{ el.randomNum === "(Pending)" ? "(Pending)" : `${el.winner.slice(0, 5)}...${el.winner.slice(-4)}` }</div>
                        <div>
                            {
                                !el.paid &&
                                <button
                                 onClick={() => { claimReward(el.reqId, index) }}
                                >claim</button>
                            }
                        </div>
                        <div>{ el.randomNum }</div>
                        <div>{ el.reward }</div>
                    </div>
                )
            }    
            {
                historyLength > 0 &&
                showMore &&
                <button
                    onClick={() => {handleShowMore()}}
                    className="history__button"
                >show more</button>
            }
            
        </div>
    )

}

export default History;