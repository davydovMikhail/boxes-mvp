import { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useGetContributors } from "../hooks/useGetContributors";
import { useActions } from "../hooks/useActions";

const Contributors = () => {
    const { currentBox, intervals } = useTypedSelector(state => state.main);
    const contributorsHook = useGetContributors();
    const { SetIntervals } = useActions();

    useEffect(() => {
        const fetchData = async () => {
            const _intervals = await contributorsHook(currentBox);
            SetIntervals(_intervals as any[]); 
        }
        fetchData().catch(console.error);
    },[]);

    function getStartPosition(i: number) {
        return i === 0 ? 1 : Number(intervals[i-1].number) + 1; 
    }

    function getOdds(i: number) {
        return Number(intervals[i].number) - Number( i === 0 ? 0 : intervals[i - 1].number);
    }
 
    return (
        <>
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
                { intervals.length > 0 &&
                    intervals.map((el, index) => 
                        <div key={index.toString()} className="tablo__item">
                            <div>{intervals[index].participant.slice(0, 5)}...{intervals[index].participant.slice(-3)}</div>
                            <div>{getStartPosition(index)}-{Number(el.number)}</div>
                            <div>{getOdds(index)}</div>  
                        </div>
                    ) 
                }                                       
            </div>
        </>  
    );
}   

export default Contributors;