import React from 'react';
import { Link } from "react-router-dom";

function Paso5() {
    return (<div>
        <h2>Paso 5</h2>
        <br />
        <br />
        <Link to={"/paso4"}>
            <button className="btn btn-primary">Anterior</button>
        </Link>

        <Link to={"/paso6"}>
            <button className="btn btn-primary">Siguiente</button>
        </Link>
    </div>)
}

export default Paso5;