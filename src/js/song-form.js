{
    let view = {
        el:"#editSong",
        template:`
        <form action="">
        <div class="input">
            <div class="row">
                <label for="">
                    歌名
                    <input type="text">
                </label>
            </div>
            <div class="row">
                <label for="">
                    歌手
                    <input type="text">
                </label>
            </div>
            <div class="row">
                <label for="">
                    外链
                    <input type="text">
                </label>
            </div>
        </div>

        <div class="row">
            <button type="submit">SAVE</button>
        </div>
    </form>
        `,
        render(data){
            $(this.el).html(this.template)
        }
    }
    let model = {}
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.render(this.model.data)
        }
    }
    controller.init(view,model)
}