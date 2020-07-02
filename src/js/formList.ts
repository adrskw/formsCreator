import { LocStorage } from "./storage.js";
export { FormList };

class FormList {
    list: string[] = [];
    private locStorage = new LocStorage();

    getFormList(): void {
        this.list = this.locStorage.getForms();
    }

    getForm(formId: string): any {
        return this.locStorage.loadForm(formId);
    }

    removeForm(formId: string): void {
        this.locStorage.removeForm(formId);
    }

    render(parent : HTMLElement) : void {
        if (this.list.length !== 0) {
            const table = document.createElement("table");
            const tableHeaderRow = table.createTHead().insertRow();
            tableHeaderRow.insertCell().innerText = "Forms:";
            tableHeaderRow.insertCell().innerText = "Actions:";
            const tableBody = table.createTBody();

            for (const formId of this.list) {
                const tableRow = tableBody.insertRow();
                tableRow.insertCell().innerText = formId;

                const createDocumentButton = document.createElement("button");
                createDocumentButton.type = "button";
                createDocumentButton.innerText = "Create document";
                createDocumentButton.addEventListener("click", () => {
                    window.location.href = "new-document.html?id=" + formId;
                });

                const removeButton = document.createElement("button");
                removeButton.type = "button";
                removeButton.innerText = "Remove";
                removeButton.addEventListener("click", () => {
                    this.removeForm(formId);
                    this.getFormList();
                    this.render(parent);
                });

                const actionsTableCell = tableRow.insertCell();

                actionsTableCell.appendChild(createDocumentButton);
                actionsTableCell.appendChild(removeButton);
            }

            parent.innerHTML = '';
            parent.appendChild(table);
        }
        else {
            parent.innerHTML = "<p>There are no forms to display. Add a new one</p>";
        }
        
    }
}