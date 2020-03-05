$(function () {

	heightEqual();

	//首页切换查询input
	$('.search-list-li').on('click', function () {
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


	$(".nav-item").click(function () {
		$(this).siblings(".li-dropdown").slideToggle();
		$(this).parent('li').toggleClass("active");
	});



	var onOff = true;
	$('.change-btn').click(function () {
		startmarquee(60, 10, 'marqueebox0', onOff);
		onOff = false;
	});

	//离线查询tab切换
	$(".outline-tab li").click(function(){
		var index = $(this).index();
		$(".outline-tab li").removeClass("on");
		$(this).addClass("on");
		$(".u-station-box").hide();
		if(index==1){
			$(".outline-tit-right").show();
		}else{
			$(".outline-tit-right").hide();
		}
		$(".u-station-box").eq(index).show();
	});

	//聚点tab切换
	$(".judian-tab li").click(function(){
		var index = $(this).index();
		$(".judian-tab li").removeClass("on");
		$(this).addClass("on");
		$(".judian-list").hide();
		$(".judian-list").eq(index).show();
	});



	//高级查询选择操作
	$(".cha-more").click(function (event) {
		var $parents = $(this).parents(".quick-wrap")
		if ($parents.next(".quick-cha-more").hasClass('hide')) {
			$parents.find(".cha-more").text("-")
		} else {
			$parents.find(".cha-more").text("+")
		}
		$parents.next(".quick-cha-more").toggleClass('hide')
	});

	$(".cha-reset").click(function (event) {
		$(".cha-list").find('.jm-checkbox').removeClass('jm-checkbox-checked').end().find('.jm-radio').removeClass('jm-radio-checked').end().find('input').prop("checked", false).val('').end().find('.jm-picker-label').text('');
		$(".cha-list .jm-picker").each(function (index, el) {
			var id = $(this).attr('data-id');
			console.log($("#" + id).find('.bx').length);
			if ($("#" + id).find('.bx').length > 0) {
				$(el).find('input').not(".jm-input-normal").attr('placeholder', $("#" + id).find('.bx').text());
				return;
			}
			$(el).find('input').not(".jm-input-normal").attr('placeholder', $("#" + id).find('li').eq(0).text());
		});
	});

	// 下拉
	$(".cha-box .jm-picker").click(function (event) {
		event = event || window.event;
		event.stopPropagation();
		var offset = $(this).offset();
		selectId = $(this).attr('data-id');
		$("#" + selectId).find(".jm-select-dropdown").toggleClass('jm-select-dropdown-hidden').css({
			top: offset.top + $(this).height(),
			left: offset.left
		});
	});
	$(".cha-box .jm-picker input").focus(function (event) {
		event = event || window.event;
		event.stopPropagation();
		$(".jm-select-dropdown").addClass('jm-select-dropdown-hidden')
	});
	$(".jm-select-dropdown .jm-picker input").focus(function (event) {
		event = event || window.event;
		event.stopPropagation();
		$("#" + selectId).addClass('jm-select-dropdown-hidden')
	});
	$(".jm-select-dropdown-menu-item").hover(function () {
		/* Stuff to do when the mouse enters the element */
		$(this).addClass('on')
	}, function () {
		$(this).removeClass('on')
	});
	$(".jm-select-dropdown").click(function (event) {
		event = event || window.event;
		event.stopPropagation();
		if ($("#" + selectId).find('.on').length > 0) {
			$("#" + selectId).find(".jm-select-dropdown").addClass('jm-select-dropdown-hidden');
			$("." + selectId).find('input').attr("placeholder", $("#" + selectId).find('.on').text());
		}
	});
	$(".jm-select-dropdown .jm-picker").click(function (event) {
		event = event || window.event;
		event.stopPropagation();
		var offset = $(this).offset();
		selectId = $(this).attr('data-id');
		$("#" + selectId).find(".jm-select-dropdown").toggleClass('jm-select-dropdown-hidden').css({
			top: offset.top + $(this).height(),
			left: offset.left,
			zIndex: 9999
		});
	});
	$(document).click(function (event) {
		$(".jm-select-dropdown").addClass('jm-select-dropdown-hidden')
	});
	$("#ymhz .jm-select-dropdown").click(function (event) {
		event = event || window.event;
		event.stopPropagation();
	});
});

//跑马灯滚动
function startmarquee(lh, speed, id, obj) {
	var t;
	var o = document.getElementById(id);
	if (obj) {
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


//查看通道详情
function showMsg(id) {
	$("#nr_" + id + " td").addClass('tdmore');
	$("#nr_" + id).toggle();
	window.event ? window.event.cancelBubble = true : e.stopPropagation();
	return false;
}

// 离线查询隐藏左侧导航栏
var onHide = true;
function leftHide(id){
	if(onHide){
		$(".u-left").css({
			position:"absolute",
			left:"-230px",
			opacity:"0",
			width:"0"
		});
		$('.u-right').css({
			left:"0",
			right:"none",
			width:"100%"
		});
		$(id).html("展示左侧菜单");
	}else{
		$('.u-right').css({
			left:"0",
			width:"970px"
		});
		$(".u-left").css({
			width:"220px",
			position:"relative",
			left:"0",
			opacity:"1",
			
		});
		$(id).html("隐藏左侧菜单");
	}
	onHide=!onHide;
};

// 控制左右栏目同高度
	function heightEqual(){
		var leftH = parseInt($('.u-left').height());
		var rightH = parseInt($('.u-right').height());
		if(leftH>rightH){
			$('.u-right').css({
				height:leftH
			});
		}else{
			$('.u-left').css({
				height:rightH
			});
		}
	}