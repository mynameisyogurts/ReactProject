"use strict";

var MyStatsWindow = function MyStatsWindow(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "label",
            null,
            "Games you own: "
        ),
        React.createElement("br", null),
        React.createElement(
            "ul",
            null,
            React.createElement(
                "li",
                null,
                "New: "
            ),
            React.createElement(
                "li",
                null,
                "Used: "
            ),
            React.createElement(
                "li",
                null,
                "Digital: "
            )
        ),
        React.createElement("br", null),
        React.createElement(
            "label",
            null,
            "Platforms you have: "
        )
    );
};

var GenStatsWindow = function GenStatsWindow(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "label",
            null,
            "Average number of games users own: "
        ),
        React.createElement("br", null),
        React.createElement(
            "ul",
            null,
            React.createElement(
                "li",
                null,
                "New: "
            ),
            React.createElement(
                "li",
                null,
                "Used: "
            ),
            React.createElement(
                "li",
                null,
                "Digital: "
            )
        ),
        React.createElement("br", null),
        React.createElement(
            "label",
            null,
            "Average number of platforms users have: "
        )
    );
};

var createStatsWindow = function createStatsWindow(csrf) {
    ReactDOM.render(React.createElement(MyStatsWindow, { csrf: csrf }), document.querySelector("#content"));
};

var createGenStatsWindow = function createGenStatsWindow(csrf) {
    ReactDOM.render(React.createElement(GenStatsWindow, { csrf: csrf }), document.querySelector("#content"));
};

var setup = function setup(csrf) {
    var myStatsButton = document.querySelector("#mystats");
    var genStatsButton = document.querySelector("#genstats");

    myStatsButton.addEventListener("click", function (e) {
        e.preventDefault();
        createStatsWindow(csrf);
        return false;
    });

    genStatsButton.addEventListener("click", function (e) {
        e.preventDefault();
        createGenStatsWindow(csrf);
        return false;
    });

    createStatsWindow(csrf);
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
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
