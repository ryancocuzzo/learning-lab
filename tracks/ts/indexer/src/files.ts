import { readdir } from 'fs/promises';
import path from 'path';

export const fetchFiles = async (folderName: string): Promise<string[]> => {
    const files = await readdir(folderName, {
        recursive: true,
    });
    const filesWithPaths = files.map((f) => path.join(folderName, f));

    const txtFiles = filesWithPaths.filter((f) => f.endsWith('.txt'));

    return txtFiles;
};
