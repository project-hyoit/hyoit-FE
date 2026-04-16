import { router } from "expo-router";
import { ENTRY_ROUTES } from "../config/routes";

export type EntryRouteTarget = keyof typeof ENTRY_ROUTES;

export function navigateToTarget(target: EntryRouteTarget) {
  router.replace(ENTRY_ROUTES[target]);
}
