import readline from 'readline/promises';

export const promptUser = async (question: string): Promise<string> => {
    const reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const searchDirectory = await reader.question(question);
    reader.close();
    return searchDirectory;
};
