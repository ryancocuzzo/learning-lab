import readline from 'readline/promises';

export const promptUser = async (prompt: string): Promise<string> => {
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    return await reader.question(`${prompt}: `);
  } finally {
    reader.close();
  }
};
