// pages/talior_avatar/talior_avatar.js
import WeCropper from '../../tailor/we-cropper/dist/we-cropper.js'

//获取设备信息
const device = wx.getSystemInfoSync()
const width = device.windowWidth
if (device.windowHeight <= 688) {
  console.log(1)
  var height = device.windowHeight - 100
} else if (device.windowHeight > 954) {
  console.log(2)
  var height = device.windowHeight - 300
} else {
  console.log(3)
  var height = device.windowHeight - 200
}
var copper = {}

Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300 - 48 - 50) / 2,
        width: 300,
        height: 300
      }
    }
  },
  touchStart(e) {
    copper.touchStart(e)
  },
  touchMove(e) {
    copper.touchMove(e)
  },
  touchEnd(e) {
    copper.touchEnd(e)
  },
  //点击使用
  getCropperImage() {
    let that = this;
    copper.getCropperImage((avatar) => {
      if (avatar) {
        wx.showToast({
          title: avatar,
          icon:'none'
        })
        console.log(avatar)
        //拿到图片之后，返回头像展示页面
      } else {
        console.log('获取图片失败，请稍后重试')
      }
    })
  },
  uploadTap() {
    const self = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        let src = res.tempFilePaths[0]
        // 获取裁剪图片资源后，给data添加src属性及其值
        copper.pushOrign(src)
      }
    })
  },
  onLoad(option) {
    // console.log("option.src")
    // console.log(option.src)
    // // do something
    //这只是一张测试图片
    option = {
      src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582692128790&di=71f847d789175eaf619ada1d45a47f0d&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F21%2F09%2F01200000026352136359091694357.jpg'
    }
    const {
      cropperOpt
    } = this.data
    const {
      src
    } = option
    if (src) {
      Object.assign(cropperOpt, { src })
      copper = new WeCropper(cropperOpt)
        .on('ready', function (ctx) { })
        .on('beforeImageLoad', (ctx) => {
          wx.showToast({
            title: '上传中',
            icon: 'loading',
            duration: 3000
          })
        })
        .on('imageLoad', (ctx) => {
          wx.hideToast()
        })
    }
  }
})