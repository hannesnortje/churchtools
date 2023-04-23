<template>
  <v-card class="mx-auto" style="max-width: 500px">
    <v-toolbar color="blue-darken-4" cards dark flat>
      <v-btn icon @click="navigateTo(`/`)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-card-title class="text-h6 font-weight-regular"> zurück zu allen Personen </v-card-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form ref="form" v-model="form" class="pa-4 pt-6" :readonly="readonly">
      <v-text-field
        v-model="person.firstName"
        variant="filled"
        :rules="[rules.required]"
        color="deep-purple"
        :label="Fields.firstName"
        style="min-height: 96px"
        :readonly="true"
      ></v-text-field>
      <v-text-field
        v-model="person.lastName"
        variant="filled"
        color="deep-purple"
        :label="Fields.lastName"
        :rules="[rules.required]"
        :readonly="true"
      ></v-text-field>
      <v-text-field
        v-model="person.email"
        :rules="[rules.email]"
        variant="filled"
        color="deep-purple"
        :label="Fields.email"
        type="email"
        :readonly="true"
      ></v-text-field>
      <v-text-field
        v-model="person.phonePrivate"
        variant="filled"
        color="deep-purple"
        :label="Fields.phonePrivate"
        @update:modelValue="changes(Fields.phonePrivate, $event)"
      ></v-text-field>
      <v-text-field
        v-model="person.street"
        variant="filled"
        color="deep-purple"
        :label="Fields.street"
        :rules="[rules.required]"
        @update:modelValue="changes(Fields.street, $event)"
      ></v-text-field>
      <v-text-field
        v-model="person.addressAddition"
        variant="filled"
        color="deep-purple"
        :label="Fields.addressAddition"
        @update:modelValue="changes(Fields.addressAddition, $event)"
      ></v-text-field>
      <v-text-field
        v-model="person.zip"
        variant="filled"
        color="deep-purple"
        :label="Fields.zip"
        :rules="[rules.required]"
        @update:modelValue="changes(Fields.zip, $event)"
      ></v-text-field>
      <v-text-field
        v-model="person.city"
        variant="filled"
        color="deep-purple"
        :label="Fields.city"
        :rules="[rules.required]"
        @update:modelValue="changes(Fields.city, $event)"
      ></v-text-field>
      <v-text-field
        v-model="person.country"
        variant="filled"
        color="deep-purple"
        :label="Fields.country"
        :rules="[rules.required]"
        @update:modelValue="changes(Fields.country, $event)"
      ></v-text-field>
      <v-select
        :label="Fields.sexId"
        :value="setGender(person.sexId)"
        :items="
          getGenders.map((item) => {
            return item.name;
          })
        "
        @update:modelValue="changes(Fields.sexId, $event)"
      ></v-select>
      <v-select
        :label="Fields.statusId"
        :value="setStatus(person.statusId)"
        :items="
          getStatuses.map((item) => {
            return item.name;
          })
        "
        @update:modelValue="changes(Fields.statusId, $event)"
      ></v-select>
      <v-select
        :label="Fields.campusId"
        :value="setStation(person.campusId)"
        :items="
          getStations.map((item) => {
            return item.name;
          })
        "
        @update:modelValue="changes(Fields.campusId, $event)"
      ></v-select>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn variant="text" @click="navigateTo(`/`)" v-if="!readonly"> Zurücksetzen </v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="readonly = !readonly" v-if="readonly"> Bearbeiten </v-btn>
      <v-btn @click="submit()" v-if="!readonly"> Fertig </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { getPerson } from "@/composables/api/restfull/getPerson";
import { getGenders } from "~/composables/api/restfull/getGenders";
import { getStatuses } from "~/composables/api/restfull/getStatuses";
import { getStations } from "~/composables/api/restfull/getStations";
import { updatePerson } from "~/composables/api/restfull/updatePerson";
import { Fields } from "@/utils/enums";
import { ref, reactive } from "vue";
const { id } = await useRoute().params;

const person = ref(getPerson(id));
const form = ref(false);
const rules = reactive({
  email: (v) => !!(v || "").match(/@/) || "Please enter a valid email",
  length: (len) => (v) => (v || "").length >= len || `Invalid character length, required ${len}`,
  password: (v) =>
    !!(v || "").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
    "Password must contain an upper case letter, a numeric character, and a special character",
  required: (v) => !!v || "This field is required",
});

const readonly = ref(true);

const setGender = (id: number) => {
  for (const gender of getGenders) {
    if (id === +gender.id) return gender.name;
  }
};

const setStatus = (id: number) => {
  for (const status of getStatuses) {
    if (id === +status.id) return status.name;
  }
};

const setStation = (id: number) => {
  for (const station of getStations) {
    if (id === +station.id) return station.name;
  }
};

const changes = (label: any, $event: any) => {
  person[Object.keys(Fields)[Object.values(Fields).indexOf(label)]] = $event;
};

/*Persistent change should be done with the following methods executing
the respective api method, but since the Restful api is not working, I
don't have to time to work on an alternative.*/

const emit = defineEmits(["person"]);

const submit = () => {
  //updatePerson(person); // for api call if worked
  emit("person", person);
  readonly.value = !readonly.value;
};
</script>

<style scoped></style>
