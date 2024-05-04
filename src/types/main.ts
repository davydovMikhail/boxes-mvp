export enum EBox {
    None = "",
    ETH = "ETH",
    USDT = "USDT",
    USDC = "USDC"
}

export interface MainState {
    loader: boolean;
    currentBox: EBox;
    intervals: any[];
}

export enum MainActionTypes {
    SET_LOADER = 'SET_LOADER',
    SET_BOX = 'SET_BOX',
    SET_INTERVALS = 'SET_INTERVALS'
} 
interface SetLoaderAction {
    type: MainActionTypes.SET_LOADER;
    payload: boolean;
}
interface SetCurrentBoxAction {
    type: MainActionTypes.SET_BOX;
    payload: EBox;
}
interface SetIntervalsAction {
    type: MainActionTypes.SET_INTERVALS;
    payload: any[];
}

export type MainAction = 
    SetLoaderAction |
    SetCurrentBoxAction |
    SetIntervalsAction;
    