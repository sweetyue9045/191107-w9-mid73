//----------各種click----------
var searchbar = 0;
$(function () {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#backtotop').stop().animate({ bottom: "20px" });
		}
		else {
			$('#backtotop').stop().animate({ bottom: "-65px" });
		}
	}).scroll();
	$('#backtotop').click(function () { $('html,body').animate({ scrollTop: 0 }, 800); });
	var slide = 0;
	//----------首頁----------
	//--輪播速度--
	$('.carousel1').carousel({
		interval: 2000
	})

	//----------景點----------
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
			return false;
		}
	});

	//----------行程----------
	//--選擇--
	$("#CheckAll").click(function () {
		$(".items:checkbox").prop("checked", false)
	});

	$(".items").click(function () {
		$("#CheckAll").prop("checked", false)
		var check = $("input[class='items']:checked").length
		console.log(check)
		if (check == 0) {
			$("#CheckAll").prop("checked", true)
			choosearea = null
			route(choosearea)
		}
	});
	//--搜尋文字輸入--
	$(".route_form_control").keydown(function (event) {
		if (event.which == 13) {
			change();
			return false;
		}
	});
	$(".route_form_control").click(function () {
		$(".items:checkbox").prop("checked", false)
		$("#CheckAll").prop("checked", true)
		choosearea = null
		route(choosearea)
	})
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
					var attraction = element[i];
					$("#attraction_content").append("<div class='wrap' data-index='" + attraction.name.toLowerCase() + " " + attraction.address + "'><div class='name'>" + attraction.name + "</div>")
				}
			});
		}
	});
}
//--更新景點--
function show() {
	document.getElementById("load").style.display = "none";
	document.getElementById("attraction_content").style.display = "block";
	var cSearch = $("#c-search");
	var value = $('#form-control').val();
	if (!value) {
		cSearch.html("");
		return;
	};
	cSearch.html('.wrap:not([data-index*="' + value.toLowerCase() + '"]) {display: none;}');
}
//--點擊預設景點--
function area(area) {
	document.getElementById("form-control").value = area.text
	show()

}

//----------行程渲染----------
//--抓資料庫+渲染行程--
function route(myroute) {
	$("#route_content").empty()
	$.ajax({
		type: 'GET',
		url: '../static/route.json',
		dataType: 'json',
		success: function (response) {
			$.each(response, function (index, element) {
				var a = element.length
				if (myroute != null) {
					for (k = 0; k < choosearea.length; k++) {
						area = response[myroute[k]];
						if (index == myroute[k]) {
							for (i = 0; i < a; i++) {
								var route = area[i];
								$("#route_content").append("<div class='wrap' data-index='" + route.area + "'><div class='name'>" + route.area + "</div>")
							}
						}
					}
				}
				if (myroute == null) {
					for (i = 0; i < a; i++) {
						var route = element[i];
						$("#route_content").append("<div class='wrap' data-index='" + route.area + "'><div class='name'>" + route.area + "</div>")
					}
					choosearea = []
				}
			});
		}
	});
}
function change() {
	var rSearch = $("#route_search");
	var value = $('#route_form_control').val();
	if (!value) {
		rSearch.html("");
		return;
	};
	rSearch.html('.wrap:not([data-index*="' + value.toLowerCase() + '"]) {display: none;}');
}
var choosearea = [];

function choose(mychoose) {
	if (mychoose.checked) {
		choosearea.push(mychoose.id);
		if (mychoose.id == "CheckAll") {
			choosearea = null
		}
	}
	else {
		choosearea.remove(mychoose.id)
	}
	route(choosearea)
}
Array.prototype.remove = function () {
	var what, a = arguments, L = a.length, ax;
	while (L && this.length) {
		what = a[--L];
		while ((ax = this.indexOf(what)) !== -1) {
			this.splice(ax, 1);
		}
	}
	return this;
};