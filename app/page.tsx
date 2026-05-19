import Image from "next/image";

export default async function Home() {
  let items = [];
  const response = await fetch(`${process.env.BASE_URL}/api/items`);
  if (response.ok) {
    items = (await response.json()).data;
  }
  console.log(items.length);
  return (
    <div
      id="itemContainer"
      className="grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-2"
    >
      {items.map((item) => (
        <div key={item.key}>
          <Image alt={item.name} src={item.image} width={48} height={48} />
        </div>
      ))}
    </div>
  );
}
