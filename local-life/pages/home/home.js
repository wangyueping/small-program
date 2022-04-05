// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [],
        gridList: [],
        timer: 0,
        isLoading: false
    },

    // 获取轮播图数据
    getSwiperList() {
        wx.request({
            url: 'https://www.escook.cn/slides',
            method: 'GET',
            success: (result) => {
                this.setData({
                    swiperList: result.data
                })
            },
            fail: (res) => {
                console.log(res.errMsg)
            },
        })
    },

    // 获取九宫格数据
    getGridList() {
        wx.request({
            url: 'https://www.escook.cn/categories',
            method: 'GET',
            success: (result) => {
                // console.log(result.data)
                this.setData({
                    gridList: result.data
                })
            },
            fail: (res) => {
                console.log(res.errMsg)
            },
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getSwiperList();
        this.getGridList();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})