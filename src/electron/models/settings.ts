import path from 'node:path';
import fs from 'node:fs';
import * as os from 'node:os';

import { type Theme } from './theme.js';

interface Settings {
	dev: boolean;
	window: {
		size: {
			width: number;
			height: number;
		};
		maximize: boolean;
	};
	r2d2: boolean;
	theme: string;
	customThemes: Theme[];
	font: string;
}

const defaultSettings: Settings = {
	dev: false,
	window: {
		size: {
			width: 800,
			height: 600,
		},
		maximize: false,
	},
	r2d2: false,
	theme: 'theme-default-light',
	customThemes: [],
	font: 'sans-serif',
};

const homedir: string = path.join(os.homedir(), '.marka/');
const settingsFile = path.resolve(homedir, 'settings.json');

export let settings: Settings;
export function loadSettings(): void {
	try {
		const loadedSettings = JSON.parse(fs.readFileSync(settingsFile, 'utf8')) as Settings;
		settings = { ...defaultSettings, ...loadedSettings };
	} catch (error) {
		settings = { ...defaultSettings };
	}
}

export function saveSettings(): void {
	if (!fs.existsSync(homedir)) fs.mkdirSync(homedir, { recursive: true });
	fs.writeFileSync(settingsFile, JSON.stringify(settings), 'utf8');
}
