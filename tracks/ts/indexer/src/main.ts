import { fetchFiles } from './files.ts';
import { InvertedIndex } from './InvertedIndex.ts';
import { promptUser } from './userPrompt.ts';

// get the files
const searchDirectory = await promptUser('Enter the directory: ');
const files = await fetchFiles(searchDirectory);
// log the files fetched
console.log(
    'Found:\n',
    files.map((f) => f + '\n'),
);
// build an inverted index from the files' content
// Phase 1: parallel read + tokenize
const results = await Promise.all(
    files.map((f) => InvertedIndex.readAndTokenizeFile(f)),
);
// Phase 2: sequential merge
const index = new InvertedIndex();
for (const { filepath, tokens } of results) {
    index.mergeDocument(filepath, tokens);
}

console.log('\n======= Query engine =======');
console.log(
    "We're about to query the index we built Type EXIT + Enter to exit the program.",
);

// perform some queries
let queryString = await promptUser('Enter your query string (): ');
while (queryString !== 'EXIT') {
    const fileResults = index.query(queryString);
    console.log('Results:');
    for (const fileResult of fileResults) {
        console.log(fileResult);
    }
    queryString = await promptUser('Enter your query string: ');
}
