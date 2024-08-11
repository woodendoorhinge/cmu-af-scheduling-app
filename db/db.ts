const Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
});
export const base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);
export const multEvents = process.env.NEXT_PUBLIC_MULTIPLE_EVENTS === "true";
