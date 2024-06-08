import React, {useState}  from "react";

function Register({ onRouteChange, loadUser }) {
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [username, setUserName] = useState(false);

  function onEmailChange(event) {
    setEmail(event.target.value);
  }

  function onPasswordChange(event) {
    setPassword(event.target.value);
  }

  function onUserNameChange(event) {
    setUserName(event.target.value)
  }

  function onSubmitRegister () {
    
    fetch(`${process.env.SERVER_API_URL}/register`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          email: email,
          password: password,
          username: username,
        }
      )
    })
    .then(response => response.json())
    .then(user => {
      if(user.id) {
        loadUser(user)
        onRouteChange("home")
      }
    })
  }

  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 white fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db white fw6 lh-copy f6" htmlFor="userName">
                Name
              </label>
              <input
                className="pa2 br3 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="userName"
                username="userName"
                id="userName"
                onChange={onUserNameChange}
              />
            </div>
            <div className="mt3">
              <label className="db white fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 br3 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                email="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db white fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 br3 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                password="password"
                id="password"
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 br3 white pv2 input-reset ba b--white bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
              onClick={onSubmitRegister}
            />
          </div>
        </div>
      </main>
    </article>
  );
}

export default Register;
