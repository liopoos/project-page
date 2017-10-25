Vue.component('card-item', {
    template: '#card-item',
    props: ['title', 'desc', 'icon', 'time', 'url', 'color'],
})

var vm = new Vue({
    el: '#card',
    data: {
        itemArr: [],
        moreText: "加载更多",
        page: 1,
        count: 9,
        loading: true,
        isMore: false
    },
    created: function() {
        setTimeout("vm.requestData()", 1000)
    },
    methods: {
        requestData() {
            var arr = []
            this.$http.get(
                'get.php', {
                    params: {
                        page: this.page,
                        count: this.count
                    }
                }
            ).then(res => {
                if (res.data.code == 200) {
                    for (let i = 0; i < res.data.data.length; i++) {
                        this.itemArr.push(res.data.data[i])
                    }
                    this.page++
                    this.isMore = true
                } else {
                    this.moreText = "暂无更多"
                    this.isMore = false
                }
                this.loading = false
            }, response => {
                console.log("error")
            })
        },
        loadMoreData() {
            vm.$data.loading = true
            setTimeout("vm.requestData()", 1000)
        }
    }
})
