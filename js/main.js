//----------各種click----------
var searchbar = 0;
$(function () {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('#backtotop').stop().animate({ bottom: "20px" });
		}
		else {
			$('#backtotop').stop().animate({ bottom: "-65px" });
		}
	}).scroll();
	$('#backtotop').click(function () { $('html,body').animate({ scrollTop: 0 }, 800); });
	var slide = 0;
	//--預設地點點擊--
	$("#dropdown-toggle").click(function () {
		$("#dropdown-menu").slideToggle("");

		if (slide == 1) {
			slide = 0;
			$(".fa-chevron-up").attr("style", "display:none")
			$(".fa-chevron-down").attr("style", "display:block")
		}
		else {
			slide = 1;
			$(".fa-chevron-up").attr("style", "display:block")
			$(".fa-chevron-down").attr("style", "display:none")
		}
	});
	$('body').click(function (evt) {
		if (slide == 1) {
			if (evt.target.id != "dropdown-toggle") {
				$(".fa-chevron-up").attr("style", "display:none")
				$(".fa-chevron-down").attr("style", "display:block")
				$("#dropdown-menu").slideToggle("");
				slide = 0;
			}
		}
	});
	//--搜尋點擊--
	$("#searchitem").click(function () {
		if (searchbar == 0) {
			document.getElementById("dropdown-btn").style.display = "block";
			document.getElementById("form-control").style.display = "block";
			document.getElementById("attraction_hot").style.display = "none";
			document.getElementById("attraction_content").style.display = "block";
			$("#searchitem").attr("style", "border-radius: 0 4px 4px 0 ;outline: none")
			$("#input-group").animate({ width: '200px' }, 200);
			searchbar = 1;
		}
		else if (searchbar != 0) {
			show();
		}
	});
	//--搜尋文字輸入--
	$(".form-control").keydown(function (event) {
		if (event.which != 8 && !event.shiftKey) {
			document.getElementById("load").style.display = "block";
			document.getElementById("attraction_content").style.display = "none";
		}
		if (event.which == 13) {
			show();
		}
	});

});

//----------首頁渲染----------
//--抓資料庫--
function cc(x) {
	$.ajax({
		type: 'GET',
		url: './static/Home.json',
		dataType: 'json',
		success: function (response) {
			$.each(response, function (index, element) {
				if (index == x) {
					document.getElementById("hot_content_title").innerHTML = element.title;
					document.getElementById("hot_content_text").innerHTML =
						'地址：' + element.address + " <br/> " +
						'電話：' + element.phone + " <br/> " +
						'開放時間：' + element.time + " <br/> <br/> " +
						element.hashtag;
					$(".hot_content img").attr("src", element.img)

				}
			});
		}
	});
}
//--點擊tab--
function changecontent(mytab) {
	var tab = mytab.id;
	cc(tab);
};
//--自己生成tab--
$(function () {
	var n
	if ($("#hot1").css("opacity") == 1) {
		n = "hot1"
	}
	if ($("#hot2").css("opacity") == 1) {
		n = "hot2"
	}
	if ($("#hot3").css("opacity") == 1) {
		n = "hot3"
	}
	if ($("#hot4").css("opacity") == 1) {
		n = "hot4"
	}
	cc(n);
})

//----------熱門渲染----------
//--抓資料庫+渲染景點--
function attraction() {
	$.ajax({
		type: 'GET',
		url: '../static/attraction.json',
		dataType: 'json',
		success: function (response) {
			$.each(response, function (index, element) {
				var a = element.length
				for (i = 0; i < a; i++) {
					var shops = element[i];
					$("#attraction_content").append("<div class='wrap' data-index='" + shops.name + " " + shops.address + "'><div class='name'>" + shops.name + "</div>")
				}
			});
		}
	});
}
//--更新景點--
function show() {
	document.getElementById("load").style.display = "none";
	document.getElementById("attraction_content").style.display = "block";

	var mSearch = $("#m-search");
	var value = $('.form-control').val();
	if (!value) {
		mSearch.html("");
		return;
	};
	mSearch.html('.wrap:not([data-index*="' + value.toLowerCase() + '"]) {display: none;}');
}
//--點擊預設景點--
function area(area) {
	document.getElementById("form-control").value = area.text
	show()

}