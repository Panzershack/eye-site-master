import React, { useState } from "react";
import { database } from "./FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function RegisterAndLogin() {
  const [login, setLogin] = useState(false);
  const history = useNavigate();

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (type === "signup") {
      createUserWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, "authData");
          history("/admin");
        })
        .catch((err) => {
          alert(err.code);
          setLogin(true);
        });
    } else {
      signInWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, "authData");
          history("/admin");
        })
        .catch((err) => {
          alert(err.code);
        });
    }
  };

  const handleReset = () => {
    history("/reset");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4 flex flex-row">
        <div
          className={`cursor-pointer px-4 py-2 text-lg ${
            !login ? "bg-blue-500 text-white" : "text-blue-500"
          }`}
          onClick={() => setLogin(false)}
        >
          SignUp
        </div>
        <div
          className={`cursor-pointer px-4 py-2 text-lg ${
            login ? "bg-blue-500 text-white" : "text-blue-500"
          }`}
          onClick={() => setLogin(true)}
        >
          SignIn
        </div>
      </div>
      <h1 className="text-3xl mb-4">{login ? "SignIn" : "SignUp"}</h1>
      <form
        className="flex flex-col items-center"
        onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")}
      >
        <input
          className="w-64 p-2 mb-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
          name="email"
          placeholder="Email"
        />
        <input
          className="w-64 p-2 mb-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
          name="password"
          type="password"
          placeholder="Password"
        />
        <p className="cursor-pointer text-blue-500 mb-4" onClick={handleReset}>
          Forgot Password?
        </p>
        <button className="w-64 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
          {login ? "SignIn" : "SignUp"}
        </button>
      </form>
    </div>
  );
}

export default RegisterAndLogin;
