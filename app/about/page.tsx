import { getS3Url, photos } from "@/lib/utils";

export default function About() {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat flex flex-col items-center relative"
      style={{
        backgroundImage: `url(${getS3Url(photos.home.landing)})`,
        minHeight: "calc(100vh - 4rem)",
      }}
    >
      <h1 className="text-4xl font-bold mb-6">About</h1>
      <p className="text-lg text-gray-700">
        Content for about page will go here
      </p>
    </div>
  );
}
