new Vue({
    data: {
        totalMoney:0,  //单个商品总金额
        checkAllFrag: false,  //是否全选
        productList:[], //商品列表
        delFlag: false,
        curProduct:[]
    },
    //商品金额的局部过滤器
    filters: {
        formatMoney(value){
            return '$ ' + value.toFixed(2)
        }
    },
    //mounted表示vue实例已完成
    mounted(){
        this.cartView()
    },
    methods: {
        //调用接口
        cartView(){
            axios.get('data/cart.json')
                .then(res => {
                    this.productList = res.data.result.productList
                    // this.totleMoney = res.data.result.totalMoney
                })
                .catch(err => console.log(err))
        },
        //改变数量
        changeMoney(item,num){
            if(num === 1){
                item.productQuentity++
            }else {
                item.productQuentity--
                if(item.productQuentity < 1){
                    item.productQuentity = 1
                }
            }
            this.calcTotalPrice()
        },
        //选择商品
        selectedProduct(item){
            if(typeof item.checked == 'undefined'){
                //Vue.set(item,'checked',true)  //全局注册
                this.$set(item,'checked',true) //局部注册
            }else {
                item.checked = !item.checked
            }
            this.calcTotalPrice()
        },
        //全选和取消全选
        checkAll(flag){
            this.checkAllFrag = flag
            this.productList.forEach((item,index) => {
                if(typeof item.checked == 'undefined'){
                    this.$set(item,'checked',this.checkAllFrag) //局部注册
                }else {
                    item.checked = this.checkAllFrag
                }
            })
            this.calcTotalPrice()
        },
        //计算总金额
        calcTotalPrice(){
            this.totalMoney = 0
            this.productList.forEach((item,index) => {
                if(item.checked){
                    this.totalMoney += item.productQuentity*item.productPrice
                }
            })
        },
        //点击删除按钮
        delConfirm(item){
            this.delFlag = true
            this.curProduct = item
        },
        //确认删除商品
        delProduct(){
            let index = this.productList.indexOf(this.curProduct)
            this.productList.splice(index,1)
            this.delFlag = false
        }
    }
}).$mount('#app')
//商品总金额的全局过滤器
Vue.filter('money',(value,type) => {return '$ ' + value.toFixed(2) + type})