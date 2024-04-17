// EmailDetail.js

import React from "react";
import { Link } from "react-router-dom";

const EmailDetail = ({ selectedEmail }) => {
  return (
    <Link to="/emailDetail">
      <div className="p-4 border border-gray-300 rounded shadow-md">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Subject</h2>
        </div>
        <>
          <p className="text-sm text-gray-600">From: {selectedEmail.from}</p>
          <p className="text-sm text-gray-600">To: {selectedEmail.to}</p>
          <p className="text-sm text-gray-600">{selectedEmail.date}</p>
          <hr className="my-2 border-t border-gray-300" />
          <p className="text-gray-800">{selectedEmail.message}</p>
        </>
      </div>
    </Link>
  );
};

export default EmailDetail;
