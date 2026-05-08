export interface CurrentFile {
	filePath: string;
	encoding: string;
}

const currentFiles = new Map<number, CurrentFile>();

export function setCurrentFile(windowId: number, info: CurrentFile): void {
	currentFiles.set(windowId, info);
}

export function getCurrentFile(windowId: number): CurrentFile | undefined {
	return currentFiles.get(windowId);
}

export function clearCurrentFile(windowId: number): void {
	currentFiles.delete(windowId);
}
