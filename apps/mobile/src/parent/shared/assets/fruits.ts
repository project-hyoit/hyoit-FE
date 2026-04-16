import { ImageSourcePropType } from "react-native";

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
  banana: require("@/assets/fruits/banana.jpg"),
  apple: require("@/assets/fruits/apple.jpg"),
  grape: require("@/assets/fruits/grape.jpg"),
  lemon: require("@/assets/fruits/lemon.jpg"),
  peach: require("@/assets/fruits/peach.jpg"),
  cherry: require("@/assets/fruits/cherry.jpg"),
  persimmon: require("@/assets/fruits/persimmon.jpg"),
  orange: require("@/assets/fruits/orange.jpg"),
};
