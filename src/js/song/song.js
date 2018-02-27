{
  let view={
    el:'#app',
    template:`
    <audio src={{url}}>钢琴曲</audio>
    <div class='play'>播放</div>
    <div class='pause'>暂停</div>
    `,
    render(data){
      $(this.el).html(this.template.replace('{{url}}',data.url))
    },
    play(){
      let audio = $(this.el).find('audio')[0]
      audio.play()
    },
    pause(){
      let audio = $(this.el).find('audio')[0]
      audio.pause()
    },
  }
  let model={
    data:{
      id:'',
      name:'',
      singer:'',
      url:''
    },
    get(id){
      var query = new AV.Query('Song')
      return query.get(id).then((song)=>{
        Object.assign(this.data,{id:song.id,...song.attributes})
        return song
      })
    }
  }
  let controller = {
    init(view,model){
      this.view = view
      this.model = model
      let id = this.getSongId()
      this.model.get(id).then(()=>{
        this.view.render(this.model.data)
      })
      this.bindEvents()
    },
    bindEvents(){
      $(this.view.el).on('click','.play',()=>{
        this.view.play()
      })
      $(this.view.el).on('click','.pause',()=>{
        this.view.pause()
      })
    },
    getSongId(){
      let search = window.location.search
      if(search.indexOf('?') === 0){
        search = search.substring(1)
      }
      let id = ''
      let array = search.split('&').filter((v=>v))
      for(let i =0; i<array.length; i++){
        let keyAndValue = array[i].split('=')
        let key  = keyAndValue[0]
        let value = keyAndValue[1]
        if(key === 'id'){
          id = value
          break
        }
      }
      return id
    }
  }
  controller.init(view,model)
}
