import { router } from "expo-router";
import { ENTRY_ROUTES } from "../config/routes";

export type EntryTarget = "login" | "choose" | "parent" | "child";

export function navigateToTarget(target: EntryTarget) {
  switch (target) {
    case "login":
      router.replace(ENTRY_ROUTES.login);
      return;
    case "choose":
      router.replace(ENTRY_ROUTES.choose);
      return;
    case "parent":
      console.log("Go to parent app");
      return;
    case "child":
      console.log("Go to child app");
      return;
  }
}
