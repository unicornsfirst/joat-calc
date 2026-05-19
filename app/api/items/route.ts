import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/16.10.1/data/en_US/item.json",
  );

  if (!response.ok) {
    return NextResponse.json({ error: "Error while fetching data from riot" });
  }

  const items = (await response.json()).data;

  const parsedItems = [];

  for (const key in items) {
    const item = items[key];
    parsedItems.push({
      key: key,
      name: item.name,
      stats: Object.keys(item.stats),
      image: `https://ddragon.leagueoflegends.com/cdn/16.10.1/img/item/${item.image.full}`,
    });
  }
  console.log(parsedItems.length);
  return NextResponse.json({ data: parsedItems });
}
