import { MainState, MainAction, MainActionTypes } from "../../types/main"
import { EBox } from "../../types/main"

const initialState: MainState = {
    loader: false,
    currentBox: EBox.None,
}

export const mainReducer = (state: MainState = initialState, action: MainAction): MainState => {
    switch (action.type) {
        case MainActionTypes.SET_LOADER:
            return {...state, loader: action.payload}
        case MainActionTypes.SET_BOX:
            return {...state, currentBox: action.payload}
        default:
            return state
    }
}