"use client";

import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const ExternalOverlays = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <ToastContainer position="top-right" theme="colored" autoClose={2000} />
      <NextTopLoader
        color="#27A376"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl
        showSpinner
        easing="ease"
        speed={200}
        shadow="0 0 10px #27A376,0 0 5px #27A376"
      />
    </>
  );
};

export default ExternalOverlays;
