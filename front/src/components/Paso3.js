import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import PatentsView from "./patents/PatentsView.js";
import PatentScope from "./patents/PatentScope.js";
import PasoTitle from "./PasoTitle.js";
//import styled from "styled-components";
//import { useCheckboxState, Checkbox } from "reakit/Checkbox";

// Styling a regular HTML input
/*const StyledInput = styled.input`
  display: block;
  margin: 20px 0px;
  border: 1px solid lightblue;
`;
// Creating a custom hook
function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  function onChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange,
  };
}*/

function Paso3() {
  const [googleUtilityPatents, setGoogleUtilityPatents] = useState([]);
  const [hasError, setErrors] = useState(false);

  /* const tipo = [];
  const inputProps = useInput();
  const checkbox = useCheckboxState({ state: [] });
*/

  // Hace GET de la base de datos
  useEffect(() => {
    fetch("/getGoogleUtilityPatents")
      .then((res) => res.json())
      .then((googleUtilityPatents) => {
        if (googleUtilityPatents) {
          setGoogleUtilityPatents(googleUtilityPatents);
        }
      });
  }, []);
  //console.log(tipo);
  return (
    <div className="paso">
      <PasoTitle actual={3} nombre="Estado de la técnica" />
      <br />
      <br />
      <div className="row text-center">
        <div className="col text-center">
          <Link to={"paso3/patensview"}>
            <button className="btn btn-primary">PatentScope</button>
          </Link>
        </div>
        <div className="col text-center">
          <Link to={"paso3/patentscope"}>
            <button className="btn btn-info">PatentsView</button>
          </Link>
        </div>
        <div className="col text-center">
          <button className="btn btn-info">Google Utility Patents</button>
        </div>
        <div className="col text-center">
          <button className="btn btn-info">Google Issued Patents</button>
        </div>
        <div className="col text-center">
          <button className="btn btn-info">NASA Patents</button>
        </div>
      </div>
      <br />

      <PatentsView />
      <Switch>
        <Route exact path="./patentsview"></Route>
        <Route exact path="./patentscope">
          <PatentScope />
        </Route>
        <Route exact path="./googleutility">
          <h3 className="text-info">Google Utility Patents:</h3>
          <div>
            <div className="container">
              <div className="row justify-content-center">
                {googleUtilityPatents.map((patent) => (
                  <div
                    className="card border-info mb-3 col-md-12"
                    key={patent._id}>
                    <div className="card-header">
                      <h4>{patent.title}</h4>
                    </div>
                    <div className="card-body">
                      <p>
                        <strong>Date:</strong> {patent.date}
                      </p>
                      <p className="card-text text-justify">
                        {patent.abstract}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Route>
      </Switch>

      <br />
    </div>
  );
}

/*
<div>
        <StyledInput {...inputProps} placeholder="Type in here" />
        <span>Value: {inputProps.value} </span>
      </div>
      <div>
        <div>Choices: {checkbox.state.join(",")}</div>
        <label>
          <Checkbox {...checkbox} value="apple" />
          Apple
        </label>
        <label>
          <Checkbox {...checkbox} value="orange" />
          Orange
        </label>
        <label>
          <Checkbox {...checkbox} value="watermelon" />
          Watermelon
        </label>
      </div>
*/

export default Paso3;
