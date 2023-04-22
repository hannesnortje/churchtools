<template>
  <v-container class="bg-blue-darken-4">
    <v-row v-for="row in pageAssets" no-gutters>
      <v-col v-for="person in row" cols="12" sm="4">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card
              class="ma-2 pa-2"
              :color="isHovering ? 'blue-lighten-5' : undefined"
              v-bind="props"
              @click="navigateTo(`/person/${person.id}`)"
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
import { ref, onUpdated, onMounted } from "vue";
import { getPersons } from "@/composables/api/restfull/getPersons";

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
const assets = ref([]);

const numPages = ref();
const pageAssets = ref();
let startIndex;
let data;
let persons = getPersons.data;

const allCalculations = () => {
  numPages.value = Math.ceil((assets.value.length * props.numCol) / props.pageSize);

  startIndex = (pageNo.value - 1) * (props.pageSize / props.numCol);
  data = [...assets.value];
  pageAssets.value = data.splice(startIndex, props.pageSize / props.numCol);
};

const populateAssets = () => {
  let rowArray = [];
  for (let person of persons) {
    rowArray.push({
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      id: person.id,
    });
    if (
      rowArray.length === props.numCol ||
      assets.value.length * props.numCol === persons.length - 1
    ) {
      assets.value.push(rowArray);
      rowArray = [];
    }
  }
};

onMounted(() => {
  populateAssets();
  allCalculations();
});
</script>

<style scoped></style>
