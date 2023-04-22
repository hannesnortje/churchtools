/*This should be done over axios or api call,
but I can't get the login to work correctly,
and so due to the lack of time, I fetched the data manually,
and put it in a json and fetch it from there.

Once the login works correctly the changes can be made here*/

import fields from "../../../data/fields.json" assert { type: "JSON" };

export const getStations = fields.data[33].options;
