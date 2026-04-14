fetch("http://localhost:5000/api/hola")
  .then(res => res.json())
  .then(data => {
    document.getElementById("mensaje").innerText = data.mensaje;
  })
  .catch(err => console.error(err));