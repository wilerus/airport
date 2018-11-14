import jsonData from '../../data/FlightsData.json';

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
            { text: 'Тип', value: 'number' },
            {
                text: 'Время',
                value: 'time'
            },
            { text: 'Место назначения', value: 'destination' },
            { text: 'Терминал', value: 'terminal' },
            { text: 'Статус', value: 'status' },
            { text: 'Тип', value: 'type' }
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
                        resolve(jsonData);
                    }, 800);
                });
                commit('loadFlightsData', data);
            } finally {
                commit('setLoading', false);
            }
        }
    }
};

export { TimelineData };

export default store;
