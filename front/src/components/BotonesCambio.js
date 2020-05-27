import React from "react";
import { Link } from "react-router-dom";

function BotonesCambio(props) {
  let sinColor = { color: "white" };

  return (
    <div className="col text-center">
      <div class="btn-group btn-group-toggle text-center" data-toggle="buttons">
        <label class="btn btn-secondary active">
          <input
            type="radio"
            name="options"
            id="option1"
            autocomplete="off"
            checked={props.actual == "PatentsView"}
            disabled={props.actual == "PatentsView"}
          />{" "}
          <Link to={"/results/patentsview"} style={sinColor}>
            PatentsView
          </Link>
        </label>
        <label class="btn btn-secondary">
          <input
            type="radio"
            name="options"
            id="option2"
            autocomplete="off"
            checked={props.actual == "PatentScope"}
            disabled={props.actual == "PatentScope"}
          />{" "}
          <Link to={"/results/patentscope"} style={sinColor}>
            PatentScope
          </Link>
        </label>
        <label class="btn btn-secondary">
          <input
            type="radio"
            name="options"
            id="option3"
            autocomplete="off"
            checked={props.actual == "GoogleUPatents"}
            disabled={props.actual == "GoogleUPatents"}
            GoogleIPatents
          />{" "}
          <Link to={"/results/googleutility"} style={sinColor}>
            Google Utility Patents
          </Link>
        </label>
        <label class="btn btn-secondary">
          <input
            type="radio"
            name="options"
            id="option2"
            autocomplete="off"
            checked={props.actual == "GoogleIPatents"}
            disabled={props.actual == "GoogleIPatents"}
          />{" "}
          <Link to={"/results/googleissued"} style={sinColor}>
            Google Issued Patents
          </Link>
        </label>
        <label class="btn btn-secondary">
          <input
            type="radio"
            name="options"
            id="option3"
            autocomplete="off"
            checked={props.actual == "NasaPatents"}
            disabled={props.actual == "NasaPatents"}
          />{" "}
          <Link to={"/results/nasa"} style={sinColor}>
            NasaPatents
          </Link>
        </label>
      </div>
    </div>
  );
}

export default BotonesCambio;
