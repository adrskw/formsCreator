import { LocStorage } from "./storage.js";
export { DocumentList };

class DocumentList {
    list : string[] = [];
    private locStorage = new LocStorage();

    getDocumentList() : void {
        this.list = this.locStorage.getDocuments();
    }

    getDocument(documentId : string) : any {
        return this.locStorage.loadDocument(documentId);
    }

    removeDocument(documentId : string) : void {
        this.locStorage.removeDocument(documentId);
    }

    render(parent : HTMLElement) : void {
        if (this.list.length !== 0) {
            const table = document.createElement("table");
            const tableHeaderRow = table.createTHead().insertRow();
            tableHeaderRow.insertCell().innerText = "Documents:";
            tableHeaderRow.insertCell().innerText = "Actions:";
            const tableBody = table.createTBody();

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
                    this.getDocumentList();
                    this.render(parent);
                });

                const actionsTableCell = tableRow.insertCell();

                actionsTableCell.appendChild(editButton);
                actionsTableCell.appendChild(removeButton);
            }

            parent.innerHTML = '';
            parent.appendChild(table);
        }
        else {
            parent.innerHTML = "<p>There are no documents to display. Add a new one</p>";
        }
    }
}