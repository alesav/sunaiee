"use client";
//import Navbar from "./../Navbar";
import Navbar from "./../../../components/en/Navbar2";
import Footer from "./../Footer";
import React from "react";
import { useTranslations } from "next-intl";

// This metadata constant is removed because we will fetch metadata dynamically based on the page

const About = () => {
  const t = useTranslations("About");
  // Add dynamic metadata fetching at the top of the component
  const metadata = useTranslations("AboutMetadata");

  return (
    <div>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <Navbar />
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-grey-900 md:text-4xl lg:text-5xl dark:text-white">
            {t("Title")}
          </h1>
          <p>This is a basic Next.js page.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
