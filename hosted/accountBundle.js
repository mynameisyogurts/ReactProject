"use strict";

var accountWindow = function accountWindow(props) {
    return React.createElement(
        "form",
        { "class": "setup" },
        React.createElement(
            "label",
            { "for": "theme" },
            "Theme: "
        ),
        React.createElement(
            "input",
            { type: "radio", name: "light", value: "light", checked: true },
            "Light"
        ),
        React.createElement(
            "input",
            { type: "radio", name: "dark", value: "dark" },
            "Dark"
        ),
        React.createElement("hr", null),
        React.createElement(
            "a",
            { href: "/change", "class": "formSubmit" },
            "Change Password"
        )
    );
};

var createAccountWindow = function createAccountWindow(csrf) {
    ReactDOM.render(React.createElement("accountWindow", { csrf: csrf }), document.querySelector("#content"));
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        createAccountWindow(result.csrfToken);
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
