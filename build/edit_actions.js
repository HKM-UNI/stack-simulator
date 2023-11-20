import { getSourceCode, setSourceCode } from "./editor.js";
import { makeObjectCode } from "./assembler.js";
const SRC_OUTPUT_NAME = "code.asm";
const OBJ_OUTPUT_NAME = "bincode.txt";
const srcFileSelector = (document.getElementById("srcfile-selector"));
const btnUploadSrc = (document.getElementById("btn-upload-src"));
const btnDownloadSrc = (document.getElementById("btn-download-src"));
const btnDownloadObj = (document.getElementById("btn-download-obj"));
function download(filename, text) {
    let element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
function downloadSourceCode() {
    download(SRC_OUTPUT_NAME, getSourceCode());
}
function downloadObjCode() {
    try {
        download(OBJ_OUTPUT_NAME, makeObjectCode().join("\n"));
    }
    catch (e) {
        alert(e.message);
    }
}
function readTextFile(file) {
    // Check if the file is an image.
    if (file.type && !file.type.startsWith("text/")) {
        alert(`The file "${file.name}" is not a text file.`);
        return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
        if (event.target) {
            let fileContent = event.target.result;
            setSourceCode(fileContent);
        }
    });
    reader.readAsText(file);
}
function loadSourceCode(event) {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
        readTextFile(fileList[0]);
    }
}
btnDownloadSrc.addEventListener("click", downloadSourceCode);
btnDownloadObj.addEventListener("click", downloadObjCode);
srcFileSelector.addEventListener("change", loadSourceCode);
btnUploadSrc.addEventListener("click", () => srcFileSelector.click());
