import React, { useState, useEffect } from 'react';
import PasoTitle from "./PasoTitle.js";


    
function Paso3() {

    
    const [patents, setPatents]= useState({});
    const [hasError, setErrors] = useState(false);

    const display = ["patent_number","patent_date"];
    console.log(display);


    useEffect(() =>{
        async function fetchData(){
        const res = await fetch(`https://www.patentsview.org/api/patents/query?q={"_gte":{"patent_date":"2007-01-04"}}&f=["patent_number","patent_abstract","patent_title","patent_type","patent_year"]`);
        res.json()
        .then(res => setPatents(res))
        .catch(err => setErrors(err));
        }
        fetchData();
    });

  return (
    <div className="paso">
      <PasoTitle actual={3} nombre="Estado de la técnica" />
      <br />
      <p>Acá se pondrá lo de la API de la Comisión Europea de Patentes.</p>
      <br />
      <div>{JSON.stringify(patents)}</div>
      <div>Has error: {JSON.stringify(hasError)}</div>
    
    </div>
  );
}

export default Paso3;
