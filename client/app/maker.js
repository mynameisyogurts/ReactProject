const handleGame = (e) => {
    e.preventDefault();
    
    $("#domoMessage").animate({width:'hide'},360);
    
    if($("#gameTitle").val() == '' || $("#gamePlatform").val() == '') {
        handleError("Dude! Title and Platform are required");
        return false;
    }
    
    sendAjax('POST', $("#gameForm").attr("action"), $("#gameForm").serialize, function () {
        loadGamesFromServer();
    });
    
    return false;
};

const GameForm = (props) => {
    return (
    <form id="gameForm"
        onsubmit={handleGame}
        name="gameForm"
        action="/maker"
        method="POST"
        className="gameForm"
    >
        <label htmlFor="title">Title: </label>
        <input id="gameTitle" type="text" name="title" placeholder="Game Title"/>
        <br/><label htmlFor="platform">Age: </label>
        <input id="gamePlatform" type="text" name="platform" placeholder="Platform"/>
        <br/><label htmlFor="status">Status: </label>
        <input id="gameStatus" type="text" name="status" placeholder="New, used, digital, etc."/>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="makeGameSubmit" type="submit" value="Make Game" />
    </form>
    );
};

const GameList = function(props) {
    if(props.games.length === 0) {
        return (
            <div className="gameList">
                <h3 className="emptyGames"> No games yet</h3>
            </div>
        );
    }
    
    const gameNodes = props.games.map(function(gamers) {
        return (
            <div key={games._id} className="game">
                <img src="/assets/img/control.png" alt="controller" className="gameControl" />
                <strong>Title: </strong>{gamers.title}
                <hr/>
                <strong>Platform: </strong>{gamers.platform}
                <br/><strong>Status: </strong>{gamers.status}
            </div>
        );
    });
    
    return (
        <div className="gameList">
            {gameNodes}
        </div>
    );
};

const loadGamesFromServer = () => {
    sendAjax('GET', '/getGames', null, (data) => {
        ReactDOM.render(
            <GameList games={data.games} />,
            document.querySelector("#games")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <GameForm csrf={csrf} />,
        document.querySelector("#makeGame")
    );
    
    ReactDOM.render(
        <GameList games={[]} />,
        document.querySelector("#games")
    );
    
    loadGamesFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});