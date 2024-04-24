"use client";
import Navbar from "../Navbar";
import Footer from "../Footer";
import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Contact = () => {
  const t = useTranslations("Contact");
  return (
    <div>
      <Navbar />
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-grey-900 md:text-4xl lg:text-5xl dark:text-white">
            {t("Title")}
          </h1>
          <p>{t("First_text")}</p>
          <p>
            <Link href="https://t.me/Sunrise_ai_aleks">Telegram</Link>
          </p>
          <p>
            <Link href="https://www.instagram.com/sunrise_ai_agency">
              Instagram
            </Link>
          </p>
          <p>
            <Link href="mailto:aleksandr@sunai.ee">E-mail</Link>
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
