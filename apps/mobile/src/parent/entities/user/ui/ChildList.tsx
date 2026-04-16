import { View } from "react-native";
import type { ChildUser } from "../model/types";
import ChildCard from "./ChildCard";

interface ChildListProps {
  items?: ChildUser[];
}

export default function ChildList({ items = [] }: ChildListProps) {
  return (
    <View>
      {items.map((child) => (
        <ChildCard
          key={child.id}
          name={child.name}
          phone={child.phone}
          isOnline={child.isOnline}
        />
      ))}
    </View>
  );
}
