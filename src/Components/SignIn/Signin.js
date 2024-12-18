import React, { useState } from "react";

function Signin({ onRouteChange, loadUser }) {
  const [signInEmail, setSignInEmail] = useState(false);
  const [signInPassword, setSignInPassword] = useState(false);

  function onEmailChange(event) {
    setSignInEmail(event.target.value);
  }

  function onPasswordChange(event) {
    setSignInPassword(event.target.value);
  }

  function onSubmitSignIn() {
    fetch("https://face-recognition-api-yt0g.onrender.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          loadUser(data);
          onRouteChange("home");
        }
      });
  }

  return (
    <article className="br3 ba-ns dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5-ns center">
      <main className="pa4 w-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0 white center">Sign In</legend>
              <div className="mt3">
                <label
                  className="db fw6 lh-copy white f6"
                  htmlFor="email-address"
                >
                  Email
                </label>
                <input
                  className="pa2 br3 input-reset ba bg-transparent hover-bg-black hover-white"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy white f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 br3 input-reset ba bg-transparent hover-bg-black hover-white"
                  type="password"
                  name="password"
                  id="password"
                  onChange={onPasswordChange}
                />
              </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 br3 pv2 input-reset ba b--white bg-transparent white grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick={onSubmitSignIn}
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange("register")}
              href="#0"
              className="f6 link dim white db pointer"
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
}

export default Signin;
