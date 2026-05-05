import { type BaseWindow, BrowserWindow, dialog } from 'electron';
import fs from 'node:fs';

export function newFile(): void {
	console.log('new file');
}

export function newProject(): void {
	console.log('new project');
}

export async function open(
	_menuItem: Electron.MenuItem,
	window: BaseWindow | undefined,
): Promise<void> {
	const result = await dialog.showOpenDialog({
		properties: ['openFile'],
	});

	if (result.canceled || result.filePaths.length === 0) {
		return;
	}

	const filePath = result.filePaths[0]!;
	const document = fs.readFileSync(filePath, 'utf8');
	const targetWindow =
		window instanceof BrowserWindow ? window : BrowserWindow.getFocusedWindow();

	targetWindow?.webContents.send('file-opened', document);
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

export async function selectTheme(
	_menuItem: Electron.MenuItem,
	window: BaseWindow | undefined,
): Promise<void> {
	const targetWindow =
		window instanceof BrowserWindow ? window : BrowserWindow.getFocusedWindow();

	targetWindow?.webContents.send('theme-changed', _menuItem.id);
}

export async function selectFont(
	_menuItem: Electron.MenuItem,
	window: BaseWindow | undefined,
): Promise<void> {
	const targetWindow =
		window instanceof BrowserWindow ? window : BrowserWindow.getFocusedWindow();

	targetWindow?.webContents.send('font-changed', _menuItem.id);
}
