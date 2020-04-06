interface IStorage {
    saveDocument(formValues : {[key: string]: string}) : string,
    loadDocument(documentId : string) : {[key: string]: string},
    getDocuments() : string[]
}

class LocStorage implements IStorage {
    saveDocument(formValues: { [key: string]: string; }): string {
        const documentId : string = "document-" + Date.now();
        this.addDocumentIdToDocumentsList(documentId);

        localStorage.setItem(documentId, JSON.stringify(formValues));

        return documentId;
    }
    loadDocument(documentId: string): { [key: string]: string; } {
        const doc : { [key: string]: string; } = JSON.parse(localStorage.getItem(documentId)!);

        return doc;
    }
    getDocuments(): string[] {
        const documentsListJson = localStorage.getItem("documentsList");
        let documentsList : string[] = [];
 
        if (documentsListJson !== null) {
            documentsList = JSON.parse(documentsListJson);
        }

        return documentsList;
    }

    private addDocumentIdToDocumentsList(documentId : string) : void {
        const documentsList = localStorage.getItem("documentsList");
        let documents : string[] = [];

        if (documentsList !== null) {
            documents = JSON.parse(documentsList);
        }

        documents.push(documentId);

        localStorage.setItem("documentsList", JSON.stringify(documents));
    }
}