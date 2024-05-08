import { MainState, MainAction, MainActionTypes } from "../../types/main"
import { EBox } from "../../types/main"

const initialState: MainState = {
    loader: false,
    currentBox: EBox.None,
    intervals: [],
    history: [],
    historyLength: 0,
    showMore: false
}

export const mainReducer = (state: MainState = initialState, action: MainAction): MainState => {
    switch (action.type) {
        case MainActionTypes.SET_LOADER:
            return {...state, loader: action.payload}
        case MainActionTypes.SET_BOX:
            return {...state, currentBox: action.payload}
        case MainActionTypes.SET_INTERVALS:
            return {...state, intervals: [...action.payload]}
        case MainActionTypes.PUSH_STORY:
            return {...state, history: [...state.history, action.payload]}
        case MainActionTypes.SET_LENGTH:
            return {...state, historyLength: action.payload}
        case MainActionTypes.SET_SHOW_MORE:
            return {...state, showMore: action.payload}
        case MainActionTypes.UNSHIFT_STORY:
            return {...state, history: [action.payload, ...state.history]}
        case MainActionTypes.SET_PAID_TRUE:
            return {...state, 
                history: state.history.map(
                    (el, i) => i === action.payload ? { ...el, paid: true } : el
                )
            }    
        default:
            return state
    }
}