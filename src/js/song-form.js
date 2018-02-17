alert(1)
{
    let view = {
        el:'.page > main',
        template:`
        <form action="" class="form">
        <h2>新建歌曲</h2>
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
        <div class="row">
            <button type="submit">保存</button>
        </div>
        </form>
        `,
        renderd(data){
           $(this.el).html(this.template)
        }
    }
}