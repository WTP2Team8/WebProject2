import Footer from "../components/Footer";
import Sorted from "./Sorted";

export default function AllPosts() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 flex justify-center items-center">Всички публикации</h1>
      <div className="grid grid-cols-1 gap-4">
        <Sorted />
      </div>
    </div>
  );
}
