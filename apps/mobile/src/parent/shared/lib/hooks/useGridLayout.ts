import { useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { MEMORY_GAME } from "./../../config/constants";
export const useGridLayout = (cols: number) => {
  const { width } = useWindowDimensions();

  const tileSize = useMemo(() => {
    const usable = width - MEMORY_GAME.HPAD * 2 - MEMORY_GAME.GAP * (cols - 1);
    return Math.floor(usable / cols);
  }, [width, cols]);

  const getItemMargins = (index: number, totalItems: number) => {
    const rows = Math.ceil(totalItems / cols);
    const lastRowStart = (rows - 1) * cols;

    return {
      marginRight: index % cols !== cols - 1 ? MEMORY_GAME.GAP : 0,
      marginBottom: index < lastRowStart ? MEMORY_GAME.GAP : 0,
    };
  };

  return { tileSize, getItemMargins };
};
