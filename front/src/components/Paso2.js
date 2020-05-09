import React from "react";
import PasoTitle from "./PasoTitle.js";

function Paso2() {
  return (
    <div className="paso">
      <PasoTitle actual={2} nombre="Verificar si es patentable" />

      <br />
      <div className="container">
        <div className="row">
          <div className="col-6 text-left">
            <h3>No se patenta</h3>
            <div className="text-justify">
              <ul>
                <li>Ideas.</li>
                <li>Descubirmientos.</li>
                <li>Teorías científicas.</li>
                <li>Métodos matématicos, terapéuticos o quirúrgicos.</li>
                <li>Métodos financieros o de negocios</li>
                <li>El uso de los productos ya existentes (patentados o no)</li>
                <li>Formas de presentar información</li>
                <li>Los programas de ordenadores o el soporte lógico</li>
                <li>
                  El todo o parte de seres vivos tal como se encuentran en la
                  naturaleza
                </li>
                <li>Los procesos biológicos naturales</li>
                <li>
                  Las obras literarias, artísticas, científicas o cualquier otra
                  protegida por el derecho de autora
                </li>
                <li>
                  Material biológico existente en la naturaleza o aquel que
                  pueda ser aislado
                </li>
                <li>El genoma de cualquier ser vivo natural</li>
                <li>
                  Planes, reglas y métodos para el ejercicio de actividades
                  intelectuales, juegos o actividades económico-comerciales
                </li>
              </ul>
            </div>
          </div>
          <div className="col-6 text-right">
            <h3>Sí se patenta</h3>
            <div className="text-justify">
              <p>
                Se protegen los inventos que consistan en productos,
                procedimientos, métodos de fabricación, máquinas o aparatos que
                se obtengan de ellas. Se puede solicitar para protección como
                patente, por ejemplo, una nueva formulación para un producto
                farmacéutico, una máquina o un procedimiento para la obtención
                de un producto.
              </p>
              <p>
                El invento debe ser un producto o un procedimiento que reúna
                tres condiciones:
              </p>
              <ol>
                <li>
                  Debe ser novedoso, es decir, que no exista a nivel mundial. En
                  esto le ayudamos en el Paso 3.
                </li>
                <li>
                  Debe poseer un nivel inventivo, lo que equivale a decir, que
                  no sea un desarrollo obvio para alguien experto en la materia
                  que trata el invento.
                </li>
                <li>
                  Que lo inventado pueda ser utilizado o fabricado en cualquier
                  industria, es decir, que debe tener una aplicación industrial.
                </li>
              </ol>
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
}

export default Paso2;
