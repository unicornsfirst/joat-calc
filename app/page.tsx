import { Item } from "@/lib/types";
import MainPage from "./components/mainPage";

export default async function Home() {
  async function getItems(): Promise<Item[]> {
    let items = [];
    const response = await fetch(`${process.env.BASE_URL}/api/items`);
    if (response.ok) {
      items = (await response.json()).data;
    }
    return items;
  }

  return <MainPage items={getItems()}></MainPage>;
}
