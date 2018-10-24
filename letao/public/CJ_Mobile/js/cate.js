$(function () {
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });
    renderSlide(function (data) {
       $('.cate_left .mui-scroll').html(template('cate_left',{model:{list:data,currId:0}})).find('li:first-child').trigger('tap');
       $('.loading').hide();
    });
    $('.cate_left').on('tap','li',function (e) {
        var parentId = e.target.dataset['id'];
        var title = e.target.innerHTML;
        $('.cate_left .mui-scroll').html(template('cate_left',{model: {list: window.slideData,currId: parentId}}));
        renderContent(parentId,function (data) {
           $('.cate_right .mui-scroll').html(template('cate_content',{model:{list:data,title:title}}));
        });
    });
});


var renderSlide = function (callback) {
  if (window.slideData){
      callback && callback(window.slideData);
  }
  LeTao.ajax({
     url:'/category/queryTopCategory',
     type:'get',
     data:'',
     dataType:'json',
     success:function (data) {

         window.slideData = data.rows;
         callback && callback(window.slideData);
     }
  });
};

var renderContent = function (parentId,callBack) {
    LeTao.ajax({
       url: '/category/querySecondCategory',
       type: 'get',
       data:{id:parentId},
       dataType: 'json',
        success:function (data) {
            console.log(data);
            callBack && callBack(data.rows);
        }
    });
};