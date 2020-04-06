import { LocStorage } from './storage';
export { Form };
class Form {
    constructor(fields) {
        this.fields = fields;
    }
    render(parent) {
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
        const buttonGoBack = document.createElement("button");
        buttonGoBack.type = "button";
        buttonGoBack.innerHTML = "Wstecz";
        buttonGoBack.addEventListener("click", (e) => {
            window.location.href = "/index.html";
            e.preventDefault();
        });
        divWrapButtons.appendChild(buttonGoBack);
        const buttonSave = document.createElement("button");
        buttonSave.type = "submit";
        buttonSave.innerHTML = "Zapisz";
        buttonSave.addEventListener("click", (e) => {
            this.save();
            window.location.href = "/index.html";
            e.preventDefault();
        });
        divWrapButtons.appendChild(buttonSave);
        formElement.appendChild(divWrapButtons);
        parent.appendChild(formElement);
    }
    getValue() {
        let resultValues = {};
        for (const field of this.fields) {
            resultValues[field.type + "_" + field.name] = field.getValue();
        }
        return resultValues;
    }
    save() {
        const locStorage = new LocStorage();
        locStorage.saveDocument(this.getValue());
    }
}
