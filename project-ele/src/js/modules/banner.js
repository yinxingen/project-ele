import Swiper from 'swiper'

var banner_module = {
    getData() { //获取数据
        let that = this
        $.ajax({
            url: 'http://localhost:9000/shopping/v2/entries?latitude=39.90469&longitude=116.407173&templates[]=main_template',
            success(results) {
                that.render(results)
            }
        })
    },
    render(results) { //渲染数据
        var entries = results[0].entries
        let str = ''
        entries.forEach((item, i) => {
            if (i % 8 == 0) {
                str += '<div class="swiper-slide">'
                for (var j = i; j < i + 8; j++) {
                    if (j >= entries.length) {
                        break;
                    }
                    let _url = entries[j].image_hash
                    let imgurl = 'https://fuss10.elemecdn.com/' + _url.substr(0, 1) + '/' + _url.substr(1, 2) + '/' + _url.substr(3) + '.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/'

                    str += `
                        <div class="foodentry-item">
                            <img src="${imgurl}" alt="">
                            <span>${entries[j].name}</span>
                        </div>
                    `
                }
                str += '</div>'
            }
        })
        $(".banner .swiper-wrapper").html(str)

        new Swiper('.banner', {
            loop: true,
            pagination: {
                el: '.banner-pagination',
                dynamicBullets: true
            }
        })

    }
}

banner_module.getData()