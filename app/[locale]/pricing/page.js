import Pricing from "./pricing";

/*
export const metadata = {
  title: "Demo - ModalJS",
};
*/

export async function generateMetadata({ params, params: { locale } }, parent) {
  // read route params
  const id = params.id;

  // fetch data

  let messages;
  try {
    messages = (await import(`../../../messages/${params.locale}.json`))
      .default;
    console.log("Messages: " + JSON.stringify(params));
  } catch (error) {
    notFound();
  }

  return {
    title: messages.Pricing.metaTitle,
    description: messages.Pricing.metaDescription,
  };
}

const Page = () => {
  return (
    <div>
      <Pricing />
    </div>
  );
};

export default Page;
