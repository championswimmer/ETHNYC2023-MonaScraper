import axios from 'axios';
import path from 'path';
import fs from 'fs/promises'


const OUTPUT = path.join(__dirname, '../data/monaverse.json');

async function main() {
  console.log(fetch)
  const resp = await axios.request({
    url: "https://api.monaverse.com/collectibles?hidden=false&isMinted=true&isSFW=true&type=Space&limit=100&offset=0&page=1&sort[]=popularity:desc",
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/118.0",
      "Accept": "application/json",
      "Accept-Language": "en-US,en;q=0.5",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTU0NzYyNDksInN1YiI6InFZdUJ5cmcyMmdIciIsInR5cGUiOiJhcHBsaWNhdGlvbiIsImlhdCI6MTY5NTQ2OTA0OX0.0O4BL86_HqXW9moEYjNcSLPt5JpGia1SJEaSbUrgKcc",
      "If-None-Match": "W/\"23af4-4kZ4+SysjnmhQgRMu9aeT1IWG/g\""
    },
  })

  const scrapedData = []
  for (const item of resp.data.results) {
    scrapedData.push({
      id: item.id,
      properties: item.properties,
      artist: item.artist,
      title: item.title,
      webmURL: `https://res.cloudinary.com/mona-gallery/video/upload/ipfs/${item.render}.webm`,
      imgURL: `https://ipfs.mona.gallery/ipfs/${item.image}`,
      lastSalePrice: item.lastSalePrice,
      views: item.views,

    })
  }

  await fs.writeFile(OUTPUT, JSON.stringify(scrapedData, null, 2))

}

main()

