"use strict";

var handleGame = function handleGame(e) {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 360);

    if ($("#gameTitle").val() == '' || $("#gamePlatform").val() == '') {
        handleError("Dude! Title and Platform are required");
        return false;
    }

    sendAjax('POST', $("#gameForm").attr("action"), $("#gameForm").serialize, function () {
        loadGamesFromServer();
    });

    return false;
};

var GameForm = function GameForm(props) {
    return React.createElement(
        "form",
        { id: "gameForm",
            onsubmit: handleGame,
            name: "gameForm",
            action: "/maker",
            method: "POST",
            className: "gameForm"
        },
        React.createElement(
            "label",
            { htmlFor: "title" },
            "Title: "
        ),
        React.createElement("input", { id: "gameTitle", type: "text", name: "title", placeholder: "Game Title" }),
        React.createElement("br", null),
        React.createElement(
            "label",
            { htmlFor: "platform" },
            "Age: "
        ),
        React.createElement("input", { id: "gamePlatform", type: "text", name: "platform", placeholder: "Platform" }),
        React.createElement("br", null),
        React.createElement(
            "label",
            { htmlFor: "status" },
            "Status: "
        ),
        React.createElement("input", { id: "gameStatus", type: "text", name: "status", placeholder: "New, used, digital, etc." }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeGameSubmit", type: "submit", value: "Make Game" })
    );
};

var GameList = function GameList(props) {
    if (props.games.length === 0) {
        return React.createElement(
            "div",
            { className: "gameList" },
            React.createElement(
                "h3",
                { className: "emptyGames" },
                " No games yet"
            )
        );
    }

    var gameNodes = props.games.map(function (gamers) {
        return React.createElement(
            "div",
            { key: games._id, className: "game" },
            React.createElement("img", { src: "/assets/img/control.png", alt: "controller", className: "gameControl" }),
            React.createElement(
                "strong",
                null,
                "Title: "
            ),
            gamers.title,
            React.createElement("hr", null),
            React.createElement(
                "strong",
                null,
                "Platform: "
            ),
            gamesrs.platform,
            React.createElement("br", null),
            React.createElement(
                "strong",
                null,
                "Status: "
            ),
            gamers.status
        );
    });

    return React.createElement(
        "div",
        { className: "gameList" },
        gameNodes
    );
};

var loadGamesFromServer = function loadGamesFromServer() {
    sendAjax('GET', '/getGames', null, function (data) {
        ReactDOM.render(React.createElement(GameList, { games: data.games }), document.querySelector("#games"));
    });
};

var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(GameForm, { csrf: csrf }), document.querySelector("#makeGame"));

    ReactDOM.render(React.createElement(GameList, { games: [] }), document.querySelector("#games"));

    loadGamesFromServer();
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
