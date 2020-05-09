import React from "react";
import PasoTitle from "./PasoTitle.js";
import imagen from "../brainstorming-concept.jpg";

function Paso1() {
  return (
    <div className="paso">
      <PasoTitle actual={1} nombre="Elegir tipo de patente" />
      <br />
      <div className="row text-justify">
        <p>
          El primer paso para solicitar una patente es identificar cuál es el
          tipo más adecuado que se necesita. Muchos colombianos desconocen que
          existen estos dos tipos diferentes entre sí. De conocerse esta
          diferencia, se podrían realizar más patentes con mayor facilidad. Lea
          con atención y elija una opción:
        </p>
      </div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-6 text-center">
            <h3>Patente de modelo de utilidad</h3>
            <br />
            <div className="text-justify">
              <p>
                Los <strong>modelos de utilidad</strong> se consideran
                particularmente adaptados para las <strong>PyMEs</strong> que
                efectúan mejoras menores en productos existentes o adaptan
                dichos productos. Los modelos de utilidad se utilizan
                principalmente para las <strong>innovaciones mecánicas</strong>.
              </p>
              <br />
              <div className="row">
                <div className="col">
                  <div className="row img-container text-center">
                    <img src={imagen} alt=" " width="100%" />
                  </div>
                </div>
                <div className="col-7">
                  <p>
                    El modelo de utilidad sólo contempla la protección de
                    <strong> invenciones de producto</strong>, mientras que con
                    la patente de invención se protegen invenciones de producto
                    y de procedimiento. La invención protegida en el modelo de
                    utilidad debe <strong>ser nueva</strong> y{" "}
                    <strong>tener aplicación industrial</strong>. El período de
                    protección del modelo de utilidad es de{" "}
                    <strong>10 años</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 text-center">
            <h3>Patente de invención</h3>
            <br />
            <div className="text-justify">
              <p>
                Esta patente es un privilegio que le otorga el Estado al
                inventor como{" "}
                <strong>reconocimiento de la inversión y esfuerzos </strong>
                realizados por éste para lograr una solución técnica que le
                <strong>aporte beneficios a la humanidad</strong>. Dicho
                privilegio consiste en el derecho a explotar exclusivamente el
                invento por un tiempo determinado{" "}
                <strong>no superior a 20 años</strong>. La explotación puede
                consistir en comercializar exclusiva y directamente el producto
                patentado, o por intermedio de terceros otorgando licencias, o
                transfiriendo los derechos obtenidos mediante su venta para que
                un tercero explote la invención. En conclusión, el{" "}
                <strong>beneficio es económico</strong> para el inventor o
                titular de la patente
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paso1;
