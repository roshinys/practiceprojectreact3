import React, { useState, useReducer, useEffect } from "react";
import Input from "../UI/Input";

const inputReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.value,
      isValid: action.value !== null && action.value > 0,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value !== null && state.value > 0,
    };
  }
  return { value: "", isValid: false };
};

function Waiters(props) {
  const [formValid, setFormValid] = useState(false);
  const [uniqueIdState, dispatchUniqueId] = useReducer(inputReducer, {
    value: "1",
    isValid: true,
  });
  const { isValid: uniqueIdValid } = uniqueIdState;
  const [price, setPrice] = useState("200");
  const [dish, setDish] = useState("Fried Rice");
  const [category, setCategory] = useState("Table1");

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormValid(
        uniqueIdValid && price > 0 && dish.length > 0 && category.length > 0
      );
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [uniqueIdValid, price, dish, category]);

  const uniqueIdChangeHanlder = (e) => {
    dispatchUniqueId({ type: "USER_INPUT", value: e.target.value });
  };

  const uniqueIdValidHanlder = () => {
    dispatchUniqueId({ type: "INPUT_BLUR" });
  };

  const priceChangeHandler = (e) => {
    setPrice(e.target.value);
  };

  const dishChangeHandler = (e) => {
    setDish(e.target.value);
  };

  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (formValid) {
      const neworder = {
        id: uniqueIdState.value,
        price: price,
        dish: dish,
        category: category,
      };
      props.onPlaceOrder(neworder);
    } else {
      alert("not a valid form");
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <Input
        id="id"
        type="number"
        title="Unique Id"
        value={uniqueIdState.value}
        onChange={uniqueIdChangeHanlder}
        onBlur={uniqueIdValidHanlder}
      />
      <Input
        id="price"
        type="number"
        title="Price"
        value={price}
        onChange={priceChangeHandler}
      />
      <Input
        id="dish"
        type="text"
        title="Dish"
        value={dish}
        onChange={dishChangeHandler}
      />
      <div>
        <label htmlFor="table">Category :</label>
        <select
          id="table"
          name="table"
          value={category || ""}
          onChange={categoryChangeHandler}
        >
          <option value="">Select a table</option>
          <option value="Table1">Table1</option>
          <option value="Table2">Table2</option>
          <option value="Table3">Table3</option>
        </select>
      </div>
      <button type="submit">PlaceOrder</button>
    </form>
  );
}

export default Waiters;
