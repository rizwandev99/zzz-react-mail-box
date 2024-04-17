import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmailDetail from "./EmailDetail";
import { ToastContainer, toast } from "react-toastify";

function Inbox() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://mail-box-client-4c3e9-default-rtdb.firebaseio.com/email.json").then(
      (res) => {
        if (res.ok) {
          res.json().then((data) => {
            for (const key in data) {
              data[key].id = key;
            }

            const emailData = Object.values(data);
            for (const key in data) {
              data[key].id = key;
            }
            setEmails(emailData);
          });
        } else {
          res.json().then((data) => {
            console.log("Err Occurred : ", data.error.message);
            window.alert(data.error.data.message);
          });
        }
      }
    );
  };
  const userEmail = localStorage.getItem("email");

  const handleMailState = (emailId) => {
    const emailIndex = emails.findIndex((email) => emailId === email.id);
    if (emailIndex !== -1) {
      const updatedEmails = [...emails];
      updatedEmails[emailIndex] = {
        ...updatedEmails[emailIndex],
        isRead: true,
      };
      setEmails(updatedEmails);

      fetch(
        `https://mail-box-client-4c3e9-default-rtdb.firebaseio.com/email/${emailId}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            isRead: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (!res.ok) {
          res.json().then((data) => {
            console.log("Err occured", data.error.message);
            window.alert(data.error.message);
          });
        }
      });
    }
  };
  const [selectedEmail, setSelectedEmail] = useState(null);
  const handleEmailClick = (email) => {
    setSelectedEmail(email); // Set selected email data
  };

  const handleOnDelete = (id) => {
    fetch(
      `https://mail-box-client-4c3e9-default-rtdb.firebaseio.com/email/${id}.json`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          toast.dismiss();
          toast("Data deleted Successfully");
          fetchData();
        });
      } else {
        res.json().then((data) => {
          console.log("Err occurred", data.error.message);
          window.alert(data.error.message);
        });
      }
      setTimeout(() => {
        toast.dismiss();
      }, 500);
    });
  };

  return (
    <Link to="/inbox">
      <div className="flex flex-col flex-1 overflow-hidden">
        <ToastContainer position="top-right" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          {selectedEmail && <EmailDetail selectedEmail={selectedEmail} />}
          <div className="absolute container left-17rem mx-auto px-6 py-8 top-0 w-[70%]">
            <div className="flex flex-col">
              <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          From
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          To
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Message
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Status
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Actions
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                      </tr>
                    </thead>

                    <tbody className="bg-white">
                      {emails
                        .filter((mail) => mail.to === userEmail)
                        .map((email) => (
                          <tr
                            key={email.id}
                            onClick={() => handleMailState(email?.id)}
                          >
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              {email.from}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              {email.to}
                            </td>
                            <td
                              className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                              onClick={() => {
                                handleEmailClick(email);
                              }}
                            >
                              {email.message}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span
                                className={`inline-flex px-2 text-xs font-semibold leading-5 ${
                                  email.isRead
                                    ? "text-green-800 bg-green-100"
                                    : "text-red-800 bg-red-100"
                                } rounded-full`}
                              >
                                {email.isRead ? "Read" : "Unread"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              {/* <span
                                className={`inline-flex px-2 text-xs font-semibold leading-5 ${
                                  email.isRead
                                    ? "text-green-800 bg-green-100"
                                    : "text-red-800 bg-red-100"
                                } rounded-full`}
                              >
                                {email.isRead ? "Read" : "Unread"}
                              </span> */}
                              <button
                                className="bg-red-100 px-2 rounded-full"
                                onClick={() => handleOnDelete(email?.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Link>
  );
}

export default Inbox;
