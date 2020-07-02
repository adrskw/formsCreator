import { FieldType } from "./fields.js";
import { LocStorage } from "./storage.js";
export { FormCreator };
class FormCreator {
    constructor() {
    }
    newForm(parent) {
        const formElement = document.createElement("form");
        const divWrapMainButtons = document.createElement("div");
        divWrapMainButtons.className = "form-element";
        divWrapMainButtons.style.textAlign = "center";
        const addFieldButton = document.createElement("button");
        addFieldButton.type = "button";
        addFieldButton.style.width = "60%";
        addFieldButton.innerText = "Add element";
        addFieldButton.addEventListener("click", () => {
            this.generateFieldSettings(divFieldsWrapper);
        });
        const removeFieldButton = document.createElement("button");
        removeFieldButton.type = "button";
        removeFieldButton.style.width = "60%";
        removeFieldButton.innerText = "Remove element";
        removeFieldButton.addEventListener("click", () => {
            if (divFieldsWrapper.children.length > 1) {
                divFieldsWrapper.removeChild(divFieldsWrapper.lastChild);
            }
        });
        divWrapMainButtons.appendChild(addFieldButton);
        divWrapMainButtons.appendChild(removeFieldButton);
        formElement.appendChild(divWrapMainButtons);
        const divFieldsWrapper = document.createElement("div");
        divFieldsWrapper.className = "form-element";
        divFieldsWrapper.id = "fieldsWrapper";
        this.generateFieldSettings(divFieldsWrapper);
        formElement.appendChild(divFieldsWrapper);
        const divWrapSubmitButtons = document.createElement("div");
        divWrapSubmitButtons.className = "form-element";
        divWrapSubmitButtons.style.textAlign = "center";
        const buttonGoBack = document.createElement("button");
        buttonGoBack.type = "button";
        buttonGoBack.innerHTML = "Wstecz";
        buttonGoBack.addEventListener("click", (e) => {
            window.location.href = "/index.html";
            e.preventDefault();
        });
        const buttonSave = document.createElement("button");
        buttonSave.type = "submit";
        buttonSave.innerHTML = "Zapisz";
        buttonSave.addEventListener("click", (e) => {
            this.saveForm();
            window.location.href = "/form-list.html";
            e.preventDefault();
        });
        divWrapSubmitButtons.appendChild(buttonGoBack);
        divWrapSubmitButtons.appendChild(buttonSave);
        formElement.appendChild(divWrapSubmitButtons);
        parent.appendChild(formElement);
    }
    getFields() {
        let resultValues = [];
        const formFields = document.getElementById("fieldsWrapper");
        for (const formField of formFields.children) {
            const fieldTypeSelect = formField.querySelector("select[name='fieldType']");
            const fieldNameInput = formField.querySelector("input[name='fieldName']");
            const fieldLabelInput = formField.querySelector("input[name='fieldLabel']");
            const fieldDefaultValueInput = formField.querySelector("input[name='fieldDefaultValue']");
            const fieldOptionsInput = formField.querySelector("input[name='fieldOptions']");
            const fieldType = fieldTypeSelect.value.toUpperCase();
            const fieldOptions = fieldOptionsInput.value.split(";");
            resultValues.push({
                name: fieldNameInput.value,
                label: fieldLabelInput.value,
                fieldType: FieldType[fieldType],
                options: fieldOptions,
                value: fieldDefaultValueInput.value
            });
        }
        console.log(resultValues);
        return resultValues;
    }
    saveForm() {
        const locStorage = new LocStorage();
        locStorage.saveForm(this.getFields());
    }
    generateFieldSettings(parent) {
        const fieldSettigs = document.createElement("div");
        fieldSettigs.style.padding = "3px";
        const fieldType = document.createElement("select");
        fieldType.name = "fieldType";
        for (const optionValue of Object.keys(FieldType)) {
            const optionElement = document.createElement("option");
            optionElement.value = optionElement.text = optionValue;
            fieldType.appendChild(optionElement);
        }
        fieldType.addEventListener("change", () => {
            if (fieldType.value === "SELECT") {
                fieldOptions.style.display = "inline-block";
            }
            else {
                fieldOptions.style.display = "none";
            }
        });
        fieldSettigs.appendChild(fieldType);
        const fieldName = document.createElement("input");
        fieldName.name = "fieldName";
        fieldName.type = "text";
        fieldName.placeholder = "nazwa pola";
        fieldSettigs.appendChild(fieldName);
        const fieldLabel = document.createElement("input");
        fieldLabel.name = "fieldLabel";
        fieldLabel.type = "text";
        fieldLabel.placeholder = "etykieta pola";
        fieldSettigs.appendChild(fieldLabel);
        const fieldDefaultValue = document.createElement("input");
        fieldDefaultValue.name = "fieldDefaultValue";
        fieldDefaultValue.type = "text";
        fieldDefaultValue.placeholder = "domyślna wartość pola";
        fieldSettigs.appendChild(fieldDefaultValue);
        const fieldOptions = document.createElement("input");
        fieldOptions.name = "fieldOptions";
        fieldOptions.type = "text";
        fieldOptions.placeholder = "opcje (oddzielone \";\")";
        fieldOptions.style.display = "none";
        fieldSettigs.appendChild(fieldOptions);
        parent.appendChild(fieldSettigs);
    }
}
