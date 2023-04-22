<template>
  <v-container class="bg-blue-darken-4">
    <v-select
      v-model="statusFilter"
      label="Filtern nach Status"
      :items="
        statuses.map((item) => {
          return item.name;
        })
      "
      @update:modelValue="mechanics"
    ></v-select>
    <v-row v-for="row in pageAssets" no-gutters>
      <v-col v-for="person in row" cols="12" sm="4">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card
              class="ma-2 pa-2"
              :color="isHovering ? 'blue-lighten-5' : undefined"
              v-bind="props"
              @click="navigateTo(`/person/${person.id}`)"
              @person="personData"
            >
              <v-card-item>
                <div>
                  <div class="text-h6 mb-1">{{ person.lastName }}</div>
                  <div class="mb-1">{{ person.firstName }}</div>
                  <a style="color: blue">{{ person.email }}</a>
                </div>
              </v-card-item>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
    <v-pagination v-model="pageNo" :length="numPages" @click="allCalculations"></v-pagination>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getPersons } from "@/composables/api/restfull/getPersons";
import { getStatuses } from "~/composables/api/restfull/getStatuses";
import { Fields } from "@/utils/enums";

const props = defineProps({
  pageSize: {
    type: Number,
    default: 6,
  },
  numCol: {
    type: Number,
    default: 3,
  },
});

const pageNo = ref(1);
const assets = ref();

const numPages = ref();
const pageAssets = ref();
let startIndex;
let data;
let persons = getPersons.data;

const statuses = getStatuses;

const statusFilter = ref(null);

const allCalculations = () => {
  numPages.value = Math.ceil((assets.value.length * props.numCol) / props.pageSize);

  startIndex = (pageNo.value - 1) * (props.pageSize / props.numCol);
  data = [...assets.value];
  pageAssets.value = data.splice(startIndex, props.pageSize / props.numCol);
};

const filteredData = () => {
  return persons.filter((curr) => {
    for (const status of statuses) {
      if (statusFilter.value) {
        if (status.name === statusFilter.value && +status.id === curr.statusId) return true;
      } else {
        return true;
      }
    }
  });
};

const populateAssets = () => {
  assets.value = [];
  data = null;
  let rowArray = [];
  for (let person of filteredData()) {
    rowArray.push({
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      id: person.id,
    });
    if (
      rowArray.length === props.numCol ||
      assets.value.length * props.numCol === filteredData().length - 1
    ) {
      assets.value.push(rowArray);
      rowArray = [];
    }
  }
};

onMounted(() => {
  mechanics();
});

const mechanics = () => {
  populateAssets();
  allCalculations();
};

//emit changes that comes in, can be omitted when persistent
const personData = (data) => {
  for (let x = 0; x < persons.length; x++) {
    if (persons[x].id === +data.id) {
      persons[x].phonePrivate = data.phonePrivate;
      persons[x].street = data.street;
      persons[x].addressAddition = data.addressAddition;
      persons[x].zip = data.zip;
      persons[x].city = data.city;
      persons[x].country = data.country;
      persons[x].sexId = data.sexId;
      persons[x].statusId = data.statusId;
      persons[x].campusId = data.campusId;
    }
  }
};
</script>

<style scoped></style>
