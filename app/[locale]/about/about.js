"use client";
//import Navbar from "./../Navbar";
import Navbar from "../Navbar";
import Footer from "../Footer";
import React from "react";
import { useTranslations } from "next-intl";

// This metadata constant is removed because we will fetch metadata dynamically based on the page

const About = () => {
  const t = useTranslations("About");

  return (
    <div>
      <Navbar />
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-grey-900 md:text-4xl lg:text-5xl dark:text-white">
            {t("Title")}
          </h1>
          <h2>{t("Who_are_we")}</h2>
          <p>{t("block_1")}</p>
          <p>{t("block_2")}</p>
          <p>{t("block_3")}</p>
          <p>{t("block_4")}</p>
          <h2>{t("block_5")}</h2>
          <p>{t("block_6")}</p>
          <h3>{t("block_7")}</h3>
          <ul>
            <li>{t("block_8")}</li>
            <li>{t("block_9")}</li>
            <li>{t("block_10")}</li>
            <li>{t("block_11")}</li>
            <li>{t("block_12")}</li>
          </ul>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
