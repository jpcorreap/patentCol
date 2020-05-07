import React from 'react';
import { Link } from "react-router-dom";

function Paso1() {
    return (<div className="paso">
        <h2>Paso 1. Tipo de patente</h2>
        <br />
        <p>El primer paso para solicitar una patente, es identificar cuál es el tipo de patente que mejor se adapta a su situación.</p>
        <p>Muchos colombianos desconocen que existen dos tipos que son diferentes entre sí:</p>

        <div className="container">
            <div className="row">
                <div className="col-6 text-left">
                    <h3>Patente de modelo de utilidad</h3>
                    <div className="text-justify">
                        <p>
                            Los modelos de utilidad se consideran particularmente adaptados para las <strong>PyMEs</strong> que efectúan mejoras menores en productos existentes o adapten dichos productos. Los modelos de utilidad se utilizan principalmente para las innovaciones mecánicas.
                        El modelo de utilidad sólo contempla la protección de invenciones de producto; en cambio en la patente de invención se protegen invenciones de producto y, también, de procedimiento. La invención protegida en el modelo de utilidad debe ser nueva y tener aplicación industrial. El período de protección del modelo de utilidad es de 10 años.
                    </p>
                    </div>
                </div>
                <div className="col-6 text-right">
                    <h3>Patente de invención</h3>
                    <div className="text-justify">
                        <p>
                            Esta patente es un privilegio que le otorga el Estado al inventor como reconocimiento de la inversión y esfuerzos realizados por éste para lograr una solución técnica que le aporte beneficios a la humanidad. Dicho privilegio consiste en el derecho a explotar exclusivamente el invento por un tiempo determinado no superior a 20 años. La explotación puede consistir en comercializar exclusiva y directamente el producto patentado, o por intermedio de terceros otorgando licencias, o transfiriendo los derechos obtenidos mediante su venta para que un tercero explote la invención. En conclusión, el beneficio es económico para el inventor o titular de la patente
                    </p>
                    </div>
                </div>
            </div>
        </div>

        <Link to={"/paso2"}>
            <button className="btn btn-primary">Siguiente</button>
        </Link>
    </div>)
}

export default Paso1;