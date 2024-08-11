import SummaryPage from "./summary-page";
import EventPage from "./[eventSlug]/event-page";
import { getEvents } from "@/db/events";
import { multEvents } from "@/db/db";

export default async function Home() {
  const events = await getEvents();
  const sortedEvents = events.sort((a, b) => {
    return new Date(a.Start).getTime() - new Date(b.Start).getTime();
  });
  if (multEvents) {
    return <SummaryPage events={sortedEvents} />;
  } else {
    return <EventPage event={sortedEvents[0]} />;
  }
}
