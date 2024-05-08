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
    history: any[];
    historyLength: number;
    showMore: boolean;
}

export enum MainActionTypes {
    SET_LOADER = 'SET_LOADER',
    SET_BOX = 'SET_BOX',
    SET_INTERVALS = 'SET_INTERVALS',
    PUSH_STORY = 'PUSH_STORY',
    SET_LENGTH = 'SET_LENGTH',
    SET_SHOW_MORE = 'SET_SHOW_MORE',
    UNSHIFT_STORY = 'UNSHIFT_STORY',
    SET_PAID_TRUE = 'SET_PAID_TRUE'
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
interface PushStoryAction {
    type: MainActionTypes.PUSH_STORY;
    payload: any;
}
interface SetLengthAction {
    type: MainActionTypes.SET_LENGTH;
    payload: number;
}
interface SetShowMoreAction {
    type: MainActionTypes.SET_SHOW_MORE;
    payload: boolean;
}
interface UnshiftStoryAction {
    type: MainActionTypes.UNSHIFT_STORY;
    payload: any;
}
interface SetPaidTrueAction {
    type: MainActionTypes.SET_PAID_TRUE;
    payload: number;
}

export type MainAction = 
    SetLoaderAction |
    SetCurrentBoxAction |
    SetIntervalsAction |
    PushStoryAction |
    SetLengthAction |
    SetShowMoreAction |
    UnshiftStoryAction |
    SetPaidTrueAction;
    