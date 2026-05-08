import { type BaseWindow, BrowserWindow, dialog } from 'electron';
import fs from 'node:fs';
import chardet from 'chardet';
import * as iconv from 'iconv-lite';

import { settings } from './models/settings.js';
import { setCurrentFile } from './models/current-file.js';

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
	const targetWindow = getTargetWindow(window);
	if (!targetWindow) return;

	const result = dialog.showOpenDialogSync(targetWindow, {
		properties: ['openFile'],
		filters: [
			{ name: 'Markdown Files', extensions: ['md'] },
			{ name: 'All Files', extensions: ['*'] },
		],
	});
	if (!result) return;

	const filePath = result[0]!;
	const document = fs.readFileSync(filePath);
	const encoding = chardet.detect(document) || 'utf8';
	setCurrentFile(targetWindow.id, { filePath, encoding });

	targetWindow.webContents.send('file-opened', iconv.decode(document, encoding));
}

export function openProjectFolder(): void {
	console.log('open project folder');
}

export async function save(
	_menuItem: Electron.MenuItem,
	window: BaseWindow | undefined,
): Promise<void> {
	const targetWindow = getTargetWindow(window);
	if (!targetWindow) return;

	targetWindow.webContents.send('file-save', 'save');
}

export async function saveAs(
	_menuItem: Electron.MenuItem,
	window: BaseWindow | undefined,
): Promise<void> {
	const targetWindow = getTargetWindow(window);
	if (!targetWindow) return;

	targetWindow.webContents.send('file-save', 'save-as');
}

export function rename(): void {
	console.log('rename');
}

export function close(): void {
	console.log('close');
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
