import Box from "../components/box";
import { EBox } from "../types/main";

const Boxes = () => {

    return (
        <div className="boxes">
            {Box(EBox.ETH)}
            {Box(EBox.USDT)}
            {Box(EBox.USDC)}
        </div>
    )

}

export default Boxes;