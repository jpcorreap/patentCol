import React from 'react';
import { Link } from "react-router-dom";

function Paso2() {
    return (<div>
        <h2>Paso 2</h2>
        <br />
        <br />
        <Link to={"/paso1"}>
            <button className="btn btn-primary">Anterior</button>
        </Link>

        <Link to={"/paso3"}>
            <button className="btn btn-primary">Siguiente</button>
        </Link>
    </div>)
}

export default Paso2;