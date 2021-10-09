const vm = Vue.createApp({
    data() {
        return {
            data: [],
            currentPage: 0,
            locations: [],
            currentLocation:'',
        }
    },
    methods: {
        getUniqueList() {
            const locations = new Set();
            const vm  = this;
            vm.data.forEach((item,i) => {
                locations.add(item.Zone);
            })
            // console.log(locations);
            // vm.locations = Array.from(locations);
            vm.locations = [...locations];
        }
    },
    computed: {
        filterData() {
            const vm = this;
            //先過濾資料在處理分頁功能
            let items = [];
            if(vm.currentLocation !== '') {
                items = vm.data.filter((item,i) => {
                    return item.Zone == vm.currentLocation;
                })
            }else {
                items = vm.data;
            }
            // 有幾頁
            // 每頁的資料內容
            // newData = [[1..],[2..],[3..]]
            const newData = [];
            items.forEach((item,i)=> {
                //先建立每頁的空陣列
                if (i % 10 ===0) {
                    newData.push([]);
                }
                //建立每頁的內容
                const page = parseInt(i / 10);
                newData[page].push(item);
            })
            return newData;
        }
    },
    created() {
        const vm = this;
        axios.get('https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json')
        .then(function (response) {
            vm.data = response.data.result.records;
            vm.getUniqueList();
        })
    }
}).mount('#app');