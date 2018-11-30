class SignUp extends React.Component {
    render() {
        return (
            <section id="signup">
    <form id="signupForm" name="signupForm" action="/signup" method="POST" class="mainForm">
      <label for="username">Username: </label>
      <br><input id="user" type="text" name="username" placeholder="Username"/>
      <br><label for="pass">Password: </label>
      <br><input id="pass" type="password" name="pass" placeholder="Password"/>
      <br><label for="pass2">Password: </label>
      <br><input id="pass2" type="password" name="pass2" placeholder="Retype password"/>
        <input type="hidden" name="_csrf" value={{csrfToken}} />
      <input class="formSubmit" type="submit" value="Sign Up" />
    </form>
  </section>
  <div id="domoMessage"><img id="speech" src="/assets/img/speech.png" alt="speech box"/>
    <h3><span id="errorMessage"></span></h3><img id="domo" src="assets/img/domo.png" alt="domo"/>
  </div>
        );
    }
}

const init = () => {
    ReactDOM.render(
        <SignUp />,
        document.getElementById('app')
    );
};

window.onload = init;