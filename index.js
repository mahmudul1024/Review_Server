const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Data
const ServiceData = require("./Data/ServiceData.json");

// middleware
app.use(cors());
app.use(express.json());

app.post("/", (req, res) => {
  const size = req.body.sizelimit;
  let PartialService = ServiceData.slice(0, size);
  if (size <= 3) {
    return res.send(PartialService);
  } else {
    PartialService = ServiceData.slice(0, size);
    return res.send(PartialService);
  }
});

app.get("/details/:id", (req, res) => {
  const data = req.params.id;

  res.send({ data });
});

app.post("/detailsId", (req, res) => {
  const data = req.body.data;
  let search = ServiceData.find((serv) => serv.service_id === data);
  console.log(search);
  res.send(search);
});

app.listen(port, () => {
  console.log(" helix server running on port ", port);
});
