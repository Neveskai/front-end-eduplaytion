import React, { FC } from "react";

function secretInput(
  password: string,
  handleFormChange: Function
): JSX.Element {
  return (
    <input
      name="password"
      type="input"
      value={password}
      placeholder="123456"
      onChange={handleFormChange("password")}
      required
    />
  );
}

export default secretInput;
