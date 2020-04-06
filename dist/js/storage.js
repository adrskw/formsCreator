"use strict";
class LocStorage {
    saveDocument(formValues) {
        const documentId = "document-" + Date.now();
        this.addDocumentIdToDocumentsList(documentId);
        localStorage.setItem(documentId, JSON.stringify(formValues));
        return documentId;
    }
    loadDocument(documentId) {
        const doc = JSON.parse(localStorage.getItem(documentId));
        return doc;
    }
    getDocuments() {
        const documentsListJson = localStorage.getItem("documentsList");
        let documentsList = [];
        if (documentsListJson !== null) {
            documentsList = JSON.parse(documentsListJson);
        }
        return documentsList;
    }
    addDocumentIdToDocumentsList(documentId) {
        const documentsList = localStorage.getItem("documentsList");
        let documents = [];
        if (documentsList !== null) {
            documents = JSON.parse(documentsList);
        }
        documents.push(documentId);
        localStorage.setItem("documentsList", JSON.stringify(documents));
    }
}
class DocumentList {
    constructor() {
        this.list = [];
        this.locStorage = new LocStorage();
    }
    getDocumentList() {
        this.list = this.locStorage.getDocuments();
    }
    render(parent) {
        const table = document.createElement("table");
        const tableHeader = table.createTHead();
        tableHeader.insertRow().insertCell().innerText = "Documents:";
        const tableBody = table.createTBody();
        for (const documentId in this.list) {
            tableBody.insertRow().insertCell().innerText = documentId;
        }
    }
}
