import { MainAction, MainActionTypes } from "../../types/main";
import { EBox } from "../../types/main";

export function SetLoader(loader: boolean): MainAction {
    return {type: MainActionTypes.SET_LOADER, payload: loader}
}
export function SetBox(box: EBox): MainAction {
    return {type: MainActionTypes.SET_BOX, payload: box}
} 
export function SetIntervals(intervals: any[]): MainAction {
    return {type: MainActionTypes.SET_INTERVALS, payload: intervals}
} 
export function PushStory(story: any): MainAction {
    return {type: MainActionTypes.PUSH_STORY, payload: story}
}
export function SetLength(length: any): MainAction {
    return {type: MainActionTypes.SET_LENGTH, payload: length}
}
export function SetShowMore(status: any): MainAction {
    return {type: MainActionTypes.SET_SHOW_MORE, payload: status}
}
export function UnshiftStory(story: any): MainAction {
    return {type: MainActionTypes.UNSHIFT_STORY, payload: story}
}
export function SetPaidTrue(index: number): MainAction {
    return {type: MainActionTypes.SET_PAID_TRUE, payload: index}
}