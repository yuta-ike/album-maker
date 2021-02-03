import DriveFile from "../../../type/driveFile";
import types from "./types";

export type State = {
  selected: DriveFile[]
  all: DriveFile[]
}

const initState: State = { selected: [], all: [] }

export const fileReducer = (state = initState, action: any): State => {
  switch (action.type) {
    case types.ADD: {
      return { ...state, all: Array.from(new Set([...action.payload.files, ...state.all])) }
    }
    case types.PICK: {
      if (state.selected.find(file => file.id === action.payload.file.id)) {
        return { ...state, selected: state.selected.filter(file => file.id !== action.payload.file.id) }
      } else {
        return { ...state, selected: [...state.selected, action.payload.file] }
      }
    }
    case types.UPDATE_URL: {
      console.log(action)
      return {
        all: state.all.map((file) => file.id === action.payload.fileId ? { ...file, downloadUrl: action.payload.downloadUrl, file: { mimeType: "image/jpeg" } } : file),
        selected: state.selected.map((file) => file.id === action.payload.fileId ? { ...file, downloadUrl: action.payload.downloadUrl, file: { mimeType: "image/jpeg" } } : file),
      }
    }
    default:
      return state
  }
}

export default fileReducer