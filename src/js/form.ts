import { IField } from './fields.js';
import { LocStorage } from './storage.js';
export { Form };

class Form {
    editMode: boolean;
    documentId: string;
    private fields: IField[];
    
    constructor(fields: IField[], editMode: boolean = false, documentId: string = "") {
        this.fields = fields;
        this.editMode = editMode;
        this.documentId = documentId;
    }

    render(parent: HTMLElement): void {
        const formElement = document.createElement("form");

        for (const field of this.fields) {
            // wrap field with div
            const div = document.createElement("div");
            div.className = "form-element";

            field.render(div);

            formElement.appendChild(div);
        }

        const divWrapButtons = document.createElement("div");
        divWrapButtons.className = "form-element";
        divWrapButtons.style.textAlign = "center";

        const buttonGoBack = document.createElement("button");
        buttonGoBack.type = "button";
        buttonGoBack.innerHTML = "Wstecz"
        buttonGoBack.addEventListener("click", (e) => {
            window.location.href = "/index.html";
            e.preventDefault();
        });
        divWrapButtons.appendChild(buttonGoBack);

        const buttonSave = document.createElement("button");
        buttonSave.type = "submit";
        buttonSave.innerHTML = "Zapisz"
        buttonSave.addEventListener("click", (e) => {
            this.save();
            window.location.href = "/index.html";
            e.preventDefault();
        });
        divWrapButtons.appendChild(buttonSave);

        formElement.appendChild(divWrapButtons);

        parent.appendChild(formElement);
    }

    getValue(): any {
        let resultValues: any = [];
        
        for (const field of this.fields) {
            resultValues.push({
                name: field.name,
                label: field.label,
                fieldType: field.type,
                options: field.options,
                value: field.getValue()
            });
        }

        return resultValues;
    }

    save() : void {
        const locStorage = new LocStorage();

        if (this.editMode) {
            locStorage.saveDocument(this.getValue(), this.documentId);
        }
        else {
            locStorage.saveDocument(this.getValue());
        }
    }
}