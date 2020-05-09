import React, { useState, useEffect } from "react";
import PasoTitle from "./PasoTitle.js";

function Paso3() {
  const [patents, setPatents] = useState({});
  const [hasError, setErrors] = useState(false);

  const display = ["patent_number", "patent_date"];
  console.log(display);
  const operation = "_gte";
  const val1 = "patent_date";
  const val2 = "2007-01-04";

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        'https://www.patentsview.org/api/patents/query?q={"_and": [{"_gte":{"patent_date":"2001-01-01"}},{"_text_any":{"patent_abstract":"international"}},{"_neq":{"assignee_lastknown_country":"US"}}]}&f=["patent_number","patent_processing_time","patent_kind"]'
        //`https://www.patentsview.org/api/patents/query?q={${operation}:{${val1}:${val2}}}&f=${display}`
      );
      res
        .json()
        .then((res) => setPatents(res))
        .catch((err) => setErrors(err));
    }

    fetchData();
    console.log("Patentesss ", patents);
  }, []);

  return (
    <div className="paso">
      <PasoTitle actual={3} nombre="Estado de la técnica" />
      <br />
      <p>Se trajo todas las patentes de </p>
      <br />
      <div>{JSON.stringify(patents)}</div>
      <div>Has error: {JSON.stringify(hasError)}</div>
    </div>
  );
}

export default Paso3;
