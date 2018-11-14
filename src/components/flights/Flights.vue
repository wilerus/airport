<template>
  <v-card class="flight-container">
    <v-toolbar scroll-off-screen fixed height="52px" class="flights-toolbar">
      <v-toolbar-title>Расписание полётов</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="checkbox-container">
        <v-checkbox hide-details label="Вылетающие" v-model="showOutgoing"></v-checkbox>
        <v-checkbox hide-details label="Прилетающие" v-model="showIngoing"></v-checkbox>
        <v-checkbox hide-details label="Задержанные" v-model="showDelayed"></v-checkbox>
      </div>
    </v-toolbar>
    <v-card-title class="card-title">
      <v-text-field v-model="search" append-icon="search" label="Поиск" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :custom-filter="customFilter" :pagination.sync="pagination" :headers="headers" :items="flightsData" :search="search" :loading="loading">
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.number }}</td>
        <td>{{ props.item.time }}</td>
        <td>{{ props.item.destination }}</td>
        <td>{{ props.item.terminal }}</td>
        <td>{{ props.item.status }}</td>
        <td>{{ props.item.type }}</td>
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
import { TimelineData } from './FlightsStore';

export default Vue.extend({
    data() {
        return {
            search: '',
            pagination: {
                rowsPerPage: 5
            },
            selected: [],
            showOutgoing: true,
            showIngoing: true,
            showDelayed: true,
            filteredList: this.$store.state.FlightsStore.flightsData
        };
    },
    computed: {
        headers(): any {
            return this.$store.state.FlightsStore.headers;
        },
        flightsData(): TimelineData {
            return this.$store.state.FlightsStore.flightsData;
        },
        loading(): boolean {
            return this.$store.state.FlightsStore.loading;
        },
        pages(): number {
            return Math.ceil(this.filteredList.length / this.pagination.rowsPerPage);
        }
    },
    created() {
        this.$store.dispatch('updateFlightsData');
    },
    methods: {
        customFilter(items: TimelineData, search: string): any {
            search = search.toLowerCase();

            this.filteredList = items.filter(
                (item: any) =>
                    (this.showOutgoing || item.type !== 'Вылетает') &&
                    (this.showIngoing || item.type !== 'Прилетает') &&
                    (this.showDelayed || item.status !== 'Задержан') &&
                    (!search ||
                        Object.values(item).some((v: any) =>
                            v
                                .toString()
                                .toLowerCase()
                                .includes(search)
                        ))
            );

            return this.filteredList;
        }
    }
});
</script>

<style>
@media (max-width: 800px) and (min-width: 501px) {
    .flights-toolbar {
        height: 90px;
    }
    .flights-toolbar > .v-toolbar__content {
        display: flex;
        flex-direction: column;
    }
    .v-toolbar__title {
        margin-bottom: 1rem;
        height: 40px;
    }
    .card-title {
        margin-top: 50px;
    }
}
@media (max-width: 500px) {
    .flights-toolbar {
        height: 100px;
    }
    .flights-toolbar > .v-toolbar__content {
        display: flex;
        flex-direction: column;
    }
    .v-toolbar__title {
        height: 40px;
    }

    .card-title {
        margin-top: 60px;
    }
}
@media (min-width: 801px) {
    .card-title {
        margin-top: 20px;
    }
}
.flight-container {
    margin: 1rem;
}
.checkbox-container {
    display: flex;
    width: 100%;
    justify-content: space-around;
    flex-wrap: wrap;
}
.v-toolbar__title {
    width: 250px;
    flex: none;
}
.flights-toolbar .v-input {
    flex: none;
}
</style>