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
            style={props.actual === "PatentsView" ? resaltado : sinResaltar}
            checked={props.actual === "PatentsView"}
            disabled={props.actual === "PatentsView"}
          />{" "}
          PatentsView
        </label>
      );
    }
  };

  let hayEPO = () => {
    if (props.cualesSeMuestran.includes("EPO")) {
      return (
        <label class="btn btn-secondary">
          <input type="radio" name="options" id="option2" autocomplete="off" />{" "}
          EPO (no sirve salu2)
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
            checked={props.actual === "GoogleUPatents"}
            disabled={props.actual === "GoogleUPatents"}
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
            checked={props.actual === "GoogleIPatents"}
            disabled={props.actual === "GoogleIPatents"}
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
            checked={props.actual === "PatentScope"}
            disabled={props.actual === "PatentScope"}
          />{" "}
          Google Issued Patents
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
        {hayEPO()}
        {hayGoogleUPatents()}
        {hayGoogleIPatents()}
        {hayPatentScope()}
        {hayNASA()}
      </div>
    </div>
  );
}

export default BotonesCambio;
