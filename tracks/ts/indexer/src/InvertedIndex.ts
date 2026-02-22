import fs from 'fs/promises';

type DocumentId = string;

export class InvertedIndex {
    private docIdCounter = 0;
    private readonly invertedIndex: Map<string, Set<DocumentId>>;
    private readonly filepathToDocIdMap: Map<string, DocumentId>;
    private readonly docIdToFilepathName: Map<DocumentId, string>;

    constructor() {
        this.invertedIndex = new Map<string, Set<DocumentId>>();
        this.filepathToDocIdMap = new Map<string, DocumentId>();
        this.docIdToFilepathName = new Map<DocumentId, string>();
    }

    /**
     * Phase 1: Read file and extract tokens. Safe to run in parallel.
     */
    static readAndTokenizeFile = async (
        filepath: string,
    ): Promise<{ filepath: string; tokens: Set<string> }> => {
        const file = await fs.open(filepath);
        const tokens = new Set<string>();

        for await (const line of file.readLines()) {
            const lineTokens =
                line
                    .trim()
                    .toLowerCase()
                    .match(/\p{L}+/gu) ?? [];
            for (const token of lineTokens) {
                tokens.add(token);
            }
        }

        await file.close();
        return { filepath, tokens };
    };

    /**
     * Phase 2: Assign docId and merge tokens into index. Must run sequentially.
     */
    mergeDocument = (filepath: string, tokens: Set<string>): void => {
        const docId = this.generateDocId();
        this.filepathToDocIdMap.set(filepath, docId);
        this.docIdToFilepathName.set(docId, filepath);
        console.log(`Indexed ${filepath} as ${docId}`);

        for (const token of tokens) {
            const existing = this.invertedIndex.get(token) ?? new Set();
            this.invertedIndex.set(token, new Set([...existing, docId]));
        }
        console.log(`Merged ${tokens.size} tokens into the inverted index`);
    };

    /** Convenience: add a single document (uses same two-phase logic internally). */
    addDocumentToIndex = async (filepath: string): Promise<void> => {
        const { filepath: fp, tokens } =
            await InvertedIndex.readAndTokenizeFile(filepath);
        this.mergeDocument(fp, tokens);
    };

    private generateDocId = (): DocumentId => {
        return `${this.docIdCounter++}_${Date.now()}`;
    };

    getInvertedIndex = (): Map<string, Set<DocumentId>> => {
        return this.invertedIndex;
    };

    query = (qs: string): Set<string> => {
        const tokens =
            qs
                .trim()
                .toLowerCase()
                .match(/\p{L}+/gu) ?? [];
        let queryResults = new Set<DocumentId>();
        // add the results of the inverted index lookup to the query results
        for (const token of tokens) {
            queryResults = queryResults.union(
                this.invertedIndex.get(token) || new Set(),
            );
        }

        // build formatted query results
        const fileNames = new Set<string>();
        for (const qr of queryResults) {
            fileNames.add(this.docIdToFilepathName.get(qr)!);
        }
        return fileNames;
    };
}
