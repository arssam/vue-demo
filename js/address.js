new Vue({
    //模型
    data: {
        limitNum:3,
        addressList:[],
        currentIndex:0,
        shoppingMethod:1
    },
    computed: {
        filterAddress(){
            return this.addressList.slice(0,this.limitNum)
        }
    },
    mounted(){
        this.$nextTick(() => {
            this.getAddressList()
        })
    },
    methods: {
        getAddressList(){
            axios.get('data/address.json')
                .then(res => {
                    this.addressList = res.data.result
                })
                .catch(err => {

                })
        },
        loadMore(){
            this.limitNum = this.addressList.length
        },
        setDefault(addressId){
            this.addressList.forEach((address,index) => {
                if(address.addressId == addressId){
                    address.isDefault = true
                }else {
                    address.isDefault = false
                }
            })
        }
    }
}).$mount('.container')