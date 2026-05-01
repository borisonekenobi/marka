import { dialog } from 'electron';

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

  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'All Files', extensions: ['*'] }],
  });

  if (result.canceled || result.filePaths.length === 0) {
    return;
  }

  const filePath = result.filePaths[0];
  if (!filePath) {
    return;
  }

  // TODO: parse opened file and send its content to the renderer process
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
