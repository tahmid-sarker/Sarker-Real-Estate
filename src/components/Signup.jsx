import React, { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "../firebase/firebase";
import { updateProfile } from "firebase/auth";

const Signup = ({handleGoogleLogin, setShowSignupPopup, toggleLoginPopup}) => {
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupEmail,
        signupPassword
      );
      await updateProfile(userCredential.user, { displayName: signupName });
      setShowSignupPopup(false);
    } catch (error) {
      console.error("Error signing up: ", error);
      alert("Error signing up: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              htmlFor="signupName"
              className="block text-sm font-semibold text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="signupName"
              name="signupName"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-orange-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="signupEmail"
              className="block text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="signupEmail"
              name="signupEmail"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-orange-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="signupPassword"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="signupPassword"
              name="signupPassword"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-orange-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white uppercase font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => setShowSignupPopup(false)}
            className="text-gray-700 mt-2 ml-4"
          >
            Cancel
          </button>
        </form>
        <p className="my-4 text-sm text-gray-700">
          Already have an account?{" "}
          <button
            onClick={() => {
              setShowSignupPopup(false);
              toggleLoginPopup();
            }}
            className="text-red-500 hover:underline"
          >
            Login
          </button>
        </p>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_17_40)">
              <path
                d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                fill="#4285F4"
              />
              <path
                d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                fill="#34A853"
              />
              <path
                d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                fill="#FBBC04"
              />
              <path
                d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                fill="#EA4335"
              />
            </g>
            <defs>
              <clipPath id="clip0_17_40">
                <rect width="48" height="48" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Sign Up with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
