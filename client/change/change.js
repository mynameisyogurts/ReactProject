const Change = (props) => {
    return (
        <div>
        <form id="changeForm" 
        name="changeForm"
        action="/change"
        method="POST"
        className="mainForm"
    >
        <label htmlFor="username">Username: </label>
        <input id="user" type="text" name="username" placeholder="Username"/>
        <label htmlFor="pass">Password: </label>
        <input id="pass" type="password" name="pass" placeholder="Password"/>
        <label htmlFor="newpass">New Password: </label>
        <input id="newpass" type="password" name="newpass" placeholder="New password"/>
        <label htmlFor="newpass2">Retype new password: </label>
        <input id="newpass2" type="password" name="newpass2" placeholder="New password"/>
        <input type="hidden" name="_csrf" value={props.csrf}/>
        <input className="formSubmit" type="submit" value="Change"/>
        </form>
        <div>
    );
};
            
const createChangeWindow = (csrf) => {
    ReactDOM.render(
        <Change csrf={csrf} />,
        document.querySelector("#content")
    );
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        createChangeWindow(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});