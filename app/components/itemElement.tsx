"use client";

import Image from "next/image";

type ItemElementProps = {
  name: string;
  stats: string[];
  image: string;
  maps: string[];
  selectedMaps: string[];
};

export function ItemElement({
  name,
  stats,
  image,
  maps,
  selectedMaps,
}: ItemElementProps) {
  let selected = true;
  for (map in maps)
    return (
      <Image
        className={
          maps.includes(selectedMap)
            ? "border-2 border-blue-500"
            : "grayscale-100"
        }
        alt={name}
        src={image}
        width={48}
        height={48}
      />
    );
}
