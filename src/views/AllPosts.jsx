import Sorted from "./Sorted";

export default function AllPosts() {
  return (
    <div className="container mx-auto px-3 py-5">
      <h1 className="text-4xl font-bold mb-8">Всички публикации</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <Sorted />
      </div>
    </div>
  );
}
