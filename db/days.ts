import { CONSTS } from "@/utils/constants";
import { base } from "./db";
import { Session } from "./sessions";

export type Day = {
  Start: string;
  End: string;
  "Start bookings": string;
  "End bookings": string;
  "Event name"?: string;
  Event?: string[];
  ID: string;
  Sessions: Session[];
};
export async function getDays() {
  const days: Day[] = [];
  const fieldsToFetch = ["Start", "End", "Start bookings", "End bookings"];
  CONSTS.MULTIPLE_EVENTS && fieldsToFetch.push("Event name", "Event");
  await base("Days")
    .select({
      fields: fieldsToFetch,
    })
    .eachPage(function page(records: any, fetchNextPage: any) {
      records.forEach(function (record: any) {
        days.push({ ...record.fields, Sessions: [], ID: record.id });
      });
      fetchNextPage();
    });
  const sortedDays = days.sort((a, b) => {
    return new Date(a.Start).getTime() - new Date(b.Start).getTime();
  });
  return sortedDays;
}

export async function getDaysByEvent(eventName: string) {
  const days: Day[] = [];
  const filterFormula = CONSTS.MULTIPLE_EVENTS
    ? `{Event name} = "${eventName}"`
    : "1";
  const fieldsToFetch = ["Start", "End", "Start bookings", "End bookings"];
  CONSTS.MULTIPLE_EVENTS && fieldsToFetch.push("Event name", "Event");
  await base("Days")
    .select({
      fields: fieldsToFetch,
      filterByFormula: filterFormula,
    })
    .eachPage(function page(records: any, fetchNextPage: any) {
      records.forEach(function (record: any) {
        days.push({ ...record.fields, Sessions: [], ID: record.id });
      });
      fetchNextPage();
    });
  const sortedDays = days.sort((a, b) => {
    return new Date(a.Start).getTime() - new Date(b.Start).getTime();
  });
  return sortedDays;
}
