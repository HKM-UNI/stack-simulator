import "ace";
var editor = ace.edit("editor");
editor.setTheme("ace/theme/crimson_editor");
editor.session.setMode("ace/mode/assembly_x86");
editor.setFontSize("24px");
var marker;
var markerLine = 0;
function getSourceCode() {
    return editor.getValue();
}
function setSourceCode(code) {
    editor.setValue(code);
}
function toggleReadonly() {
    editor.setReadOnly(!editor.getReadOnly());
}
function resetMarker() {
    if (marker && marker.id > 0) {
        editor.session.removeMarker(marker.id);
        marker.id = 0;
        markerLine = 0;
    }
}
function highlightNextLine() {
    if (marker) {
        editor.session.removeMarker(marker.id);
    }
    marker = editor.session.highlightLines(markerLine, // from
    markerLine, // to
    "bg-info position-absolute z-3", false);
    markerLine += 1;
}
export { getSourceCode, setSourceCode, toggleReadonly, highlightNextLine, resetMarker, };
