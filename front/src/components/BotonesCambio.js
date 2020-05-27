import React from "react";
import { Link } from "react-router-dom";

function BotonesCambio(props) {
  let sinColor = { color: "white" };

  let hayPatentscope = () => {
    if (props.cualesSeMuestran.includes("PatentsView")) {
      return (
        <label class="btn btn-secondary active">
          <input
            type="radio"
            name="options"
            id="option1"
            autocomplete="off"
            checked={props.actual === "PatentsView"}
            disabled={props.actual === "PatentsView"}
          />{" "}
          <Link to={"/results/patentsview"} style={sinColor}>
            PatentsView
          </Link>
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
            checked={props.actual === "GoogleUPatents"}
            disabled={props.actual === "GoogleUPatents"}
            GoogleIPatents
          />{" "}
          <Link to={"/results/googleutility"} style={sinColor}>
            Google Utility Patents
          </Link>
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
            checked={props.actual === "GoogleIPatents"}
            disabled={props.actual === "GoogleIPatents"}
          />{" "}
          <Link to={"/results/googleissued"} style={sinColor}>
            Google Issued Patents
          </Link>
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
            checked={props.actual === "PatentScope"}
            disabled={props.actual === "PatentScope"}
          />{" "}
          <Link to={"/results/patentscope"} style={sinColor}>
            Google Issued Patents
          </Link>
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
            checked={props.actual === "NasaPatents"}
            disabled={props.actual === "NasaPatents"}
          />{" "}
          <Link to={"/results/nasa"} style={sinColor}>
            NasaPatents
          </Link>
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
