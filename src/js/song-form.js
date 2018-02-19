{
    let view = {
        el:"#editSong",
        init(){
            this.$el = $(this.el)
        },
        template:`
        <form>
        <div class="input">
            <div class="row">
                <label for="">
                    歌名
                    <input name="name" type="text" value="&&name">
                </label>
            </div>
            <div class="row">
                <label for="">
                    歌手
                    <input name="singer" type="text" value="&&singer">
                </label>
            </div>
            <div class="row">
                <label for="">
                    外链
                    <input name="url" type="text" value="&&url">
                </label>
            </div>
        </div>

        <div class="row">
            <button type="submit">SAVE</button>
        </div>
    </form>
        `,
    //如果data没有传或者传的data为undefined，默认data为空对象
        render(data={}){
            let placeHolders = ['name','singer','url']
            let html = this.template
            placeHolders.map((string)=>{
                html = html.replace(`&&${string}`,data[string]||'')
            })
            $(this.el).html(html)
        },
        reset(){
            this.render({})
        }
    }

    let model = {
        data:{
            name:"", singer:"", url:"",id:""
        },
        create(data){
            var Song = AV.Object.extend('Song');
            var song = new Song();
            song.set('name', data.name);
            song.set('singer', data.singer);
            song.set('url', data.url);
            return song.save().then((newSong)=>{
                let {id,attributes}=newSong
              /*this.data.id=id
                this.data.name = attributes.name
                this.data.singer = attributes.singer
                this.data.url = attributes.url */
                Object.assign(this.data,{
                    id,
                    ...attributes,
                //把id以及attributes的所有属性全都赋到this.data上
                  /*name: attributes.name,
                    singer: attributes.singer,
                    url: attributes.url */
                })
                
            }, (error)=> {
                console.error(error);
            });
        }
    }
    let controller = {
        init(view,model){
            this.view = view
            this.view.init()
            this.model = model
            this.view.render(this.model.data)
            this.bindEvents()
            window.eventHub.on('upload',(data)=>{
                this.view.render(data)
                let needs =""
            })
            window.eventHub.on('select',(data)=>{
                this.model.data = data
                this.view.render(this.model.data)
            })
        },
        create(){
            let needs = "name singer url".split(" ")
                let data  = {}
                needs.map((string)=>{
                    data[string]=
                    this.view.$el.find(`[name = "${string}"]`).val()
                })
                this.model.create(data)
                    .then(()=>{
                        this.view.reset()
                        //this.model.data ==='ADRR 108'
                        let string =JSON.stringify(this.model.data)
                        let object = JSON.parse(string)
                        window.eventHub.emit('create',object)
                    })
        },
        update(){
            let needs = "name singer url".split(" ")
                let data  = {}
                needs.map((string)=>{
                    data[string]=
                    this.view.$el.find(`[name = "${string}"]`).val()
                })
            var song = AV.Object.createWithoutData('Song', this.model.data.id);
            song.set('name', data.name)
            song.set('singer', data.singer)
            song.set('url', data.url)
            song.save();
        },
        bindEvents(){
            //因为form是render到页面里，故一开始找不到
            //要绑定在 $el 上
            this.view.$el.on('submit','form',(e)=>{
                e.preventDefault()

                if(this.model.data.id){
                    this.update()
                }else{
                    this.create()
                }
                return     
            })
        }
    }
    controller.init(view,model)
}