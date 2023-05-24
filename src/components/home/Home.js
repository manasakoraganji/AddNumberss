import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Home() {
  //state
  let [steps, setSteps] = useState("");
  let [errorMessage, setErrorMessage] = useState("");
  console.log(steps);
  let {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formObj) => {
    // console.log(formObj);
    try {
      let res = await axios.post(`http://localhost:4000/add`, formObj);
      setSteps(res.data.payload);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div>
      <div className="bg-light p-3 ps-5">
        <h1>Step Addition</h1>
      </div>
      <div className="container mb-3">
        <form className="mt-5" method="post" onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-3">
            <div className="col col-12 col-md-6 col-lg-2">
              <label htmlFor="num1" className="form-label">
                First Number :
              </label>
            </div>
            <div className="col col-12 col-md-6 col-lg-10">
              <input
                type="number"
                {...register("num1")}
                id="num1"
                className="form-control bg-light"
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col col-12 col-md-6 col-lg-2">
              <label htmlFor="num2" className="form-label">
                Second Number :
              </label>
            </div>
            <div className="col col-12 col-md-6 col-lg-10">
              <input
                type="number"
                {...register("num2")}
                id="num2"
                className="form-control bg-light"
                required
              />
            </div>
          </div>

          <button className="btn btn-outline-success float-end">
            Generate Steps
          </button>
        </form>
      </div>

      <div className="container mt-5 text-center">
        {errorMessage && (
          <div className="bg-danger-subtle text-danger"> {errorMessage}</div>
        )}

        {!errorMessage && steps && (
          <div className="bg-light container p-5" style={{ marginTop: "70px" }}>
            <div
              className="container   text-light text-start"
              style={{ backgroundColor: "#37346e" }}
            >
              <p>{"{"}</p>
              <div className="ps-3 pe-3">
                {steps.map((step, index) => (
                  <p key={index}>
                    <span className="text-info">"step{index + 1}" </span>
                    <span className="text-warning">
                      : {"{"} "carryString" :
                      <span style={{ color: "#fc8c03" }}>
                        "{step.carryString}"
                      </span>
                      ,"sumString":{" "}
                      <span style={{ color: "#fc8c03" }}>
                        "{step.sumString}"{" "}
                      </span>{" "}
                      {"}"},
                    </span>
                  </p>
                ))}
              </div>
              <p>{"}"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
