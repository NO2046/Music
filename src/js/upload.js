{
  let view = {
    el:'.bigWrapper',
    find(selector){
      return $(this.el).find(selector)[0]
      ///第0项是dom对象
    }
  }
  let model = {}
  let controller = {
    init(view,model){
      this.view = view
      this.model = model
      this.initQiniu()
    },
    initQiniu(){
      var uploader = Qiniu.uploader({
        runtimes: 'html5',      // 上传模式，依次退化
        browse_button: this.view.find('#upLoad'),         // 上传选择的点选按钮，必需
        uptoken_url: 'http://localhost:8888/uptoken',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
        get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
        domain: 'p44nh0td5.bkt.clouddn.com',     // bucket域名，下载资源时用到，必需
        max_file_size: '100mb',             // 最大文件体积限制
        dragdrop: true,                     // 开启可拖曳上传
        drop_element:  this.view.find('#upLoad-wrapper'),          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
            'FilesAdded': function (up, files) {
                plupload.each(files, function (file) {
                    // 文件添加进队列后，处理相关的事情
                });
            },
            'BeforeUpload': function (up, file) {
                // 每个文件上传前，处理相关的事情
            },
            'UploadProgress': function (up, file) {
                // 每个文件上传时，处理相关的事情
                //uploadStatus.textContent = "上传中"
            },
            'FileUploaded': function (up, file, info) {
                // 每个文件上传成功后，处理相关的事情
                // 其中info.response是文件上传成功后，服务端返回的json，形式如：
                // {
                //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                //    "key": "gogopher.jpg"
                //  }
                // 查看简单反馈
                var domain = up.getOption('domain');
                var response = JSON.parse(info.response);
                var sourceLink = 'http://' + domain + '/' + encodeURIComponent(response.key)
                //uploadStatus.textContent = 上传完毕
                window.eventHub.emit('upload',{
                    url:sourceLink,
                    name:response.key
                })

            },
            'Error': function (up, err, errTip) {
                //上传出错时，处理相关的事情
            },
            'UploadComplete': function () {
                //队列文件处理完毕后，处理相关的事情
            },

        }
    });
    }
  }
  controller.init(view,model)
}