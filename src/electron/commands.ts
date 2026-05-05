import { dialog, ipcMain } from 'electron';
import { Document } from '@marka-editor/markdown';
import { openFile } from './file-handlers.js';

export function newFile(): void {
	console.log('new file');
}

export function newProject(): void {
	console.log('new project');
}

export async function open(
	_menuItem: Electron.MenuItem,
	window: Electron.BaseWindow | undefined,
	_event: Electron.KeyboardEvent,
): Promise<void> {
	window;
	_event;

	ipcMain.handle('open-file', async (): Promise<Document | null> => {
		const result = await dialog.showOpenDialog({
			properties: ['openFile'],
		});

		if (result.canceled || result.filePaths.length === 0) {
			return null;
		}

		const filePath = result.filePaths[0]!;

		return openFile(filePath);
	});
}

export function openProjectFolder(): void {
	console.log('open project folder');
}

export function save(): void {
	console.log('save');
}

export function saveAs(): void {
	console.log('saveAs');
}

export function rename(): void {
	console.log('rename');
}

export function close(): void {
	console.log('close');
}

export function openRecent(
	menuItem: Electron.MenuItem,
	window: Electron.BaseWindow | undefined,
	event: Electron.KeyboardEvent,
): void {
	console.log(`open recent menu item ${menuItem}`);
	console.log(window);
	console.log(event);
}

export function about(): void {
	console.log('about');
}
