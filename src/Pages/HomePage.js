import React from "react";
import Header from "../components/Layout/Header";
import backgroundImage from "../../src/MailBoxBgImg.png";
function HomePage() {
  return (
    <>
      <Header />
      <div>
        <div
          className="absolute bg-center bg-cover inset-0 left-17rem z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundColor: "white",
          }}
        />
      </div>
    </>
  );
}

export default HomePage;
