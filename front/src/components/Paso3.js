import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Paso3() {

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
    

    return (
    <div>
        <h2>Paso 3. Consultar estado de la técnica.</h2>
        <br />
        <p>Acá se pondrá lo de la API de la Comisión Europea de Patentes.</p>
        <br />
        <Link to={"/paso2"}>
            <button className="btn btn-primary">Anterior</button>
        </Link>

        <Link to={"/paso4"}>
            <button className="btn btn-primary">Siguiente</button>
        </Link>
        <div >
        {JSON.stringify(patents)}
        </div>
        <div >
        {JSON.stringify(hasError)}
        </div>
    </div>
    
    )
}

export default Paso3;