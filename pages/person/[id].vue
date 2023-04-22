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
        label="Vorname"
        style="min-height: 96px"
      ></v-text-field>
      <v-text-field
        v-model="person.lastName"
        variant="filled"
        color="deep-purple"
        label="Nachname"
        :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
        v-model="person.email"
        :rules="[rules.email]"
        variant="filled"
        color="deep-purple"
        label="E-Mail-Addresse"
        type="email"
      ></v-text-field>
      <v-text-field
        v-model="person.phonePrivate"
        variant="filled"
        color="deep-purple"
        label="Telefon"
      ></v-text-field>
      <v-text-field
        v-model="person.street"
        variant="filled"
        color="deep-purple"
        label="Straße"
        :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
        v-model="person.addressAddition"
        variant="filled"
        color="deep-purple"
        label="AdresseZusatz"
      ></v-text-field>
      <v-text-field
        v-model="person.zip"
        variant="filled"
        color="deep-purple"
        label="Postleitzahl"
        :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
        v-model="person.city"
        variant="filled"
        color="deep-purple"
        label="Stadt"
        :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
        v-model="person.country"
        variant="filled"
        color="deep-purple"
        label="Land"
        :rules="[rules.required]"
      ></v-text-field>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn variant="text" @click="$refs.form.reset()" v-if="!readonly"> Löschen </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="deep-purple-accent-4"> Bearbeiten </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { getPerson } from "@/composables/api/restfull/getPerson";
import { ref, onMounted, reactive } from "vue";
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
</script>

<style scoped></style>
