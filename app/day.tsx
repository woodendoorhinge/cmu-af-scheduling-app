"use client";
import { Session, Location } from "@/utils/db";
import { LocationCol } from "./location";
import { format } from "date-fns";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { getNumHalfHours, getPercentThroughDay } from "@/utils/utils";

export function DayCol(props: {
  sessions: Session[];
  locations: Location[];
  start: Date;
  end: Date;
}) {
  const { sessions, locations, start, end } = props;
  const percentThroughDay = getPercentThroughDay(
    new Date("2024-06-08T11:36-07:00"),
    start,
    end
  );
  const searchParams = useSearchParams();
  const locParams = searchParams.getAll("loc");
  const includedLocations = locationOrder.filter((loc) =>
    locParams.includes(loc)
  );
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold">{format(start, "EEEE, MMMM d")}</h2>
      <div
        className={clsx(
          "grid divide-x divide-gray-100 h-5/6",
          `grid-cols-[60px_repeat(${includedLocations.length},minmax(0,2fr))]`
        )}
      >
        <span className="p-1 border-b border-gray-100" />
        {includedLocations.map((locationName) => (
          <span
            key={locationName}
            className="text-sm p-1 border-b border-gray-100"
          >
            {locationName}
          </span>
        ))}
      </div>
      <div
        className={clsx(
          "grid divide-x divide-gray-100 relative",
          `grid-cols-[60px_repeat(${includedLocations.length},minmax(0,2fr))]`
        )}
      >
        {percentThroughDay < 100 && percentThroughDay > 0 && (
          <div
            className="bg-transparent w-full absolute border-b border-rose-600 flex items-end"
            style={{ height: `${percentThroughDay}%` }}
          >
            <span className="text-[10px] relative bg-rose-600 rounded-t px-2 text-white top-[1px]">
              now
            </span>
          </div>
        )}
        <TimestampCol start={start} end={end} />
        {includedLocations.map((locationName) => {
          const location = locations.find((loc) => loc.Name === locationName);
          if (!location) {
            return null;
          }
          return (
            <LocationCol
              key={location.Name}
              sessions={sessions.filter(
                (session) => session["Location name"][0] === location.Name
              )}
              start={start}
              end={end}
            />
          );
        })}
      </div>
    </div>
  );
}

function TimestampCol(props: { start: Date; end: Date }) {
  const { start, end } = props;
  const numHalfHours = getNumHalfHours(start, end);
  return (
    <div
      className={clsx(
        "grid h-full",
        `grid-rows-[repeat(${numHalfHours},minmax(0,1fr))]`
      )}
    >
      {Array.from({ length: numHalfHours }).map((_, i) => (
        <div
          key={i}
          className="border-b border-gray-100 text-[10px] p-1 text-right"
        >
          {format(new Date(start.getTime() + i * 30 * 60 * 1000), "h:mm a")}
        </div>
      ))}
    </div>
  );
}

export const locationOrder = [
  "Rat Park",
  "1E Main",
  "Gardens",
  "2B1",
  "B Ground Floor",
  "Old Restaurant",
] as string[];
