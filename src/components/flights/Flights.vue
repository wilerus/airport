<template>
  <v-card>
    <v-card-title>
      Nutrition
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
    <v-data-table :headers="headers" :items="flightsData" :search="search" :loading="loading">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="text-xs-right">{{ props.item.iron }}</td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    computed: {
        headers(): any {
            return this.$store.state.FlightsStore.headers;
        },
        flightsData(): any {
            return this.$store.state.FlightsStore.flightsData;
        },
        loading(): any {
            return this.$store.state.FlightsStore.loading;
        },
        search(): any {
            return this.$store.state.FlightsStore.search;
        }
    },
    created() {
        this.$store.dispatch('updateFlightsData');
    }
});
</script>

<style>
</style>