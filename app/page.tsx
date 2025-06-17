import RedirectButton from "./components/RedirectButton";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Home</h1>
      <p className="text-lg text-gray-700">
        Content for home page will go here
      </p>
      <RedirectButton href="/about" borderWidth="1px">
        About Page Sample Button
      </RedirectButton>
    </div>
  );
}
