import type {
  CheckInRawItem,
  CheckInViewerRole,
} from "../model/types";

type CreateCheckInParams = {
  senderRole: CheckInViewerRole;
  message: string;
  id: string;
  createdAt: string;
};

type SendCheckInParams = CreateCheckInParams & {
  items: CheckInRawItem[];
};

type SendCheckInResult = {
  items: CheckInRawItem[];
  sentItem: CheckInRawItem | null;
};

type ConfirmCheckInParams = {
  items: CheckInRawItem[];
  itemId: string;
  viewerRole: CheckInViewerRole;
  checkedAt: string;
};

type ConfirmCheckInResult = {
  items: CheckInRawItem[];
  confirmedItem: CheckInRawItem | null;
};
const getReceiverRole = (
  senderRole: CheckInViewerRole,
): CheckInViewerRole => (senderRole === "parent" ? "child" : "parent");

export const createCheckIn = ({
  senderRole,
  message,
  id,
  createdAt,
}: CreateCheckInParams): CheckInRawItem | null => {
  const normalizedMessage = message.trim();
  if (!normalizedMessage) return null;

  return {
    id,
    senderRole,
    receiverRole: getReceiverRole(senderRole),
    message: normalizedMessage,
    type: "QUESTION",
    createdAt,
  };
};

export const sendCheckIn = ({
  items,
  ...params
}: SendCheckInParams): SendCheckInResult => {
  const sentItem = createCheckIn(params);
  if (!sentItem) return { items, sentItem: null };

  return {
    items: [sentItem, ...items],
    sentItem,
  };
};
const markCheckInAsChecked = ({
  items,
  itemId,
  viewerRole,
  checkedAt,
}: ConfirmCheckInParams): CheckInRawItem[] => {
  const targetIndex = items.findIndex((item) => item.id === itemId);
  if (targetIndex < 0) return items;

  const target = items[targetIndex];
  if (target.receiverRole !== viewerRole || target.checkedAt) return items;

  const nextItems = [...items];
  nextItems[targetIndex] = {
    ...target,
    checkedAt,
  };

  return nextItems;
};

export const confirmCheckIn = (
  params: ConfirmCheckInParams,
): ConfirmCheckInResult => {
  const nextItems = markCheckInAsChecked(params);
  if (nextItems === params.items) {
    return { items: params.items, confirmedItem: null };
  }

  const confirmedItem =
    nextItems.find((item) => item.id === params.itemId) ?? null;

  return { items: nextItems, confirmedItem };
};
