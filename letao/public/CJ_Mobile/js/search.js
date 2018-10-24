$(function () {
   $('.search_input').val('');
    $('.lg_history').html(template('searchTpl',{model:getSearchData()}));

   $('body').on('tap','.search_btn',function () {
       // 搜索
       var key = $.trim($('.search_input').val());
       if (!key){
           mui.toast('请输入关键字');
           return false;
       }
       insertSearchData(key);
       window.location.href = LeTao.SEARCH_LIST_URL+'?'+'key='+key;
       return false;
   }).on('tap','.icon_clear',function () {
       localStorage.clear();
       $('.lg_history').html(template('searchTpl',{model:getSearchData()}));
   }).on('tap','.icon_delete',function () {
       removeSearchData($(this).parent().find('[data-key]').attr('data-key'));
       $('.lg_history').html(template('searchTpl',{model: getSearchData()}));
   }).on('tap','[data-key]',function () {
       /*删除*/
       window.location.href = LeTao.SEARCH_LIST_URL+'?'+'key='+$(this).attr('data-key');
   });
});
/**获取搜索记录*/
var getSearchData = function() {
    return JSON.parse(localStorage.getItem('leTaoSearchHistory') || '[]');
}

/***
 * 添加搜索记录
 */
var insertSearchData = function (key) {
    var list = getSearchData();
    $.each(list,function (i,item) {
        if (key == item){
            list.splice(i,1);
        }
    });
    list.push(key);
    /**
     * 最多记录10条
     */
    if (list.length > 10){
        list.splice(0,list.length - 10);
    }
    localStorage.setItem('leTaoSearchHistory',JSON.stringify(list));
};
/**
 * 删除搜索记录
 */
var removeSearchData = function (key) {
    var list = getSearchData();
    $.each(list,function (i,item) {
        if (item == key){
            list.splice(i,1);
        }
    });
    localStorage.setItem('leTaoSearchHistory',JSON.stringify(list));
}