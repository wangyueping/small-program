// pages/shopList/shopList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        query: {},
        page: 1,
        pageSize: 10,
        count: 0,
        shopList: [],
        isLoading: false,
        isFinished: false
    },

    // 获取商品列表数据
    getShopList(isFirst = false, fn = null) {
        // fn : 判断是否需要传入停止下拉刷新的方法
        if (isFirst) {
            wx.showLoading({
                title: '数据加载中...',
            })
        }

        this.setData({
            isLoading: true
        })
        wx.request({
            url: `https://www.escook.cn/categories/${this.data.query.id}/shops`,
            method: 'GET',
            data: {
                _page: this.data.page,
                _limit: this.data.pageSize
            },
            success: (result) => {
                // console.log(result)
                this.setData({
                    shopList: [...this.data.shopList, ...result.data],
                    count: result.header['X-Total-Count'] - 0
                })
            },
            complete: (result) => {
                if (isFirst) {
                    wx.hideLoading()
                }

                this.setData({
                    isLoading: false
                })
                fn && fn()
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
                query: options
            }),
            // console.log(this.data.query)
            this.getShopList(true)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.setNavigationBarTitle({
            title: this.data.query.name,
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData({
            page: 1,
            shopList: [],
            isFinished: false
        })
        this.getShopList(false, () => {
            wx.stopPullDownRefresh()
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.page * this.data.pageSize >= this.data.count) {
            this.setData({
                isFinished: true
            })
            return
        }
        // 防抖：防止用户多次下拉发起请求
        if (this.data.isLoading) return
        this.setData({
            page: this.data.page + 1
        })
        this.getShopList()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})