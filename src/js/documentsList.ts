import { DocumentList } from "./storage.js";

let docList = new DocumentList();
docList.getDocumentList();
docList.render(document.getElementById("content")!);