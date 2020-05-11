import React, { useState, useEffect } from "react";
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
  const [patentsView, setPatentsView] = useState([]);
  const [patentScope, setPatentScope] = useState([]);
  const [googleUtilityPatents, setGoogleUtilityPatents] = useState([]);
  const [hasError, setErrors] = useState(false);

  /* const tipo = [];
  const inputProps = useInput();
  const checkbox = useCheckboxState({ state: [] });
*/
  // Hace GET de la API
  useEffect(() => {
    async function fetchPatentsView() {
      const type = "";
      const res = await fetch(
        //`https://www.patentsview.org/api/patents/query?q={"patent_type":[${type}]}&f=["patent_number","patent_abstract","patent_title","patent_type","patent_year"]&s=[{"patent_number":"desc"}]`
        `https://www.patentsview.org/api/patents/query?q={"_gte":{"patent_date":"2007-01-04"}}&f=["patent_number","patent_abstract","patent_title","patent_type"]&s=[{"patent_number":"desc"}]`
      );
      res
        .json()
        .then((res) => {
          setPatentsView(res.patents);
        })
        .catch((err) => setErrors(err));
    }
    fetchPatentsView();
  }, []);

  // Hace GET de la base de datos
  useEffect(() => {
    fetch("/getPatentscope")
      .then((res) => res.json())
      .then((patentScope) => {
        if (patentScope) {
          setPatentScope(patentScope);
        }
      });

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
      <h3 className="text-warning">Patentsview:</h3>
      <div>
        <div className="container">
          <div className="row justify-content-center">
            {patentsView.map((patent) => (
              <div
                className="card border-warning mb-3 col-md-12"
                key={patent.patent_number}>
                <div className="card-header">
                  <h4>{patent.patent_title}</h4>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Type:</strong> {patent.patent_type}
                  </p>
                  <p className="card-text text-justify">
                    {patent.patent_abstract}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br />
      <h3 className="text-success">Patentscope:</h3>
      <div>
        <div className="container">
          <div className="row justify-content-center">
            {patentScope.map((patent) => (
              <div
                className="card border-success mb-3 col-md-12"
                key={patent._id}>
                <div className="card-header">
                  <h4>{patent.title}</h4>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Date:</strong> {patent.date}.{" "}
                    <strong>Reference:</strong>{" "}
                    <a
                      href={patent.link}
                      target="_blank"
                      rel="noopener noreferrer">
                      Patentscope
                    </a>
                  </p>
                  <p className="card-text text-justify">{patent.description}</p>
                  <p>{patent.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <h3 className="text-info">Google Utility Patents:</h3>
      <div>
        <div className="container">
          <div className="row justify-content-center">
            {googleUtilityPatents.map((patent) => (
              <div className="card border-info mb-3 col-md-12" key={patent._id}>
                <div className="card-header">
                  <h4>{patent.title}</h4>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Date:</strong> {patent.date}
                  </p>
                  <p className="card-text text-justify">{patent.abstract}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
