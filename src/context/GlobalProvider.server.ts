'use server';
import { readFile } from 'node:fs/promises';

export async function getFile(name: string): Promise<string | never> {
  try {
    const _file = await readFile(`./src/markdown/${name}.md`);

    return _file.toString();
  } catch (error) {
    throw new Error('File not found');
  }
}
