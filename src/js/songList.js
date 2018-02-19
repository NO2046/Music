{
  let view = {
    el:'.songList',
    template:`
      <ol>
      </ol>
    `,
    activeItem(li){
      let $li = $(li)
        $li.addClass('active').siblings('.active').removeClass('active')
    },
    render(data){
      let $el = $(this.el)
      $el.html(this.template)
      let {songs}= data
      let liList = songs.map((song)=>$('<li></li>').text(song.name).attr('data-song-id',song.id))
      $el.find('ol').empty()
      liList.map((domLi)=>{
        $el.find('ol').append(domLi)
      })
    }
  }
  let model ={
    data:{
      songs:[]
    },
    find(){
      var query = new AV.Query('Song')
      return query.find().then((songs)=>{
        //把 find 返回的 promise return 出去
        this.data.songs = songs.map((song)=>{
          return {id:song.id,...song.attributes}
        })
        return songs
        //promise 的 要 return
      })
    }
  }
  let controller={
    init(){
      this.view = view
      this.model= model
      this.bindEvents()
      this.bindEventHub()
      this.view.render(this.model.data)
      this.getAllSongs()    
    },
    getAllSongs(){
      this.model.find().then(()=>{
        this.view.render(this.model.data)
      })
    },
    bindEvents(){
      $(this.view.el).on('click','li',(e)=>{
        this.view.activeItem(e.currentTarget)
        let songId = e.currentTarget.getAttribute('data-song-id')
        window.eventHub.emit('select',{id:songId})
      })
    },
    bindEventHub(){
      window.eventHub.on('create',(songData)=>{
        this.model.data.songs.push(songData)
        this.view.render(this.model.data)
      })
    }       
  }
  controller.init(view,model)
}