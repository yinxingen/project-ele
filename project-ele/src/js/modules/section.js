import { log } from "util";

let section_module = {
    getData() {
        let that = this
        $.ajax({
            url: 'http://localhost:9000/shopping/restaurants?latitude=39.90469&longitude=116.407173&offset=100&limit=20&extras[]=activities&extras[]=tags&extra_filters=home&terminal=h5',
            success(results) {
                that.render(results)
            }
        })
    },
    render(results) { //渲染数据
        console.log(results)
        var str = ''
        results.forEach((item, i) => {
            //图片
            var image_path = item.image_path
            let gs = ''
            if (image_path.substr(image_path.length - 3, image_path.length - 1) == 'jpg') {
                gs = 'jpg'
            } else if (image_path.substr(image_path.length - 3, image_path.length - 1) == 'png') {
                gs = 'png'
            } else if (image_path.substr(image_path.length - 4, image_path.length - 1) == 'jpeg') {
                gs = 'jpeg'
            }
            let imgurl = '//fuss10.elemecdn.com/' + image_path.substr(0, 1) + '/' + image_path.substr(1, 2) + '/' + image_path.substr(3) + '.' + gs + '?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/'
                // console.log(imgurl)
                //标题
            let shop_name = item.name
                // let bao = results[i].supports[0].icon_name
            let rating = item.rating
            let recent_order_num = item.recent_order_num

            var supports = ''

            item.supports.forEach((a, b) => {

                supports +=
                    `
                    <i>${a.icon_name}</i>
                `
            })

            //峰鸟
            var delivery_mode = ''
            if (item.delivery_mode) {
                delivery_mode = item.delivery_mode.text
                    // console.log(delivery_mode)
            }

            let price = item.piecewise_agent_fee.rules[0].price

            let pei = item.piecewise_agent_fee.tips

            //位置
            let distance = (item.distance / 1000).toFixed(2)
                // console.log(distance)
            let order_lead_time = item.order_lead_time

            //口碑
            let kbImg = '';
            let kbP = '';
            if (item.recommend.reason) {
                let ss = item.recommend.reason + '';
                if (ss.indexOf('广告') > -1) {
                    kbP +=
                        `
                    <p class="clearfix kbP">
                        <img class="koubei_img" src='//fuss10.elemecdn.com/7/31/111f3f9379e772eedf4855beae8a1jpeg.jpeg?imageMogr/format/webp/thumbnail/!60x60r/gravity/Center/crop/60x60/'>
                        <span>${item.recommend.reason}</span>
                    <p>
                    `
                } else {
                    kbP +=
                        `
                        <img class="koubei_img" src='//fuss10.elemecdn.com/a/c1/24c767ffa7fd296d3e2d6f01798c6png.png?imageMogr/format/webp/thumbnail/!60x60r/gravity/Center/crop/60x60/' alt=''>
                        <span class='ads'>${item.recommend.reason}</span>

                        `
                }
            }
            //活动
            let activities = ''
            item.activities.forEach((m, n) => {

                activities +=
                    `
                        <p>
                        <span class="activities_icon_name">${m.icon_name}</span>
                        ${m.description}
                        </p>
                    `
                console.log(m.icon_name)
            })

            str +=
                ` 
                <div class="shoplist-container">   
                    <div class="logo_main_left">
                        <img src="${imgurl}">
                    </div>
               
                    <div class="logo_main_right">
                        <div class="mian_right_title">
                                <span class="pinpai">品牌</span>
                                <span class="shop_name">${shop_name}</span>
                                <span class="bao">${supports}</span>
                        </div>
                        <div class="mian_right_select">                           
                                <span>☆☆☆☆☆</span>
                                <span>${rating}</span>
                                月售<span>${recent_order_num}</span>单                           
                                <i class="delivery_mode">${delivery_mode}</i>
                        </div>
                        <div class="mian_right_address">
                            <span>￥${price}起送</span><span>${pei}</span>
                            <i class="location">${distance}km | ${order_lead_time}分钟</i>
                        </div>
                        
                        <div class="mian_right_hot">
                            ${kbImg}
                            ${kbP}
                            
                        </div>
                        <div class="tiao"></div>
                        <div class="mian_right_activities">
                            ${activities}
                        </div>
                       
                    </div>
                </div>
            `
        })
        $(".shoplist").html(str)
    }

}

section_module.getData()