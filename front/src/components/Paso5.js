import React from 'react';
import { Link } from "react-router-dom";

function Paso5() {
    return (<div>
        <h2>Paso 5. Presenta tu idea</h2>
        <br />
        <p>Para enviar el formulario a la Superintendencia de Industria y Comercio de Colombia, puedes hacerlo de manera virtual por <a href="https://sipi.sic.gov.co/sipi/Extra/Default.aspx">Sistema de Propiedad Industrial (SIPI)</a></p>
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