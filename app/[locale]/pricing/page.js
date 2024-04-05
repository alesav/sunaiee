"use client";
import Navbar from "./../Navbar";
import Footer from "./../Footer";
import React from "react";
import { useTranslations } from "next-intl";
import { Card } from "flowbite-react";

const Pricing = () => {
  const t = useTranslations("Pricing");
  return (
    <div>
      <Navbar />
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-grey-900 md:text-4xl lg:text-5xl dark:text-white">
            {t("Title")}
          </h1>
          <p>{t("Description")}</p>

          <div className="flex">
            <div className="p-4">
              <Card className="max-w-sm">
                <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                  {t("Free_tier")}
                </h5>
                <div className="flex items-baseline text-gray-900 dark:text-white">
                  <span className="text-3xl font-semibold">€</span>
                  <span className="text-5xl font-extrabold tracking-tight">
                    0
                  </span>
                  <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                    /{t("Per_month")}
                  </span>
                </div>
                <ul className="my-7 space-y-5">
                  <li className="flex space-x-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      {t("Always_free")}
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      {t("Up_to_3_Livechat_bots")}
                    </span>
                  </li>

                  <li className="flex space-x-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      {t("100_threads_per_months")}
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      {t("1_agent_seat")}
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      {t("Limited_amount_of_models")}
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      {t("Personal_support")}
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      {t("Integration_help")}
                    </span>
                  </li>
                  <li className="flex space-x-3 line-through decoration-gray-500">
                    <svg
                      className="h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500">
                      {t("Api_access")}
                    </span>
                  </li>
                </ul>
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900"
                >
                  {t("Choose_plan")}
                </button>
              </Card>
            </div>
            <div className="p-4">
              <Card className="max-w-sm">
                <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                  {t("Standard_plan")}
                </h5>
                <div className="flex items-baseline text-gray-900 dark:text-white">
                  <span className="text-3xl font-semibold">€</span>
                  <span className="text-5xl font-extrabold tracking-tight">
                    9.99
                  </span>
                  <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                    /{t("Per_month")}
                  </span>
                </div>
                <ul className="my-7 space-y-5">
                  <li className="flex space-x-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      {t("10_Livechat_and_livechat2_bots")}
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      {t("1000_threads_per_months")}
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      {t("Unlimited_agents")}
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      {t("20_models")}
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      {t("Personal_support")}
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      {t("Integration_help")}
                    </span>
                  </li>

                  <li className="flex space-x-3 line-through decoration-gray-500">
                    <svg
                      className="h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500">
                      {t("Api_access")}
                    </span>
                  </li>
                </ul>
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900"
                >
                  {t("Choose_plan")}
                </button>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Pricing;
