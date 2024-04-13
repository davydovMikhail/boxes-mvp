import { EBox } from "../types/main"

type IBoxInfo = { [key in EBox]: {
    decimals: number,
    minStake: number,
    maxStake: number,
    token: string,
    roundingUp: number
}; }

export const boxesInfo: IBoxInfo = {
    [EBox.None]: {
        decimals: 18,
        minStake: 0.01,
        maxStake: 0.75,
        token: "0x0000000000000000000000000000000000000000",
        roundingUp: 2,
    },
    [EBox.ETH]: {
        decimals: 18,
        minStake: 0.01,
        maxStake: 0.75,
        token: "0x0000000000000000000000000000000000000000",
        roundingUp: 2,
    },
    [EBox.USDC]: {
        decimals: 18,
        minStake: 20, // 1%
        maxStake: 1500, // 1%
        token: "",
        roundingUp: 0,
    },
    [EBox.USDT]: {
        decimals: 18,
        minStake: 20, // 1%
        maxStake: 1500, // 1%
        token: "",
        roundingUp: 0,
    },
}