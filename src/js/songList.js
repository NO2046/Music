{
  let view = {
    el:'.songList',
    template:`
      <ol>
      </ol>
    `,
    render(data){
      let $el = $(this.el)
      $el.html(this.template)
      let {songs}= data
      let liList = songs.map((song)=>$('<li></li>').text(song.name))
      $el.find('ol').empty()
      liList.map((domLi)=>{
        $el.find('ol').append(domLi)
      })
    }
  }
  let model ={
    data:{
      songs:[]
    }
  }
  let controller={
    init(){
      this.view = view
      this.model= model
      this.view.render(this.model.data)
      window.eventHub.on('create',(songData)=>{
        this.model.data.songs.push(songData)
        this.view.render(this.model.data)
      })
    }        
  }
  controller.init(view,model)
}