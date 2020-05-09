import React, { useState, useEffect } from 'react';
import PasoTitle from "./PasoTitle.js";


    const [hasError, setErrors] = useState(false);
    const [patents, setPatents]= useState({});


    
    useEffect(() =>{
        async function fetchData(){
        const res = await fetch("https://www.patentsview.org/api/patents/query?q={"_gte":{"patent_date":"2007-01-04"}}&f=["patent_number","patent_date"]");
        res.json()
        .then(res => setPatents(res))
        .catch(err => setErrors(err));
        }
        fetchData();
    });
    

function Paso3() {
  return (
    <div className="paso">
      <PasoTitle actual={3} nombre="Estado de la técnica" />
      <br />
      <p>Acá se pondrá lo de la API de la Comisión Europea de Patentes.</p>
      <br />
    </div>
  );
}

export default Paso3;
