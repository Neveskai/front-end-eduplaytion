import React, { FC, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./ProfileView.scss";

const ProfileView: FC = (): JSX.Element => {
  const location = useLocation();

  // UserProfile model ::
  // firstName
  // avartaName
  // accountType
  // createdAt
  // subscriptionPlanId

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log("location::", location);
  }, [location]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Profile</h1>
        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}
        >
          <Link to="/login">Login</Link>
        </nav>
      </header>
      <main>
        Dinamic Way
        {location.state != null && (
          <ul>
            {Object.entries(location.state.userProfile).map((info, i) => {
              return (
                <li key={"data" + i}>
                  {info[0]}: {info[1]}
                </li>
              );
            })}
          </ul>
        )}
        Static Way
        {location.state != null && (
          <ul>
            <li> First name: {location.state.userProfile.firstName} </li>
            <li> Avatar name: {location.state.userProfile.avatarName} </li>
            <li> Account Type: {location.state.userProfile.accountType} </li>
            <li> Created At: {location.state.userProfile.createdAt} </li>
            <li>
              {" "}
              Subscription Plan Id:{" "}
              {location.state.userProfile.subscriptionPlanId}{" "}
            </li>
          </ul>
        )}
      </main>
    </div>
  );
};

export default ProfileView;
