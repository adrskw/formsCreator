import { Router } from './router.js';
import { Form } from './form.js';
import { FieldType, InputField, TextAreaField, SelectField, CheckboxField } from './fields.js';
import { DocumentList } from "./documentList.js";

class App {
    constructor() {
        this.initialize();
    }

    initialize() : void {
        switch (Router.getPath()) {
            case '/new-document.html':
                this.initializeNewDocument();
                break

            case '/edit-document.html':
                this.initializeDocumentList();
                break;
        
            case '/document-list.html':
                this.initializeDocumentList();
                break;
        }
    }

    private initializeNewDocument() {
        const form = new Form([
            new InputField("name", "Imię", FieldType.TEXT),
            new InputField("surname", "Nazwisko", FieldType.TEXT),
            new InputField("email", "E-mail", FieldType.EMAIL),
            new SelectField("major", "Wybrany kierunek studiów", ["Informatyka i Ekonometria", "Finanse i Rachunkowość", "Zarządzanie"]),
            new CheckboxField("isElearningPrefered", "Czy preferujesz e-learning?"),
            new TextAreaField("comments", "Uwagi")
        ]);
        
        form.render(document.getElementById("content")!);
    }

    private initializeDocumentList() {
        const docList = new DocumentList();
        docList.getDocumentList();
        docList.render(document.getElementById("content")!);
    }
}

const app = new App();