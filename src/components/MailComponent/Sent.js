import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Sent() {
  const [emails, setEmails] = useState([]);
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    fetch("https://mail-box-client-4c3e9-default-rtdb.firebaseio.com/email.json").then(
      (res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log("data fetched succesfully", data);
            const emailData = Object.values(data);
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
  }, []);

  
  
  return (
    <Link to="/sent">
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
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
                        {/* <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Status
                        </th> */}
                        {/* <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th> */}
                      </tr>
                    </thead>

                    <tbody className="bg-white">
                      {emails
                        .filter((mail) => mail.from === userEmail)
                        .map((email) => (
                          <tr key={email.id}
                          // onClick={() => handleMailState(email?.id)}
                          >
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              {email.from}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              {email.to}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              {email.message}
                            </td>
                            {/* <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span
                                className={`inline-flex px-2 text-xs font-semibold leading-5 ${
                                  email.isRead
                                    ? "text-green-800 bg-green-100"
                                    : "text-red-800 bg-red-100"
                                } rounded-full`}
                              >
                                {email.isRead ? "Read" : "Unread"}
                              </span>
                            </td> */}
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

export default Sent;
