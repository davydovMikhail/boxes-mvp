import { MainAction, MainActionTypes } from "../../types/main";
import { EBox } from "../../types/main";

export function SetLoader(loader: boolean): MainAction {
    return {type: MainActionTypes.SET_LOADER, payload: loader}
}
export function SetBox(box: EBox): MainAction {
    return {type: MainActionTypes.SET_BOX, payload: box}
} 