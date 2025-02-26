import { CakeIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export type NavItem = {
  name: string;
  href: string;
  icon: any;
};

export const CONSTS = {
  TITLE: "Agent Foundations 2025 at CMU",
  DESCRIPTION:
    "Agent Foundations 2025 at CMU is taking place March 3-7, 2025. Check out the schedule below!",
  MULTIPLE_EVENTS: false,
  // If you have multiple events, add your events to the nav bar below
  // If you only have one event, you can leave the array empty
  // Find available icons at https://heroicons.com/
  NAV_ITEMS: [
    { name: "Conference", href: "/Conference", icon: UserGroupIcon }
  ] as NavItem[],
};
