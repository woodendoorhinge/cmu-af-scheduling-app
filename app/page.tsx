import { getEvents } from "@/utils/db";
import SummaryPage from "./summary-page";
import EventPage from "./[eventSlug]/event-page";

export default async function Home() {
  const events = await getEvents();
  const sortedEvents = events.sort((a, b) => {
    return new Date(a.Start).getTime() - new Date(b.Start).getTime();
  });
  if (process.env.MULTIPLE_EVENTS === "true") {
    return <SummaryPage events={sortedEvents} />;
  } else {
    return <EventPage event={sortedEvents[0]} />;
  }
}
