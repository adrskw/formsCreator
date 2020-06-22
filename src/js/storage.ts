export { LocStorage, DocumentList }

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

class DocumentList {
    list : string[] = [];
    private locStorage = new LocStorage();

    getDocumentList() : void {
        this.list = this.locStorage.getDocuments();
    }

    getDocument(documentId : string) : { [key: string]: string; } {
        return this.locStorage.loadDocument(documentId);
    }

    removeDocument(documentId : string) : void {
        
    }

    render(parent : HTMLElement) : void {
        const table = document.createElement("table");
        const tableHeaderRow = table.createTHead().insertRow();
        tableHeaderRow.insertCell().innerText = "Documents:";
        tableHeaderRow.insertCell().innerText = "Actions:";
        const tableBody = table.createTBody();

        console.log(this.list);

        for (const documentId of this.list) {
            const tableRow = tableBody.insertRow();
            tableRow.insertCell().innerText = documentId;

            const editButton = document.createElement("button");
            editButton.type = "button";
            editButton.innerText = "Edit";
            editButton.addEventListener("click", () => {
                window.location.href = "edit-document.html?id=" + documentId;
            });

            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.innerText = "Remove";
            removeButton.addEventListener("click", () => {
                this.removeDocument(documentId);
            });

            const actionsTableCell = tableRow.insertCell();

            actionsTableCell.appendChild(editButton);
            actionsTableCell.appendChild(removeButton);
        }

        parent.appendChild(table);
    }
}