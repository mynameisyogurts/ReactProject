"use strict";

var Notes = function Notes(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "form",
            { id: "notesForm",
                name: "notesForm",
                action: "/notes",
                method: "POST",
                className: "notesForm" },
            React.createElement(
                "label",
                { htmlFor: "title" },
                "Title: "
            ),
            React.createElement("input", { id: "notesTitle", type: "text", name: "title", placeholder: "Title" }),
            React.createElement("br", null),
            React.createElement(
                "label",
                { htmlFor: "notes" },
                "Notes: "
            ),
            React.createElement("input", { id: "notesPad", type: "text", name: "notes", placeholder: "Write your notes here" }),
            React.createElement("input", { className: "makeNoteSubmit", type: "submit", value: "Make Note" })
        )
    );
};

var createNotesWindow = function createNotesWindow(csrf) {
    ReactDOM.render(React.createElement(Notes, { csrf: csrf }), document.querySelector("#content"));
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        createNotesWindow(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});
"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#domoMessage").animate({ width: 'toggle' }, 500);
};

var redirect = function redirect(response) {
    $("#domoMessage").animate({ width: 'hide' }, 500);
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
