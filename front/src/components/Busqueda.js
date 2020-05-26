import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Busqueda(props) {
  const [docs, setDocs] = useState([]);
  const [err, setErr] = useState(null);

  const setupWS = () => {
    const wss = new WebSocket("ws://localhost:3001");

    wss.onopen = () => {
      console.log("WS client connected");

      wss.onmessage = (msg) => {
        console.log("WS got message", msg);

        setDocs(JSON.parse(msg.data));
      };
    };
  };

  useEffect(() => {
    /*setupWS();

    fetch("/latestSearches")
      .then((res) => res.json())
      .then((res) => {
        if (!res.succes) {
          setErr(res.err);
          return;
        }
        setDocs(res.docs);
      })
      .catch((err) =>
        setErr(err)
      ); */
    setDocs([
      {
        text: "prueba 4",
        date: "2020-05-25T17:08:27.930Z",
        relativeDate: "hace 5 minutos",
      },
      {
        text: "Prueba 3",
        date: "2020-05-25T16:53:06.859Z",
        relativeDate: "hace 20 minutos",
      },
      {
        text: "Buenas noches",
        date: "2019-05-25T16:52:15.286Z",
        relativeDate: "hace 30 minutos",
      },
      {
        text: "Chocorramo blanco",
        date: "2020-05-25T16:40:29.892Z",
        relativeDate: "hace 33 minutos",
      },
      {
        text: "prueba 4",
        date: "2020-05-25T17:08:27.930Z",
        relativeDate: "hace 5 minutos",
      },
      {
        text: "Prueba 3",
        date: "2020-05-25T16:53:06.859Z",
        relativeDate: "hace 20 minutos",
      },
      {
        text: "Buenas noches",
        date: "2019-05-25T16:52:15.286Z",
        relativeDate: "hace 30 minutos",
      },
      {
        text: "Chocorramo blanco",
        date: "2020-05-25T16:40:29.892Z",
        relativeDate: "hace 33 minutos",
      },
      {
        text: "prueba 4",
        date: "2020-05-25T17:08:27.930Z",
        relativeDate: "hace 5 minutos",
      },
      {
        text: "Prueba 3",
        date: "2020-05-25T16:53:06.859Z",
        relativeDate: "hace 20 minutos",
      },
      {
        text: "Buenas noches",
        date: "2019-05-25T16:52:15.286Z",
        relativeDate: "hace 30 minutos",
      },
      {
        text: "Chocorramo blanco",
        date: "2020-05-25T16:40:29.892Z",
        relativeDate: "hace 33 minutos",
      },
    ]);
  }, []);

  const enviarBusqueda = () => {
    let url = "/setSearch";
    let data = {
      text: document.getElementById("busqueda").value,
    };
    console.log(url);

    fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  };

  return (
    <div>
      <div className="container">
        <div className="form-group">
          <div className="row">
            <h2>
              <strong>Search patents</strong>
            </h2>
          </div>
          <br />
          <div className="row">
            <input
              type="text"
              className="form-control"
              id="busqueda"
              name="busqueda"
              required
            />
          </div>
          <br />
          <div className="row">
            <div className="col-8">
              <div className="row">
                <div className="col text-left">
                  <h4>
                    <strong>Source:</strong>
                  </h4>

                  <br />
                  <div className="row">
                    <div className="col-6">
                      <h5>APIs:</h5>
                      <div className="container" style={{ marginLeft: "5px" }}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="fiterPatentsView"
                        />
                        <label
                          className="form-check-label"
                          for="fiterPatentsView">
                          PatentsView
                        </label>
                        <br />
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="filterEPO"
                        />
                        <label className="form-check-label" for="filterEPO">
                          European Patent Option
                        </label>
                      </div>
                    </div>
                    <div className="col-6">
                      <h5>Databases:</h5>
                      <div className="container" style={{ marginLeft: "5px" }}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="filterGoogleUPatents"
                        />
                        <label
                          className="form-check-label"
                          for="filterGoogleUPatents">
                          Google Utility Patents
                        </label>
                        <br />
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="filterGoogleIPatents"
                        />
                        <label
                          className="form-check-label"
                          for="filterGoogleIPatents">
                          Google Issued Patents
                        </label>
                        <br />
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="filterPatentScope"
                        />
                        <label
                          className="form-check-label"
                          for="filterPatentScope">
                          PatentScope
                        </label>
                        <br />
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="filterNASA"
                        />
                        <label className="form-check-label" for="filterNASA">
                          NASA Patents
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col text-left">
                      <h4>
                        <strong>Filter by date:</strong>
                      </h4>
                    </div>
                  </div>
                  <div className="row" style={{ padding: "5px" }}>
                    <div className="col-6">
                      <div class="form-group">
                        <label
                          for="exampleFormControlTextarea1"
                          className="text-muted">
                          Insert date (YYYY-MM-DD):
                        </label>
                        <textarea
                          class="form-control"
                          id="exampleFormControlTextarea1"
                          rows="1"></textarea>
                      </div>
                    </div>
                    <div className="col-6">
                      <br />
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="fechas"
                          id="fechaPosterior"
                        />
                        <label
                          className="form-check-label"
                          for="fechaPosterior">
                          After
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="fechas"
                          id="fechaIgual"
                        />
                        <label className="form-check-label" for="fechaIgual">
                          Equal
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div>{err ? <div>rrre {JSON.stringify(err)} </div> : ""}</div>
              <div className="row">
                <div className="col text-right">
                  <h4>
                    <strong>Latest searches</strong>
                  </h4>
                </div>
              </div>
              <br />
              <div className="text-left">
                <div className="form-group">
                  <select
                    multiple
                    className="form-control"
                    id="exampleFormControlSelect2"
                    style={{ height: "270px" }}>
                    {docs.map((d, i) => (
                      <option key={i}>
                        {d.text} {d.relativeDate}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="row text-center">
            <button
              className="btn btn-primary btn-lg"
              style={{ width: "100%", height: "65%", marginBottom: "0px" }}
              onClick={enviarBusqueda}>
              Search
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="row">
        <div
          class="btn-group btn-group-toggle text-center"
          data-toggle="buttons">
          <Link to={"results/patentsview"}>
            <label class="btn btn-secondary active">
              <input
                type="radio"
                name="options"
                id="option1"
                autocomplete="off"
                checked
              />{" "}
              Option 1
            </label>
          </Link>
          <label class="btn btn-secondary">
            <input
              type="radio"
              name="options"
              id="option2"
              autocomplete="off"
            />{" "}
            Option 2
          </label>
          <label class="btn btn-secondary">
            <input
              type="radio"
              name="options"
              id="option3"
              autocomplete="off"
            />{" "}
            Option 3
          </label>
          <label class="btn btn-secondary">
            <input
              type="radio"
              name="options"
              id="option2"
              autocomplete="off"
            />{" "}
            Option 4
          </label>
          <label class="btn btn-secondary">
            <input
              type="radio"
              name="options"
              id="option3"
              autocomplete="off"
            />{" "}
            Option 5
          </label>
        </div>
      </div>

      <br />
      <br />
      <br />
    </div>
  );
}

export default Busqueda;
