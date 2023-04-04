const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const port = 9001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api', apiRoutes);

app.listen(port, () => console.log(`http://127.0.0.1:${port}`));




// const express = require("express");
// const app = express();
// const cors = require("cors");
// const path = require("path")
// const port = 9001;
// const pizzaData = require('./pizzas.json');
// const allergensData = require('./allergens.json');


// // app.use(cors());
// app.use(express.json());
// // app.use(express.urlencoded({ extended: false }));
// // const indexRouter = require("./routes/index.js");

// app.get("/", (req, res) => {
//     res.redirect(301, "/index.html");
//   });

// app.use(express.static(path.join(__dirname, '../frontend')));

// // app.get("/viewhtml", (req, res) => {
// //     res.sendFile(path.join(__dirname, '../frontend/index.html'));
// // });
// app.get('/pizzas', (req, res) => {
//     res.json(pizzaData);
//   });
//   app.get('/allergens', (req, res) => {
//     res.json(allergensData);
//   });
// // app.use("/",indexRouter)
// app.listen(port, () => console.log(`http://127.0.0.1:${port}`));
