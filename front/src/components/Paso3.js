import React, { useState, useEffect } from "react";
import PasoTitle from "./PasoTitle.js";
import styled from 'styled-components';
import { useCheckboxState, Checkbox } from "reakit/Checkbox";


// Styling a regular HTML input
const StyledInput = styled.input`
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
}


function Paso3() {

    
    const [patents, setPatents]= useState({});
    const [hasError, setErrors] = useState(false);
   


    const tipo = [];
    const inputProps = useInput();
    const checkbox = useCheckboxState({ state: [] });

    useEffect(() =>{
        async function fetchData(){
        const res = await fetch(`https://www.patentsview.org/api/patents/query?q={"patent_type":[${tipo}]}&f=["patent_number","patent_abstract","patent_title","patent_type","patent_year"]&s=[{"patent_number":"desc"}]`);
        res.json()
        .then(res => setPatents(res))
        .catch(err => setErrors(err));
        }
        fetchData();
    });
    console.log(tipo);
  return (
    <div className="paso">
      <PasoTitle actual={3} nombre="Estado de la técnica" />
      <br />
      <p>Se trajo todas las patentes de </p>
      <br />
      <div>
      <StyledInput
        {...inputProps}
        placeholder="Type in here"
      />
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
    
      <div>{JSON.stringify(patents)}</div>
      <div>Has error: {JSON.stringify(hasError)}</div>

    </div>
  );
}

export default Paso3;
