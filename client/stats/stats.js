const MyStatsWindow = (props) => {
    return (
        <div>
        <label>Games you own: </label>
        <br></br>
        <ul>
            <li>New: </li>
            <li>Used: </li>
            <li>Digital: </li>
        </ul>
        <br/><label>Platforms you have: </label>
        </div>
    );
};

const GenStatsWindow = (props) => {
    return (
        <div>
        <label>Average number of games users own: </label>
        <br></br>
        <ul>
            <li>New: </li>
            <li>Used: </li>
            <li>Digital: </li>
        </ul>
        <br/><label>Average number of platforms users have: </label>
        </div>
    );
}
            
const createStatsWindow = (csrf) => {
    ReactDOM.render(
        <MyStatsWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const createGenStatsWindow = (csrf) => {
    ReactDOM.render(
        <GenStatsWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const setup = (csrf) => {
    const myStatsButton = document.querySelector("#mystats");
    const genStatsButton = document.querySelector("#genstats");
    
    myStatsButton.addEventListener("click", (e) => {
        e.preventDefault();
        createStatsWindow(csrf);
        return false;
    });
    
    genStatsButton.addEventListener("click", (e) => {
        e.preventDefault();
        createGenStatsWindow(csrf);
        return false;
    });
    
    createStatsWindow(csrf);
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});