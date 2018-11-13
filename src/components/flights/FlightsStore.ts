type ChartState = {
    search: string,
    headers: any,
    loading: boolean,
    flightsData: TimelineData | []
};

type TimelineItem = {
    time: Date,
    destination: string,
    terminal: string,
    status: string
};

type TimelineData = Array<TimelineItem>;

type ChartStore = {
    state: ChartState,
    mutations: {
        loadFlightsData(state: ChartState, flightsData: TimelineData): void,
        setLoading(state: ChartState, isLoading: boolean): void
    },
    actions: {
        updateFlightsData(data: any): void
    }
};

const store: ChartStore = {
    state: {
        search: '',
        loading: false,
        headers: [
            {
                text: 'Время',
                align: 'left',
                sortable: false,
                value: 'time'
            },
            { text: 'Место назначения', value: 'destination' },
            { text: 'Терминал', value: 'terminal' },
            { text: 'Статус', value: 'status' }
        ],
        flightsData: []
    },

    mutations: {
        loadFlightsData(state: ChartState, flightsData: TimelineData) {
            state.flightsData = flightsData;
        },
        setLoading(state: ChartState, isLoading: boolean) {
            state.loading = isLoading;
        }
    },

    actions: {
        updateFlightsData: async function({ commit }: any) {
            commit('setLoading', true);
            try {
                const data = await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve([
                            {
                                value: false,
                                name: 'Frozen Yogurt',
                                calories: 159,
                                fat: 6.0,
                                carbs: 24,
                                protein: 4.0,
                                iron: '1%'
                            },
                            {
                                value: false,
                                name: 'Ice cream sandwich',
                                calories: 237,
                                fat: 9.0,
                                carbs: 37,
                                protein: 4.3,
                                iron: '1%'
                            },
                            {
                                value: false,
                                name: 'Eclair',
                                calories: 262,
                                fat: 16.0,
                                carbs: 23,
                                protein: 6.0,
                                iron: '7%'
                            },
                            {
                                value: false,
                                name: 'Cupcake',
                                calories: 305,
                                fat: 3.7,
                                carbs: 67,
                                protein: 4.3,
                                iron: '8%'
                            },
                            {
                                value: false,
                                name: 'Gingerbread',
                                calories: 356,
                                fat: 16.0,
                                carbs: 49,
                                protein: 3.9,
                                iron: '16%'
                            },
                            {
                                value: false,
                                name: 'Jelly bean',
                                calories: 375,
                                fat: 0.0,
                                carbs: 94,
                                protein: 0.0,
                                iron: '0%'
                            },
                            {
                                value: false,
                                name: 'Lollipop',
                                calories: 392,
                                fat: 0.2,
                                carbs: 98,
                                protein: 0,
                                iron: '2%'
                            },
                            {
                                value: false,
                                name: 'Honeycomb',
                                calories: 408,
                                fat: 3.2,
                                carbs: 87,
                                protein: 6.5,
                                iron: '45%'
                            },
                            {
                                value: false,
                                name: 'Donut',
                                calories: 452,
                                fat: 25.0,
                                carbs: 51,
                                protein: 4.9,
                                iron: '22%'
                            },
                            {
                                value: false,
                                name: 'KitKat',
                                calories: 518,
                                fat: 26.0,
                                carbs: 65,
                                protein: 7,
                                iron: '6%'
                            }
                        ]);
                    }, 300);
                });
                commit('loadFlightsData', data);
            } finally {
                commit('setLoading', false);
            }
        }
    }
};

export default store;
