const accountWindow = (props) => {
    return (
        <form class="setup">
        <label for="theme">Theme: </label>
        <input type="radio" name="light" value="light" checked>Light</input>
        <input type="radio" name="dark" value="dark">Dark</input>
        <hr/>
        <a href="/change" class="formSubmit">Change Password</a>
        </form>
    );
};
            
const createAccountWindow = (csrf) => {
    ReactDOM.render(
        <accountWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        createAccountWindow(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});