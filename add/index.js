const cors = require("cors");

//create express application
//import express module
const express = require("express");
const app = express();

//body parser
app.use(express.json());
app.use(cors());

//assign port no to server
app.listen(4000, () => console.log("Server stated on  port no: 4000"));

//API
const expressAsyncHandler = require("express-async-handler");
app.post(
  "/add",
  expressAsyncHandler(async (req, res) => {
    let steps = [];
    let carryString = "_";
    let sumString = "";
    let { num1, num2 } = req.body;

    let length = num1.length > num2.length ? num1.length : num2.length; // max length of 2 nums

    for (let i = 0; i < length; i++) {
      let stepNumber = "step" + (i + 1);
      if (i != length - 1) {
        sumString =
          (
            (Number(num1.charAt(num1.length - 1 - i)) +
              Number(num2.charAt(num2.length - 1 - i)) +
              (carryString.length > 1 ? Number(carryString.charAt(0)) : 0)) %
            10
          ).toString() + sumString;

        carryString =
          Math.floor(
            (Number(num1.charAt(num1.length - 1 - i)) +
              Number(num2.charAt(num2.length - 1 - i)) +
              (carryString.length > 1 ? Number(carryString.charAt(0)) : 0)) /
              10
          ).toString() + carryString;
      } else {
        sumString =
          (
            Number(num1.charAt(num1.length - 1 - i)) +
            Number(num2.charAt(num2.length - 1 - i)) +
            (carryString.length > 1 ? Number(carryString.charAt(0)) : 0)
          ).toString() + sumString;
      }
      steps[i] = { carryString: carryString, sumString: sumString };
    }
    res.send({ payload: steps });
  })
);
