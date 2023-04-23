/*This should be done over axios or api call,
but I can't get the login to work correctly,
and so due to the lack of time, I fetched the data manually,
and put it in a json and fetch it from there.

Once the login works correctly the changes can be made here*/

import allPersons from "../../../data/persons.json" assert { type: "JSON" };
import { getStatuses } from "~/composables/api/restfull/getStatuses";

/* This should also be replaced by an axios api call like
 axios.get(https://jobs.church.tools/api/persons) */
export const getPersons = allPersons;

/* This should also be replaced by an axios api call like
 axios.get(https://jobs.church.tools/api/persons?statusId=1) */
export const paginatedPersons = (statusFilter) => {
  return allPersons.data.filter((curr) => {
    for (const status of getStatuses) {
      if (statusFilter) {
        if (status.name === statusFilter && +status.id === curr.statusId) return true;
      } else {
        return true;
      }
    }
  });
};
