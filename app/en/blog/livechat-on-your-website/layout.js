import "../../../../globals.css";
import { Inter } from "next/font/google";

import { useLocale } from "next-intl";
import { NextIntlClientProvider, createTranslator } from "next-intl";
import { notFound } from "next/navigation";

export const runtime = "edge";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Intuition trainer online",
  description: "Boost Intuition: Trust Your Gut!",
};

const locales = ["en", "ru", "et", "tr"];

export default async function RootLayout({ children, params: { locale } }) {
  let messages;
  try {
    messages = (await import(`../../../../messages/en.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale="ru" messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
