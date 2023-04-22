/*This should be done over axios or api call,
but I can't get the login to work correctly,
and so due to the lack of time, I fetched the data manually,
and put it in a json and fetch it from there.

Once the login works correctly the changes can be made here*/

import { writeFile, readFile } from "fs";

const path = "../../../data/persons.json";

export const updatePerson = (updates) => {
  readFile(path, (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);

    const parsedData = JSON.parse(data);

    for (let x = 0; x < parsedData.data.length; x++) {
      if (parsedData.data[x].id === +updates.id) {
        parsedData.data[x].phonePrivate = updates.phonePrivate;
        parsedData.data[x].street = updates.street;
        parsedData.data[x].addressAddition = updates.addressAddition;
        parsedData.data[x].zip = updates.zip;
        parsedData.data[x].city = updates.city;
        parsedData.data[x].country = updates.country;
        parsedData.data[x].sexId = updates.sexId;
        parsedData.data[x].statusId = updates.statusId;
        parsedData.data[x].campusId = updates.campusId;
      }
    }

    writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
        console.log("Failed to write updated data to file");
        return;
      }
      console.log("Updated file successfully");
    });
  });
};
