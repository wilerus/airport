<template>

  <v-card class="flight-container">
      <v-toolbar>
            <v-toolbar-title>Расписание полётов</v-toolbar-title>
            <v-spacer></v-spacer>
      <v-checkbox
        label="Вылетающие"
        v-model="showOutgoing"
      ></v-checkbox>
      <v-checkbox
        label="Прилетающие"
       v-model="showIngoing"
      ></v-checkbox>
<v-checkbox
        label="Задержанные"
       v-model="showDelayed"
      ></v-checkbox>
          </v-toolbar>
    <v-card-title>
      <v-text-field v-model="search" append-icon="search" label="Поиск" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :custom-filter="customFilter" :pagination.sync="pagination" :headers="headers" :items="flightsData" :search="search" :loading="loading">
    <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td >{{ props.item.time }}</td>
        <td >{{ props.item.destination }}</td>
        <td >{{ props.item.terminal }}</td>
        <td >{{ props.item.status }}</td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Ваш поиск "{{ search }}" не выдал результатов.
      </v-alert>
    </v-data-table>
          <div class="text-xs-center pt-2">
        <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
      </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    data() {
        return {
            search: '',
            pagination: {},
            selected: [],
            showOutgoing: true,
            showIngoing: true,
            showDelayed: true
        };
    },
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
        pages(): any {
            //@ts-ignore
            return Math.ceil(this.$store.state.FlightsStore.flightsData.legnth / this.pagination.rowsPerPage);
        }
    },
    created() {
        this.$store.dispatch('updateFlightsData');
    },
    methods: {
        //@ts-ignore
        customFilter(items, search, filter): any {
            search = search.toString().toLowerCase();

            return items.filter(
                (item: any) =>
                    (this.showOutgoing || item.status !== 'Вылетает') && (this.showIngoing || item.status !== 'Прилетает') && (this.showDelayed || item.status !== 'Задержан')
            );
        }
    }
});
</script>

<style>
.flight-container {
    margin: 1rem;
}
</style>