{
  let view = {
    el:'.songList',
    template:`
      <ol>
        <li>1.歌曲1</li>
        <li>2.歌曲2</li>
        <li>3.歌曲3</li>
        <li>4.歌曲4</li>
        <li>5.歌曲5</li>
      </ol>
    `,
    render(data){
      $(this.el).html(this.template)
    }
  }
  let model ={}
  let controller={
    init(){
      this.view = view
      this.model= model
      this.view.render(this.model.data)
    }
  }
  controller.init(view,model)
}