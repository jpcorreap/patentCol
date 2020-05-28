let url = "getGenericsPatents/nasaPatents";
let body = { text: "Training Exercise" };

const fetchGenerico = (url, body, setter) => {
  fetch("http://localhost:3001/" + url, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(body), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((respuestaEnJSON) => {
      if (respuestaEnJSON) {
        console.log("Se obtuvo como respuesta: ", respuestaEnJSON);
      }
    })
    .catch((error) => console.error("Error:", error))
    .then((response) => console.log("Success:", response));
};
