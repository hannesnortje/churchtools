/*This should be done over axios or api call,
but I can't get the login to work correctly,
and so due to the lack of time, I fetched the data manually,
and put it in a json and fetch it from there.

Once the login works correctly the changes can be made here*/

import allPersons from "../../../data/persons.json" assert { type: "JSON" };

export const updatePerson = (id: string, field: string, value) => {
  for (let person of allPersons.data) {
    if (person.id === +id) {
    }
  }
  return;
};
