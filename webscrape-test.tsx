import * as cheerio from "cheerio";

async function main() {
  const response = await fetch("https://wiki.leagueoflegends.com/en-us/Item");
  if (!response.ok) {
    throw new Error(`Failed to fetch page: ${response.statusText}`);
  }

  let itemData: { name: string; modes: string[] }[] = [];
  const html = await response.text();
  const $ = cheerio.load(html);

  $(".item-icon").each((i, el) => {
    const item = $(el);
    const name = item.attr("data-search");
    const modes = item.attr("data-modes");
    if (name && modes) {
      itemData.push({
        name: name,
        modes: modes.split(",").map((mode) => mode.trim()),
      });
    }
  });
  itemData = itemData.filter((item) => item.modes.includes("classic sr 5v5"));

  //   try {
  //     const fetchPromises = itemData.map(async (data) => {
  //       const wikitext = `{{Tooltip/Item|item=${data.name}|enchantment=|variant=|game=lol}}`;
  //       const encodedText = encodeURIComponent(wikitext);
  //       const apiUrl = `https://wiki.leagueoflegends.com/en-us/api.php?action=parse&format=json&disablelimitreport=true&prop=text&contentmodel=wikitext&maxage=600&smaxage=600&text=${encodedText}`;
  //       const response = await fetch(apiUrl);
  //       if (!response.ok) {
  //         throw new Error(
  //           `Failed to fetch item data for ${data.name}: ${response.statusText}`,
  //         );
  //       }
  //       const json = await response.json();
  //       const html = json.text["*"];
  //       const $ = cheerio.load(html);

  //       const itemName = $("b").first().text().trim();
  //       const totalCost = $("a[title*='Gold']")
  //         .closest("span")
  //         .next("span")
  //         .text()
  //         .trim();
  //       const stats: Record<string, string> = {};

  //       $("tr").each((_, row) => {
  //         const columns = $(row).find('td[style*="color:#8AC88A"]');

  //         if (columns.length === 2) {
  //           const statName = $(columns[0]).text().replace(":", "").trim();
  //           const statValue = $(columns[1]).text().trim();
  //           stats[statName] = statValue;
  //         }
  //       });

  //       const finalItemData = {
  //         name: itemName,
  //         totalCost: totalCost,
  //         stats: stats,
  //       };
  //     });
  //   } catch (e) {}
}

main();
