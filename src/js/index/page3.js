{
  let view = {
    el:'.page-3',
    init(){
      this.$el = $(this.el)
    },
    show(){
      this.$el.addClass('active')
    },
    hide(){
      this.$el.removeClass('active')
    }
  }
  let model={}
  let controller={
    init(view,model){
      this.view = view
      this.model = model
      this.view.init()
      this.bindEvents()
      this.bindEventHub()
    },
    bindEvents(){
      $('input#search').on('input',(e)=>{
        $('.page-3 .holder').html('')

        let timer;
        if(timer){
          window.clearInterval(timer)
        }
        timer = setTimeout(function(){
          timer = null

          let $input = $(e.currentTarget)
          let value = $input.val().trim()
          let value2 = $input.val()
          if(value === ''){
            $('#searchResult').empty()
            if(value2 ===''){
              $('.page-3 .holder').html('搜索歌曲、歌手')
            }
            return
          }
          var query1 = new AV.Query('Song')
          query1.contains('name',value)
          var query2 = new AV.Query('Song')
          query2.contains('singer',value)
          var query = AV.Query.or(query1,query2)
          query.find().then((results)=>{
            $('#searchResult').empty()
            if(results.length === 0){
              $('.page-3 .holder').html('')

              let $li = $(`
                <li>
                暂无搜索结果
                </li>`)
                $('#searchResult').append($li)
            }else{
              for(let i=0; i<results.length; i++){
                let song = results[i].attributes
                let $li = $(`
                <li data-song-id=${song.objectId}>
                <a href='./song.html?id=${results[i].id}'>
                ${song.name} - ${song.singer}
                </a>
                </li>
                `)
                $('#searchResult').append($li)
              }
            }         
          })
        },300)
      })
    },
    bindEventHub(){
      window.eventHub.on('selectedTab',(tabName)=>{
        if(tabName === 'page-3'){
          this.view.show()
        }else{
          this.view.hide()
        }
      })
    }
  }
  controller.init(view,model)
}