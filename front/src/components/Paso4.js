import React from 'react';
import { Link } from "react-router-dom";

function Paso4() {
    return (<div>
        <h2>Paso 4</h2>
        <br />
        <br />
        <Link to={"/paso3"}>
            <button className="btn btn-primary">Anterior</button>
        </Link>

        <Link to={"/paso5"}>
            <button className="btn btn-primary">Siguiente</button>
        </Link>
    </div>)
}

export default Paso4;