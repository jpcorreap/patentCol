import React from 'react';
import { Link } from "react-router-dom";

function Paso3() {
    return (<div>
        <h2>Paso 3</h2>
        <br />
        <br />
        <Link to={"/paso2"}>
            <button className="btn btn-primary">Anterior</button>
        </Link>

        <Link to={"/paso4"}>
            <button className="btn btn-primary">Siguiente</button>
        </Link>
    </div>)
}

export default Paso3;