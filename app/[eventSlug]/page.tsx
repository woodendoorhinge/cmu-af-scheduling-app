import { getEventByName } from "@/db/events";
import EventPage from "./event-page";

export default async function Page(props: { params: { eventSlug: string } }) {
  const { eventSlug } = props.params;
  const eventName = eventSlug.replace(/-/g, " ");
  const event = await getEventByName(eventName);
  return <EventPage event={event} />;
}
