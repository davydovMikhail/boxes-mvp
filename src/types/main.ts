export enum EBox {
    None = "",
    ETH = "ETH",
    USDT = "USDT",
    USDC = "USDC"
}

export interface MainState {
    loader: boolean;
    currentBox: EBox;
}

export enum MainActionTypes {
    SET_LOADER = 'SET_LOADER',
    SET_BOX = 'SET_BOX'
} 
interface SetLoaderAction {
    type: MainActionTypes.SET_LOADER;
    payload: boolean;
}
interface SetCurrentBoxAction {
    type: MainActionTypes.SET_BOX;
    payload: EBox;
}

export type MainAction = 
    SetLoaderAction |
    SetCurrentBoxAction;
    