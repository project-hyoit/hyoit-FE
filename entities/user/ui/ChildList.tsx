import React from "react";
import { View } from "react-native";
import ChildCard from "./ChildCard";

interface Child {
  id: string;
  name: string;
  phone: string;
  isOnline?: boolean;
}

interface ChildListProps {
  children: Child[];
}

export default function ChildList({ children }: ChildListProps) {
  return (
    <View>
      {children.map((child) => (
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
