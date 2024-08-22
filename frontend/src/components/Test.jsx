import React from "react";
import ProvideData from "./ProvideData";

const Test = () => {
  const { user, token, isLoggedIn, setIsLoggedIn, isLoading, error } =
    ProvideData();

  return (
    <div>
      {isLoading && <p>Loading user data...</p>}
      {error && <p>Error: {error.message}</p>}
      {isLoggedIn && user && (
        <>
          <h1>Welcome, {user.name}!</h1>
          <h1>Your email: {user.email}</h1>
          <h1>Your token: {token}</h1>
        </>
      )}
      {!isLoggedIn && <p>Please log in to access this page.</p>}
    </div>
  );
};

export default Test;
