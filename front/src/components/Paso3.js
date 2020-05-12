import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PasoTitle from "./PasoTitle.js";
//import styled from "styled-components";
//import { useCheckboxState, Checkbox } from "reakit/Checkbox";

// Styling a regular HTML input
/*const StyledInput = styled.input`
  display: block;
  margin: 20px 0px;
  border: 1px solid lightblue;
`;*/

function Paso3() {
  const [patentsView, setPatentsView] = useState([]);

  const [hasError, setErrors] = useState(false);

  /* const tipo = [];
  const inputProps = useInput();
  const checkbox = useCheckboxState({ state: [] });
*/

  // Hace GET de la API
  useEffect(() => {
    async function fetchPatentsView() {
      const res = await fetch(
        'https://www.patentsview.org/api/patents/query?q={"_gte":{"patent_date":"2019-01-04"}}&f=["patent_id","patent_title","patent_firstnamed_assignee_city","inventor_first_name","patent_firstnamed_inventor_country","patent_type","patent_abstract","patent_date"]'
      );
      res
        .json()
        .then((res) => setPatentsView(res.patents))
        .catch((err) => setErrors(err));
    }
    fetchPatentsView();
  }, []);

  /*
  PENDIENTE PARA HACER LOS FILTROS:

  Buscar por fecha mayor a:
  https://www.patentsview.org/api/patents/query?q={"_gte":{"patent_date":"2019-01-04"}}&f=["patent_id","patent_title","patent_kind","patent_abstract","patent_date"]

  Buscar por ÚNICA palabra clave:
  https://www.patentsview.org/api/patents/query?q={"_text_any":{"patent_title":"pillow"}}&f=["patent_id","patent_title","patent_kind","patent_abstract","patent_date"]

  Buscar por palabras clave:
  https://www.patentsview.org/api/patents/query?q={"_and":[{"_text_any":{"patent_title":"pillow"}},{"_text_any":{"patent_title":"inflatable"}}]}&f=["patent_id","patent_title","patent_kind","patent_abstract","patent_date"]

  Buscar por palabras clave y fecha mayor a:
  https://www.patentsview.org/api/patents/query?q={"_and":[{"_gte":{"patent_date":"2019-01-04"}},{"_text_any":{"patent_title":"pillow"}},{"_text_any":{"patent_title":"inflatable"}}]}&f=["patent_id","patent_title","patent_kind","patent_abstract","patent_date"]
  */

  return (
    <div className="paso">
      <PasoTitle actual={3} nombre="Estado de la técnica" />
      <br />
      <br />
      <div className="row text-center">
        <div className="col text-center">
          <button className="btn btn-primary">API PatentsView</button>
        </div>
        <div className="col text-center">
          <Link to={"paso3_scope"}>
            <button className="btn btn-info">PatentScope</button>
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

      <div>
        <div className="row">
          <div className="col-4">
            <img
              id="imagenAHH"
              src="https://www.patentsview.org/web/img/f34f24560eeb9097579c2be6fa29f5a7.logo_2x.png"></img>
          </div>
          <div className="col text-right">
            <img
              src="https://st2.depositphotos.com/4191945/7462/v/950/depositphotos_74627113-stock-illustration-document-funnel-or-filter-logo.jpg"
              width="100px"></img>
          </div>
        </div>
        <div className="container">
          <br />
          <div className="row justify-content-center">
            <div
              class="spinner-border text-info"
              role="status"
              id="spinnerCarga">
              <span class="sr-only">Buscando información...</span>
            </div>
            {patentsView.map((patent) => (
              <div
                className="card border-info mb-3 col-md-12"
                key={patent.patent_id}>
                <div className="card-header">
                  <h4>{patent.patent_title}</h4>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Type:</strong> {patent.patent_type}
                    {" - "}
                    <strong>Date:</strong> {patent.patent_date}
                    {" - "}
                    <strong>Inventor(s):</strong>{" "}
                    {patent.inventors.map((inventor) => {
                      return (
                        inventor.inventor_first_name +
                        " (ID " +
                        inventor.inventor_key_id +
                        ") "
                      );
                    })}
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
