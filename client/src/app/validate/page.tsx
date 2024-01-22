"use client";
import React, { useEffect } from "react";
import axios from "axios";

const ValidatePage = () => {
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/api/v1/user/validate", {
        withCredentials: "include",
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);
  return <div>ValidatePage</div>;
};

export default ValidatePage;
