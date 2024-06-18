import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState();
  console.log("name :", name);
  const [email, setEmail] = useState();
  console.log("email : ", email);
  const [phoneNumber, setPhoneNumber] = useState();
  console.log("phoneNumber :", phoneNumber);
  const navigate = useNavigate();

  const Submited = async (e) => {
    e.preventDefault();
    if (name && email && phoneNumber) {
      try {
        const response = await fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, phoneNumber }),
        });

        if (response.ok) {
          Swal.fire({
            title: "Success",
            text: "User data saved!",
            icon: "success",
          });
          navigate("/");
        } else {
          throw new Error("Failed to save user data");
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire("Error", "Failed to save user data", "error");
      }
    } else {
      Swal.fire("Please fill in all fields");
    }
  };
  return (
    <>
      <h4 className="signupheading">This is Sign Up Page</h4>
      <div className="mainform">
        <div className="seconddiv">
          <div class="input-group">
            <span class="input-group-text"> Name </span>
            <input
              type="text"
              aria-label="First name"
              class="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="input-group">
            <span class="input-group-text"> Email !</span>
            <input
              type="email"
              aria-label="First name"
              class="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="input-group">
            <span class="input-group-text"> Phone No.</span>
            <input
              type="number"
              aria-label="First name"
              class="form-control"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <button onClick={Submited} type="button" class="btn btn-success">
            SignUp!
          </button>
        </div>
      </div>
    </>
  );
}
