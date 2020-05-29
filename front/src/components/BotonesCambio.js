import React from "react";

function BotonesCambio(props) {
  let sinResaltar = { fontSize: "1em", color: "white" };
  let resaltado = { fontSize: "1.2em", color: "blue" };

  let hayPatentscope = () => {
    if (props.cualesSeMuestran.includes("PatentsView")) {
      return (
        <label class="btn btn-secondary active">
          <input
            type="radio"
            name="options"
            id="option1"
            autocomplete="off"
            onClick={() => props.setActual("PatentsView")}
          />{" "}
          PatentsView
        </label>
      );
    }
  };

  let hayGoogleUPatents = () => {
    if (props.cualesSeMuestran.includes("GoogleUPatents")) {
      return (
        <label class="btn btn-secondary">
          <input
            type="radio"
            name="options"
            id="option3"
            autocomplete="off"
            onClick={() => props.setActual("GoogleUPatents")}
          />{" "}
          Google Utility Patents
        </label>
      );
    }
  };

  let hayGoogleIPatents = () => {
    if (props.cualesSeMuestran.includes("GoogleIPatents")) {
      return (
        <label class="btn btn-secondary">
          <input
            type="radio"
            name="options"
            id="option2"
            autocomplete="off"
            onClick={() => props.setActual("GoogleIPatents")}
          />{" "}
          Google Issued Patents
        </label>
      );
    }
  };

  let hayPatentScope = () => {
    if (props.cualesSeMuestran.includes("PatentScope")) {
      return (
        <label class="btn btn-secondary">
          <input
            type="radio"
            name="options"
            id="option2"
            autocomplete="off"
            onClick={() => props.setActual("PatentScope")}
          />{" "}
          PatentScope
        </label>
      );
    }
  };

  let hayNASA = () => {
    if (props.cualesSeMuestran.includes("NASA")) {
      return (
        <label class="btn btn-secondary">
          <input
            type="radio"
            name="options"
            id="option3"
            autocomplete="off"
            onClick={() => props.setActual("NasaPatents")}
            checked={props.actual === "NasaPatents"}
            disabled={props.actual === "NasaPatents"}
          />{" "}
          NasaPatents
        </label>
      );
    }
  };

  return (
    <div className="col text-center">
      <div class="btn-group btn-group-toggle text-center" data-toggle="buttons">
        {hayPatentscope()}
        {hayGoogleUPatents()}
        {hayGoogleIPatents()}
        {hayPatentScope()}
        {hayNASA()}
      </div>
    </div>
  );
}

export default BotonesCambio;
