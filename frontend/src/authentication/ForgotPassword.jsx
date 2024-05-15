import React from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { database } from "./FirebaseConfig";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailVal = e.target.email.value;
    sendPasswordResetEmail(database, emailVal)
      .then((data) => {
        alert("Check your email for password reset instructions");
        history("/reglog");
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Forgot Password</h1>
      <form className="flex flex-col items-center" onSubmit={(e) => handleSubmit(e)}>
        <input
          className="w-64 p-2 mb-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
          name="email"
          placeholder="Email"
        />
        <button className="w-64 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
          Reset
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
