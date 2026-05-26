import { type BaseWindow, BrowserWindow, dialog, ipcMain } from 'electron';
import fs from 'node:fs';
import chardet from 'chardet';
import * as iconv from 'iconv-lite';
import { parse } from '@marka-editor/markdown';

import { settings } from './models/settings.js';
import { clearCurrentFile, setCurrentFile } from './models/current-file.js';

export async function newFile(
	_menuItem: Electron.MenuItem,
	window: BaseWindow | undefined,
): Promise<void> {
	const targetWindow = getTargetWindow(window);
	if (!targetWindow) return;

	const closed = await requestCloseWindow(targetWindow);
	if (!closed) return;

	const result = dialog.showSaveDialogSync(targetWindow, {
		properties: ['showOverwriteConfirmation'],
		filters: [
			{ name: 'Markdown Files', extensions: ['md'] },
			{ name: 'All Files', extensions: ['*'] },
		],
	});
	if (!result) return;

	fs.writeFileSync(result, iconv.encode('', 'utf8'));
	await fileOpen(targetWindow, result);
}

export function newProject(): void {
	console.log('new project');
}

async function fileOpen(targetWindow: BrowserWindow, filePath: string): Promise<void> {
	const document = fs.readFileSync(filePath);
	const encoding = chardet.detect(document) || 'utf8';
	setCurrentFile(targetWindow.id, { filePath, encoding });

	const vfile = await parse(iconv.decode(document, encoding));
	targetWindow.webContents.send('file-opened', vfile);
}

export async function open(
	_menuItem: Electron.MenuItem,
	window: BaseWindow | undefined,
): Promise<void> {
	const targetWindow = getTargetWindow(window);
	if (!targetWindow) return;

	const closed = await requestCloseWindow(targetWindow);
	if (!closed) return;

	const result = dialog.showOpenDialogSync(targetWindow, {
		properties: ['openFile'],
		filters: [
			{ name: 'Markdown Files', extensions: ['md'] },
			{ name: 'All Files', extensions: ['*'] },
		],
	});
	if (!result) return;

	const filePath = result[0]!;
	await fileOpen(targetWindow, filePath);
}

export function openProjectFolder(): void {
	console.log('open project folder');
}

export function save(_menuItem: Electron.MenuItem, window: BaseWindow | undefined): void {
	const targetWindow = getTargetWindow(window);
	if (!targetWindow) return;

	targetWindow.webContents.send('file-save', 'save');
}

export function saveAs(_menuItem: Electron.MenuItem, window: BaseWindow | undefined): void {
	const targetWindow = getTargetWindow(window);
	if (!targetWindow) return;

	targetWindow.webContents.send('file-save', 'save-as');
}

export function rename(): void {
	console.log('rename');
}

export async function close(
	_menuItem: Electron.MenuItem,
	window: BaseWindow | undefined,
): Promise<void> {
	const targetWindow = getTargetWindow(window);
	if (!targetWindow) return;

	await requestCloseWindow(targetWindow);
}

export function openRecent(): void {
	console.log(`open recent`);
}

export function about(): void {
	console.log('about');
}

export async function setTheme(targetWindow: BrowserWindow, theme: string): Promise<void> {
	settings.theme = theme;
	targetWindow.webContents.send('theme-changed', theme);
}

export async function selectTheme(
	_menuItem: Electron.MenuItem,
	window: BaseWindow | undefined,
): Promise<void> {
	const targetWindow = getTargetWindow(window);
	if (!targetWindow) return;

	await setTheme(targetWindow, _menuItem.id);
}

export async function setFont(targetWindow: BrowserWindow, font: string): Promise<void> {
	settings.font = font;
	targetWindow.webContents.send('font-changed', font);
}

export async function selectFont(
	_menuItem: Electron.MenuItem,
	window: BaseWindow | undefined,
): Promise<void> {
	const targetWindow = getTargetWindow(window);
	if (!targetWindow) return;

	await setFont(targetWindow, _menuItem.id);
}

function getTargetWindow(window: BaseWindow | undefined): BrowserWindow | null {
	return window instanceof BrowserWindow ? window : BrowserWindow.getFocusedWindow();
}

export function requestCloseWindow(targetWindow: BrowserWindow): Promise<boolean> {
	return new Promise((resolve) => {
		const replyChannel = `file-close-reply-${targetWindow.id}-${Date.now()}`;

		const cleanup = (): void => {
			try {
				ipcMain.removeAllListeners(replyChannel);
			} catch (err) {
				console.error(err);
			}
		};

		ipcMain.once(replyChannel, (_event, closed: boolean) => {
			if (closed) {
				try {
					clearCurrentFile(targetWindow.id);
				} catch (err) {
					console.error(err);
				}
			}
			cleanup();
			resolve(Boolean(closed));
		});

		targetWindow.webContents.send('file-close', replyChannel);

		const timeout = setTimeout(() => {
			cleanup();
			resolve(false);
		}, 10000);

		ipcMain.once(replyChannel, () => clearTimeout(timeout));
	});
}
