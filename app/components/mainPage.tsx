"use client";

import { Item } from "@/lib/types";
import { use, useState } from "react";
import { ItemElement } from "@/app/components/itemElement";

type MainPageProps = {
  items: Promise<Item[]>;
};

export default function MainPage({ items }: MainPageProps) {
  const [selectedMaps, setSelectedMaps] = useState<string[]>([]);

  const allItems = use(items);

  const maps = new Set<string>();
  allItems.forEach((item: Item) => {
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
            onClick={() => {
              setSelectedMaps((prev) => [...prev, map]);
            }}
          >
            {map}
          </button>
        ))}
      </div>
      <div>Selected Map: {selectedMaps}</div>
      <div
        id="itemContainer"
        className="grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-2"
      >
        {allItems.map((item: Item) => (
          <div key={item.key}>
            <ItemElement
              name={item.name}
              stats={item.stats}
              image={item.image}
              maps={item.maps}
              selectedMaps={selectedMaps}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
