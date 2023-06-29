import React from "react";

function Input(props) {
  return (
    <div>
      <label htmlFor={props.id}>{props.title}:</label>
      <input
        type={props.type}
        id={props.id}
        name={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
}

export default Input;
