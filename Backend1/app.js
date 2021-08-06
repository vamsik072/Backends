let express = require("express"); //express import
let cors = require("cors"); //To remove issue of both F&B
let bodyParser = require("body-parser"); // json data receive
let app = express(); // express initial
app.use(cors()); //cors initial
// app.use(bodyParser()); //bodyparser initial
app.use(express.json()); //alternative for bodyparser

// app.get takes 2 two inputs 1)path 2)call back function

// callback function takes 2 inputs
// 1)req  req contains frontend data
// 2)res   res holds the data to be send from backend

//response contains 3 types of data returns
// 1)res.send   it can returns multiple times
//2) res.json   it can returns only json
//3)res.end     it can returns one times  & once res.end as been encountered the backend stops sending data
// response can also sends status codes  ex:1)200 (success) 2)404(Not Found)  3)500 (internal server error)
//to use status,code is res.status(200)

app.get("/", (req, res) => {
  res.status(200);
  res.send("<h1>Hello World</h1>");
});

let products = [
  {
    id: 1,
    name: "Oneplus",
  },
  {
    id: 2,
    name: "mi",
  },
];

// backend to frontend - get
app.get("/products", (req, res) => {
  res.json(products);
});

//frontend to backend - POST, PUT, DELETE, PATCH
app.post("/products", (req, res) => {
  if(req.body.id && req.body.name){
    products.push(req.body);
    res.status(200).json({msg:"Data updated successfully"})
  }else{
    res.status(500).send("Invalid Data")
  }

  // console.log(req.query);   //syntax for query
  //  res.send("Data recevied ")

  // console.log(req.body);
  // products.push(req.body);
  // res.json({ message: "Data updated successfully" });
});


app.get("/products/:id", (req, res) => {
  let newData = products.filter((item) => item.id == req.params.id);
  if (newData.length==0) {
    res.send("ID NOT FOUND");
  } else {
    res.json(newData);
  }
});


app.listen(5000, () => console.log("server is running")); //to start server
