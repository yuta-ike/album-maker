import DriveFile from "../../../type/driveFile";
import types from "./types";

const addFiles = (files: DriveFile[]) => ({
  type: types.ADD,
  payload: { files },
})

const pickFile = (file: DriveFile) => ({
  type: types.PICK,
  payload: { file },
})

const updateURL = (fileId: string, url: string) => ({
  type: types.UPDATE_URL,
  payload: { fileId, url }
})

const actions = { addFiles, pickFile, updateURL }
export default actions