import nplh from "@/assets/card-nplh.jpg";
import rapgame from "@/assets/card-rapgame.jpg";
import wolfthorns from "@/assets/card-wolfthorns.jpg";
import dantanaA from "@/assets/card-dantana-a.jpg";
import dantanaB from "@/assets/card-dantana-b.jpg";
import dantanaC from "@/assets/card-dantana-c.jpg";
import xfiles from "@/assets/card-xfiles.jpg";
import lonewolf from "@/assets/card-lonewolf.jpg";
import acidwash from "@/assets/card-acidwash.jpg";
import anarchy from "@/assets/card-anarchy.jpg";
import lonecrest from "@/assets/card-lonecrest.jpg";
import denimwolf from "@/assets/card-denimwolf.jpg";

export type Collection = {
  id: string;
  index: string;        // 01..12
  title: string;
  subtitle: string;
  image: string;
  category: "Hoodies" | "Jackets" | "Bombers" | "Tees" | "Jeans" | "Hats" | "Joggers";
  flag?: "INVERTED" | "NEW DROP" | "ARCHIVE" | "RESTOCK" | "ALBUM MERCH";
  inverted?: boolean;   // 180° label
};

export const collections: Collection[] = [
  {
    id: "nplh",
    index: "01",
    title: "NPLH",
    subtitle: "No Place Like Home",
    image: nplh,
    category: "Hoodies",
    flag: "ARCHIVE",
  },
  {
    id: "rapgame",
    index: "02",
    title: "STATE OF THE MIC",
    subtitle: "USA × UA Varsity",
    image: rapgame,
    category: "Jackets",
    flag: "NEW DROP",
  },
  {
    id: "wolfthorns",
    index: "03",
    title: "WOLF N THORNS",
    subtitle: "Crown of Thorns Capsule",
    image: wolfthorns,
    category: "Bombers",
  },
  {
    id: "dantana-a",
    index: "04",
    title: "DANTANA / CHEST",
    subtitle: "Heavyweight Tee",
    image: dantanaA,
    category: "Tees",
    flag: "NEW DROP",
  },
  {
    id: "dantana-b",
    index: "05",
    title: "DANTANA / SLEEVES",
    subtitle: "Long-Sleeve Vertical Print",
    image: dantanaB,
    category: "Tees",
  },
  {
    id: "dantana-c",
    index: "06",
    title: "DANTANA / BACK",
    subtitle: "Oversized Hoodie",
    image: dantanaC,
    category: "Hoodies",
  },
  {
    id: "xfiles",
    index: "07",
    title: "X-FILES",
    subtitle: "Believe / Inverted",
    image: xfiles,
    category: "Tees",
    flag: "INVERTED",
    inverted: true,
  },
  {
    id: "lonewolf",
    index: "08",
    title: "LONE WOLF CHRONICLES",
    subtitle: "Album Merch Capsule",
    image: lonewolf,
    category: "Tees",
    flag: "ALBUM MERCH",
  },
  {
    id: "bitebullet",
    index: "09",
    title: "BITE THE BULLET",
    subtitle: "Blood Leather Werewolf",
    image: bitebullet,
    category: "Jackets",
    flag: "ARCHIVE",
  },
  {
    id: "anarchy",
    index: "10",
    title: "SOFISTICATED ANARCHY",
    subtitle: "Gold Wolf × Red Spray",
    image: anarchy,
    category: "Hoodies",
  },
  {
    id: "lonecrest",
    index: "11",
    title: "LONE CREST",
    subtitle: "House Bomber",
    image: lonecrest,
    category: "Bombers",
    flag: "RESTOCK",
  },
  {
    id: "denimwolf",
    index: "12",
    title: "BLACK GOLD",
    subtitle: "Selvedge Denim & Cap",
    image: denimwolf,
    category: "Jeans",
  },
];

export const categories = [
  "Tees",
  "Jeans",
  "Joggers",
  "Bombers",
  "Jackets",
  "Hoodies",
  "Hats",
] as const;