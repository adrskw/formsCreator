import { Router } from './router.js';
import { Form } from './form.js';
import { FieldType, InputField, TextAreaField, SelectField, CheckboxField } from './fields.js';
import { DocumentList } from "./documentList.js";
import { FormCreator } from "./formCreator.js";
import { FormList } from './formList.js';
class App {
    constructor() {
        this.docList = new DocumentList();
        this.formList = new FormList();
        this.contentDiv = document.getElementById("content");
        this.initialize();
    }
    initialize() {
        switch (Router.getPath()) {
            case '/new-document.html':
                this.initializeNewDocument();
                break;
            case '/edit-document.html':
                this.initializeEditDocument();
                break;
            case '/document-list.html':
                this.initializeDocumentList();
                break;
            case '/new-form.html':
                this.initializeNewForm();
                break;
        }
    }
    initializeNewDocument() {
        const formId = Router.getParam("id");
        const filledForm = this.formList.getForm(formId);
        console.log(filledForm);
        if (filledForm !== null) {
            const formFields = this.generateFieldsFromSavedFields(filledForm);
            const form = new Form(formFields, formId);
            form.render(this.contentDiv);
        }
        else {
            this.contentDiv.innerHTML = "<p>Given form was not found</p>";
        }
    }
    initializeEditDocument() {
        const documentId = Router.getParam("id");
        const savedDocument = this.docList.getDocument(documentId);
        if (savedDocument !== null) {
            const formFields = this.generateFieldsFromSavedFields(savedDocument);
            const form = new Form(formFields, "", true, documentId);
            form.render(this.contentDiv);
        }
        else {
            this.contentDiv.innerHTML = "<p>Given document was not found</p>";
        }
    }
    initializeDocumentList() {
        this.docList.getDocumentList();
        this.docList.render(this.contentDiv);
    }
    initializeNewForm() {
        const formCreator = new FormCreator();
        formCreator.newForm(this.contentDiv);
    }
    generateFieldsFromSavedFields(savedFields) {
        let fields = [];
        for (const fieldInfo of savedFields) {
            let field;
            switch (fieldInfo.fieldType) {
                case FieldType.TEXT:
                case FieldType.DATE:
                case FieldType.EMAIL:
                    field = new InputField(fieldInfo.name, fieldInfo.label, fieldInfo.fieldType, fieldInfo.value);
                    break;
                case FieldType.TEXTAREA:
                    field = new TextAreaField(fieldInfo.name, fieldInfo.label, fieldInfo.value);
                    break;
                case FieldType.SELECT:
                    field = new SelectField(fieldInfo.name, fieldInfo.label, fieldInfo.options, fieldInfo.value);
                    break;
                case FieldType.CHECKBOX:
                    field = new CheckboxField(fieldInfo.name, fieldInfo.label, fieldInfo.value);
                    break;
            }
            fields.push(field);
        }
        return fields;
    }
}
const app = new App();
