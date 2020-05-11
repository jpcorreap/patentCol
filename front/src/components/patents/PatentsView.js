import React, { useState, useEffect } from "react";
//import Logo from "../src/PatentView.png";

function PatentsView() {
  const [patentsView, setPatentsView] = useState([]);
  const [hasError, setErrors] = useState(false);

  // Hace GET de la API
  useEffect(() => {
    async function fetchPatentsView() {
      const type = "";
      const res = await fetch(
        //`https://www.patentsview.org/api/patents/query?q={"patent_type":[${type}]}&f=["patent_number","patent_abstract","patent_title","patent_type","patent_year"]&s=[{"patent_number":"desc"}]`
        `https://www.patentsview.org/api/patents/query?q={"_gte":{"patent_date":"2007-01-04"}}&f=["patent_number","patent_abstract","patent_title","patent_type"]&s=[{"patent_number":"desc"}]`
      );
      res
        .json()
        .then((res) => setPatentsView(res.patents))
        .catch((err) => setErrors(err));
    }
    fetchPatentsView();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-4">
          <img
            id="imagenAHH"
            src="https://www.patentsview.org/web/img/f34f24560eeb9097579c2be6fa29f5a7.logo_2x.png"></img>
        </div>
        <div className="col text-right">
          <img
            src="https://st2.depositphotos.com/4191945/7462/v/950/depositphotos_74627113-stock-illustration-document-funnel-or-filter-logo.jpg"
            width="100px"></img>
        </div>
      </div>
      <div className="container">
        <br />
        <div className="row justify-content-center">
          {patentsView.map((patent) => (
            <div
              className="card border-info mb-3 col-md-12"
              key={patent.patent_number}>
              <div className="card-header">
                <h4>{patent.patent_title}</h4>
              </div>
              <div className="card-body">
                <p>
                  <strong>Type:</strong> {patent.patent_type}
                </p>
                <p className="card-text text-justify">
                  {patent.patent_abstract}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PatentsView;
