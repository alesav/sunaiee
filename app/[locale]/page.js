import Homepage from "./homepage";

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
    messages = (await import(`../../messages/${params.locale}.json`)).default;
    console.log("Messages: " + JSON.stringify(params));
  } catch (error) {
    // notFound();
  }

  return {
    title: messages.Home.metaTitle,
    description: messages.Home.metaDescription,
  };
}

const Page = () => {
  return (
    <div>
      <Homepage />
    </div>
  );
};

export default Page;
