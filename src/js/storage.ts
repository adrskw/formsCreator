export { LocStorage }

interface IStorage {
    saveDocument(formValues : any) : string,
    loadDocument(documentId : string) : any,
    getDocuments() : string[]
}

class LocStorage implements IStorage {
    saveDocument(formValues: any, id: string = ""): string {
        let documentId : string = id;

        if (id === "") {
            documentId = "document-" + Date.now();
        }
        
        this.addDocumentIdToDocumentsList(documentId);

        localStorage.setItem(documentId, JSON.stringify(formValues));

        return documentId;
    }

    removeDocument(documentId: string): void {
        localStorage.removeItem(documentId);

        const documentsList = localStorage.getItem("documentsList");
        let documents : string[] = [];

        if (documentsList !== null) {
            documents = JSON.parse(documentsList);
        }

        const index = documents.indexOf(documentId)
        if (index !== -1) {
            documents.splice(index, 1);
        }

        localStorage.setItem("documentsList", JSON.stringify(documents));
    }

    loadDocument(documentId: string): any {
        const doc = JSON.parse(localStorage.getItem(documentId)!);

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

        if(documents.indexOf(documentId) === -1) {
            documents.push(documentId);
        }

        localStorage.setItem("documentsList", JSON.stringify(documents));
    }
}