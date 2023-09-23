"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const OUTPUT = path_1.default.join(__dirname, '../data/monaverse.json');
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(fetch);
        const resp = yield axios_1.default.request({
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
        });
        const scrapedData = [];
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
            });
        }
        yield promises_1.default.writeFile(OUTPUT, JSON.stringify(scrapedData, null, 2));
    });
}
main();
