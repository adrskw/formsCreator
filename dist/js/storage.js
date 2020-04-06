"use strict";
class LocStorage {
    saveDocument(formValues) {
        const documentId = "document-" + Date.now();
        this.addDocumentIdToDocumentsList(documentId);
        localStorage.setItem(documentId, JSON.stringify(formValues));
        return documentId;
    }
    loadDocument(documentId) {
        const document = JSON.parse(localStorage.getItem(documentId));
        return document;
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
