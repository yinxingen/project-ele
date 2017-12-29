let hotsearch_module = {

    getData() { //获取数据
        let that = this
        $.ajax({
            url: 'http://localhost:9000/shopping/v3/hot_search_words?latitude=39.90469&longitude=116.407173',
            success(results) {
                that.render(results)
            }
        })
    },
    render(results) { //渲染数据
        let str = ''
        results.forEach((item, i) => {
            str += '<a href="#">' + item.word + '</a>'
        })
        $(".page-header__hotsearch--box").html(str)
    }

}

hotsearch_module.getData()