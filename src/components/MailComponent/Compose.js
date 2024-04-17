import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const Compose = () => {
  const userEmail = localStorage.getItem("email");
  const [intialVal, setIntialVal] = useState([]);

  useEffect(() => {
    fetch("https://mail-box-client-4c3e9-default-rtdb.firebaseio.com/email.json").then(
      (res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log("data fetched succesfully", data);
            setIntialVal(data);
          });
        } else {
          res.json().then((data) => {
            console.log("Err Occurred : ", data.error.message);
            window.alert(data.error.data.message);
          });
        }
      }
    );
  }, []);

  const [emaildata, setEmaildata] = useState({
    from: userEmail && userEmail.length > 0 ? userEmail : "",
    to: "",
    message: "",
    isRead: false,
    id: intialVal.length + 1,
  });

  const compose = () => {
    fetch("https://mail-box-client-4c3e9-default-rtdb.firebaseio.com/email.json", {
      method: "POST",
      body: JSON.stringify(emaildata),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log("data after email sent =", data);
          toast("Email Sent SuccessFully");
          setEmaildata({ ...emaildata, message: "", to: "" });
        });
      } else {
        res.json().then((data) => {
          console.log("Err occured", data.error.message);
          window.alert(data.error.message);
          toast(data.error.message);
        });
      }
      setTimeout(() => {
        toast.dismiss();
      }, 500);
    });
  };
  if (!localStorage.getItem("email")) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div className="w-[70%] m-auto left-17rem absolute top-2rem">
        <ToastContainer position="top-right" reverseOrder={false} />
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            From
          </label>
          <div className="mt-2">
            <input
              disabled
              id="email"
              name="email"
              type="email"
              defaultValue={
                "From :" + userEmail && userEmail.length > 0 ? userEmail : ""
              }
              autoComplete="email"
              required
              className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            send To
          </label>
          <div className="mt-2">
            <input
              type="email"
              required
              value={emaildata.to}
              onChange={(e) => {
                setEmaildata({ ...emaildata, to: e.target.value });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your message
        </label>
        <textarea
          value={emaildata.message}
          onChange={(e) =>
            setEmaildata({ ...emaildata, message: e.target.value })
          }
          id="message"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>
        <button
          onClick={compose}
          style={{ backgroundColor: "blue" }}
          className=" mt-8 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Compose +
        </button>
      </div>
    );
  }
};

export default Compose;
