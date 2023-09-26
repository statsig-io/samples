import React, { useState } from "react";
import { LOGIN_TITLE } from "../Constant";
import { isValidInput, PASSWORD, USER_NAME } from "../validation/UIValidation";

/**
 * Form to enter username and password
 * and validation of input fields
 * @param {*} param0
 * @returns
 */
export const Login = ({ setUser }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  /**
   * submitting the credentials
   * @param {*} e
   */
  const handleSubmit = (e) => {
    // prevent default action
    e.preventDefault();
    if (userName && password && !errorMessage) {
      setUser(userName);
    }
  };

  /**
   * To validate the input field, and updating the recent value
   * @param {*} e
   */
  const onChangeInput = (e) => {
    const valid = isValidInput(e.target.id, e.target.value);
    if (e.target.id === USER_NAME) {
      setUserName(e.target.value);
    } else if (e.target.id === PASSWORD) {
      setPassword(e.target.value);
    }

    if (valid.isValid) {
      setErrorMessage(null);
    } else {
      setErrorMessage(valid.errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="Login"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h2 className="h2" style={{ color: "white" }}>
          {LOGIN_TITLE}
        </h2>
        <input
          id={USER_NAME}
          type="text"
          value={userName}
          onChange={onChangeInput}
          className="todo-input"
          placeholder="Enter user name"
        />
        <input
          id={PASSWORD}
          type="password"
          value={password}
          onChange={onChangeInput}
          className="todo-input"
          placeholder="Enter password"
        />
        {errorMessage && (
          <p
            style={{
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
              maxWidth: "300px",
            }}
            className="ErrorMessage"
          >
            {errorMessage}
          </p>
        )}
        <button type="submit" className="todo-btn">
          Login
        </button>
      </div>
    </form>
  );
};
