import SearchBar from "../components/SearchBar";
import Sorted from "./Sorted";

export default function AllPosts() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Всички публикации</h1>
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Sorted />
      </div>
    </div>
  );
}
