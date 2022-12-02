const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// Data

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.n9cwtsk.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function connection() {
  try {
    const servicesCollection = client
      .db("HelixDatabase")
      .collection("Services");
    const ReviewCollection = client.db("HelixDatabase").collection("Myreviews");

    app.get("/details/:id", async (req, res) => {
      const dataId = req.params.id;
      const query = { _id: ObjectId(dataId) };
      const data = await servicesCollection.findOne(query);
      console.log(data);

      res.send({ data });
    });

    app.post("/newReview", async (req, res) => {
      const bdy = req.body.review;
      // console.log(bdy);

      const result = await ReviewCollection.insertOne(bdy);

      res.send(result);
    });

    app.get("/oldReview", async (req, res) => {
      const query = {};
      const cursor = ReviewCollection.find(query);
      const cursorArray = await cursor.toArray();

      res.send(cursorArray);
    });

    app.post("/MyReview", async (req, res) => {
      const email = req.body.email;
      const emaili = { email };
      console.log(emaili);
      const query = { email: emaili.email };
      const cursor = ReviewCollection.find(query);
      const cursorArray = await cursor.toArray();
      console.log(cursorArray);
      res.send(cursorArray);
    });

    //   const data = req.body.data;
    //   console.log(data);
    //   const query = { _id: ObjectId(data) };

    //   const search = await servicesCollection.findOne(query);

    //   res.send(search);
    // });
  } finally {
  }
}

connection().catch((er) => console.error(er));

app.post("/", async (req, res) => {
  const query = {};
  const cursor = servicesCollection.find(query);
  const cursorArray = await cursor.toArray();

  const size = req.body.sizelimit;
  let PartialService = cursorArray.slice(0, size);
  if (size <= 3) {
    return res.send(PartialService);
  } else {
    PartialService = cursorArray.slice(0, size);

    return res.send(PartialService);
  }
});
app.listen(port, () => {
  console.log(" helix server running on port ", port);
});
