const Notes = (props) => {
    return (
        <div>
        <form id="notesForm"
        name="notesForm"
        action="/notes"
        method="POST"
        className="notesForm">
        <label htmlFor="title">Title: </label>
        <input id="notesTitle" type="text" name="title" placeholder="Title"/>
        <br/><label htmlFor="notes">Notes: </label>
        <input id="notesPad" type="text" name="notes" placeholder="Write your notes here"/>
        <input className="makeNoteSubmit" type="submit" value="Make Note"/>
        </form>
        </div>
    );
};

const createNotesWindow = (csrf) => {
    ReactDOM.render(
        <Notes csrf={csrf} />,
        document.querySelector("#content")
    );
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        createNotesWindow(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});