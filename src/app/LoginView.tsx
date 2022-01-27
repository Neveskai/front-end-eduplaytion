import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import { login } from "./core/services/auth.service";
import "./LoginView.scss";

const LoginView: FC = (): JSX.Element => {
  const [formObject, setFormObject] = useState({
    username: "",
    password: "",
  });

  const [userProfile, setUserProfile] = useState({
    firstName: "",
    avatarName: "",
    accountType: "",
    createdAt: "",
    subscriptionPlanId: 0,
    logged: false,
  });

  const [submitBtnClicked, setsubmitBtnClicked] = useState(false);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);

  const handleFormChange = (param: string) => (e: any) => {
    setFormObject({ ...formObject, [param]: e.target.value });
  };

  const navigate = useNavigate();
  console.log("starting request progress");
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (submitBtnClicked) return false;
    setsubmitBtnClicked(true);
    await login({
      email: formObject.username,
      password: formObject.password,
    })
      .then((result) => {
        console.log("result :: ", result);
        // TODO :: define de UserProfile State,
        // setState para ser replicado no Context later to be used in the profile pag
        setUserProfile({
          firstName: result.accountData.firstName,
          accountType: result.accountData.accountType,
          avatarName: result.accountData.avatarName,
          createdAt: result.accountData.createdAt,
          subscriptionPlanId: result.accountData.subscriptionPlanId,
          logged: true,
        });
        navigate("/profile", {
          state: {
            userProfile: {
              firstName: result.accountData.firstName,
              accountType: result.accountData.accountType,
              avatarName: result.accountData.avatarName,
              createdAt: result.accountData.createdAt,
              subscriptionPlanId: result.accountData.subscriptionPlanId,
              logged: true,
            },
          },
        });
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        console.log("finally progress");
        setsubmitBtnClicked(false);
      });
  };

  return (
    <div className="App">
      <div className="App-container">
        <header className="App-header">
          <nav
            style={{
              borderBottom: "solid 1px",
              paddingBottom: "1rem",
            }}
          >
            <Link to="/profile">Profile</Link>
          </nav>
        </header>

        <div className="App-form">
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            <label>
              Username
              <input
                className="form-control mb-2 mt-1"
                name="username"
                type="text"
                value={formObject.username}
                onInput={handleFormChange("username")}
                placeholder="carlos54321@eduplaytion.no"
              />
            </label>

            <label>
              Password
              <input
                className="form-control mb-2 mt-1"
                name="password"
                type="password"
                value={formObject.password}
                onInput={handleFormChange("password")}
                placeholder="123456"
              />
            </label>

            <label>
              <input
                type="submit"
                className="btn-submit"
                disabled={submitBtnClicked}
              />
              {submitBtnClicked && <p>Loading...</p>}
            </label>

            {/* TODO :: Show just when have a value defined */}
            <section className="Profile-Logged">
              <ul>
                {userProfile.logged && (
                  <li>
                    {" "}
                    Hey {userProfile.accountType} {userProfile.firstName},
                    welcome!{" "}
                  </li>
                )}
              </ul>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
