"use client";
import React from "react";
import Navbar from "./../../../[locale]/Navbar";
import Footer from "./../../../[locale]/Footer";
import { useTranslations } from "next-intl";
import { NextIntlClientProvider, createTranslator } from "next-intl";

const About = () => {
  const t = useTranslations("About");
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <Navbar />
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-grey-900 md:text-4xl lg:text-5xl dark:text-white">
            Livechat on your website
          </h1>
          <p>This is embedded Livechat:</p>
          <iframe
            src="https://a.sunai.ee/b?bot=c2182e79-f387-4a4e-934f-d53ce30d077f"
            width="500"
            height="500"
            allow="microphone *"
          ></iframe>
        </div>
        <Footer />
      </section>
    </div>
  );
};

export default About;
