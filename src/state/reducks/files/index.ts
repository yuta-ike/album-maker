import reducers, { State } from "./reducers"

export type StoreState = State
export { default as fileActions } from "./actions"
export { default as fileTypes } from "./types"

const fileReducers = reducers
export default fileReducers