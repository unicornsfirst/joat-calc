"use client";

import Image from "next/image";
import { useState } from "react";

type ItemElementProps = {
  name: string;
  stats: string[];
  image: string;
  maps: string[];
};

export function ItemElement({ name, stats, image, maps }: ItemElementProps) {
  const [selectedMap, setSelectedMap] = useState<string>("");
  return (
    <Image
      className={maps.includes(selectedMap) ? "border-2 border-blue-500" : ""}
      alt={name}
      src={image}
      width={48}
      height={48}
    />
  );
}
