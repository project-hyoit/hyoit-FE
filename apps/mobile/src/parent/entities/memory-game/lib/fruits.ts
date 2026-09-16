import type { ImageSourcePropType } from "react-native";

import appleImg from "@/assets/images/fruits/apple.jpg";
import bananaImg from "@/assets/images/fruits/banana.jpg";
import cherryImg from "@/assets/images/fruits/cherry.jpg";
import grapeImg from "@/assets/images/fruits/grape.jpg";
import lemonImg from "@/assets/images/fruits/lemon.jpg";
import orangeImg from "@/assets/images/fruits/orange.jpg";
import peachImg from "@/assets/images/fruits/peach.jpg";
import persimmonImg from "@/assets/images/fruits/persimmon.jpg";

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
