import type { ImageSourcePropType } from "react-native";

import appleImg from "@/assets/fruits/apple.jpg";
import bananaImg from "@/assets/fruits/banana.jpg";
import cherryImg from "@/assets/fruits/cherry.jpg";
import grapeImg from "@/assets/fruits/grape.jpg";
import lemonImg from "@/assets/fruits/lemon.jpg";
import orangeImg from "@/assets/fruits/orange.jpg";
import peachImg from "@/assets/fruits/peach.jpg";
import persimmonImg from "@/assets/fruits/persimmon.jpg";

export const FRUITS = [
  "banana",
  "apple",
  "grape",
  "lemon",
  "peach",
  "cherry",
  "persimmon",
  "orange",
] as const;

export type FruitKey = (typeof FRUITS)[number];

export const fruitSrc: Record<FruitKey, ImageSourcePropType> = {
  banana: bananaImg,
  apple: appleImg,
  grape: grapeImg,
  lemon: lemonImg,
  peach: peachImg,
  cherry: cherryImg,
  persimmon: persimmonImg,
  orange: orangeImg,
};
