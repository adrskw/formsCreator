import { Router } from './router.js';
import { Form } from './form.js';
import { FieldType, InputField, TextAreaField, SelectField, CheckboxField, IField, ISavedField } from './fields.js';
import { DocumentList } from "./documentList.js";
import { FormCreator } from "./formCreator.js";
import { FormList } from './formList.js';

class App {
    private docList = new DocumentList();
    private formList = new FormList();
    private contentDiv = document.getElementById("content")!;

    constructor() {
        this.initialize();
    }

    initialize() : void {
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
            
            case '/form-list.html':
                this.initializeFormList();
                break;
            
            case '/new-form.html':
                this.initializeNewForm();
                break;
        }
    }

    private initializeNewDocument() {
        const formId = Router.getParam("id")!;
        
        const filledForm: ISavedField[] = this.formList.getForm(formId);

        if (filledForm !== null) {
            const formFields: IField[] = this.generateFieldsFromSavedFields(filledForm);

            const form = new Form(formFields, formId);
        
            form.render(this.contentDiv);
        }
        else {
            window.location.href = "/form-list.html";
        }
    }

    private initializeEditDocument() {
        const documentId = Router.getParam("id")!;

        const savedDocument: ISavedField[] = this.docList.getDocument(documentId);

        if (savedDocument !== null) {
            const formFields: IField[] = this.generateFieldsFromSavedFields(savedDocument);
            const form = new Form(formFields, "", true, documentId);
            form.render(this.contentDiv);
        }
        else {
            this.contentDiv.innerHTML = "<p>Given document was not found</p>";
        }
    }

    private initializeDocumentList() {
        this.docList.getDocumentList();
        this.docList.render(this.contentDiv);
    }

    private initializeFormList() {
        this.formList.getFormList();
        this.formList.render(this.contentDiv);
    }

    private initializeNewForm() {
        const formCreator = new FormCreator();
        formCreator.newForm(this.contentDiv);
    }

    private generateFieldsFromSavedFields(savedFields: ISavedField[]): IField[] {
        let fields: IField[] = [];

        for (const fieldInfo of savedFields) {
            let field: IField;

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