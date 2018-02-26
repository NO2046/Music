{
  let view={
    el:'section.songs',
    init(){
      this.$el = $(this.el)
    },
    render(data){
      let {songs} = data
      console.log(3)

      songs.map((song)=>{
        let $li=$(`
        <li>
        <h3>${song.name}</h3>
        <p>
          <svg class="icon icon-sq">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-sq"></use>
          </svg>
          ${song.singer}
        </p>
        <a class="playButton" href="#">
          <svg class="icon icon-play">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play"></use>
          </svg>
        </a>
      </li>
        `)
        this.$el.find('ol.list').append($li)
        console.log(4)

      })
    }
  }
  let model={
    data:{
      songs:[]
    },
    find() {
      var query = new AV.Query('Song')
      return query.find().then((songs) => {
        //把 find 返回的 promise return 出去
        this.data.songs = songs.map((song) => {
          return { id: song.id, ...song.attributes }
        })
        return songs
        //promise 的 要 return
      })
    }
  }
  let controller={
    init(view,model){
      this.view = view
      this.model = model
      this.view.init()
      this.model.find().then(()=>{
        console.log(2)
        this.view.render(this.model.data)
      })
    }
  }
  console.log(1)
  controller.init(view,model)
}