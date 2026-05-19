import { Item } from "../lib/types";
import { ItemElement } from "./components/itemElement";

export default async function Home() {
  let items = [];
  const response = await fetch(`${process.env.BASE_URL}/api/items`);
  if (response.ok) {
    items = (await response.json()).data;
  }

  const maps = new Set<string>();
  items.forEach((item: Item) => {
    item.maps.forEach((map) => maps.add(map));
  });

  return (
    <div>
      <div className="flex gap-2 mb-4">
        Maps:{" "}
        {Array.from(maps).map((map) => (
          <button
            key={map}
            className="bg-blue-800 text-white px-2 py-1 rounded"
          >
            {map}
          </button>
        ))}
      </div>
      <div
        id="itemContainer"
        className="grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-2"
      >
        {items.map((item: Item) => (
          <div key={item.key}>
            <ItemElement
              name={item.name}
              stats={item.stats}
              image={item.image}
              maps={item.maps}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
