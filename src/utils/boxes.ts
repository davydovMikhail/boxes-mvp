import { EBox } from "../types/main"

type IBoxInfo = { [key in EBox]: {
    decimals: number,
    minStake: number,
    maxStake: number,
    token: string,
    roundingUp: number
}; }
type IRewardValue = { [key in string]: string; }

export const boxesInfo: IBoxInfo = {
    [EBox.None]: {
        decimals: 0,
        minStake: 0,
        maxStake: 0,
        token: "0x00",
        roundingUp: 0,
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
        token: "0xa2C4BA3DF18aD9148dF54D4b3F73eB4357c22a4b",
        roundingUp: 0,
    },
    [EBox.USDT]: {
        decimals: 6,
        minStake: 20, // 1%
        maxStake: 1500, // 75%
        token: "0x27e017f0fF982579F06D36a091aeEC69aeF5f3A4",
        roundingUp: 0,
    },
} 
export const rewardsValue: IRewardValue = {
    "0x0000000000000000000000000000000000000000": "1 ETH",
    "0XA2C4BA3DF18AD9148DF54D4B3F73EB4357C22A4B": "2000 USDC",
    "0X27E017F0FF982579F06D36A091AEEC69AEF5F3A4": "2000 USDT",
}