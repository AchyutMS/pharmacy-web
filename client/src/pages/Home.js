import React from "react";
import Layout from "../components/Layout";
import logo from "../sims-Logo-new.png";

function Home() {
  return (
    <>
      <Layout />
      <img
        src={logo}
        style={{
          background: "url(images/sims-background.png)",
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          objectFit: "contain",
          width: "100vw",
          height: "60vh",
          marginTop: "100px",
          opacity: "0.75",
        }}
      />
    </>
  );
}

export default Home;