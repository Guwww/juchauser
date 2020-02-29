

$(function () {
	

	//首页切换查询input
	$('.search-list-li').on('click',function(){
		var index = $(this).index();
		$(".search-list-li").removeClass("search-on");
		$('.jc-search-input').hide();
		$(this).addClass("search-on");
		$(".jc-search-input").eq(index).show();
	});

	var isCheckAll = 1;

	    // 查询列表全选
		$(".checkAll").click(function (event) {
			if (isCheckAll) {
				$(this).parents("table").find('.jm-checkbox').addClass('jm-checkbox-checked');
				$(this).parents("table").find('.jm-checkbox input').prop("checked", true)
				isCheckAll = 0;
			} else {
				$(this).parents("table").find('.jm-checkbox').removeClass('jm-checkbox-checked').prop("checked", false);
				isCheckAll = 1;
			}
		});


		$(".nav-item").click(function(){			
			$(this).siblings(".li-dropdown").slideToggle();
			$(this).parent('li').toggleClass("active");
		});


		
		var onOff=true;
		$('.change-btn').click(function(){
			startmarquee(60, 10, 'marqueebox0',onOff);
			onOff = false;
		});	
});

//跑马灯滚动
function startmarquee(lh, speed, id,obj) {
    var t;
	var o = document.getElementById(id);
	if(obj){
		console.log(1);
		o.innerHTML += o.innerHTML;
		o.scrollTop = 0;
	}

    function start() {
        t = setInterval(scrolling, speed);
        o.scrollTop += 2;
    }

    function scrolling() {
        if (o.scrollTop % lh != 0) {
			o.scrollTop += 2;
			if (o.scrollTop >= o.scrollHeight / 2) o.scrollTop = 0;
        } else {
            clearInterval(t);
		}
    }
    setTimeout(start);
}


