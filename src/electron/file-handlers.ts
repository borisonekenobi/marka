import * as fs from 'node:fs';
import { type PathOrFileDescriptor } from 'node:fs';
import { Document, parse } from '@marka-editor/markdown';

export function openFile(file: PathOrFileDescriptor): Document {
  return parse(fs.readFileSync(file, 'utf8'));
}

export function saveFile(file: PathOrFileDescriptor, content: Document): void {
  fs.writeFileSync(file, content.serialize(), 'utf8');
}
