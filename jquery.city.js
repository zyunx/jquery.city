/*
 * jquery.city.js - a control for user to select a city
 * 
 * Author: Zhang Yun <cloud2han9@163.com>
 * Date:   Sunday, July 19, 2015
 *
 * Usage:
 *   $.city(cities_data) - Set the cities data.
 *   
 *   cities_data format:
 *   cities_data := {
 *	     {<city_id>: <next_level_cities>}
 *       ...
 *   }
 *   next_level_cities := {
 *       <city_id>: <city_name>,
 *       <city_id>: <city_name>,
 *       ...
 *   }
 *
 *   $(selector).city(options) - turn the selector elem to city control.
 *   options:
 *		name - the input's name
 *		city - the id for the initial selected city 
 */


(function ($) {
	var title = ['省份' , '地级市' , '市、县、区'];
 	$.each(title , function(k , v) {
		title[k]	= '<option value="">'+v+'</option>';
	});

	var cities = {0: {1: '河南省', 26: '四川省'}, 1: {2: '郑州市', 15: '开封市'}, 2: {3: '中原区', 4: '二七区', 5: '管城区', 6: '金水区', 7: '上街区', 8: '惠济区', 9: '巩义市', 10: '荥阳市', 11: '新密市', 12: '新郑市', 13: '登封市', 14: '中牟县'}, 26: {27: '成都市'}, 27: {28: '锦江区', 29: '龙泉驿区'}, 15: {16: '鼓楼区', 17: '龙亭区', 18: '顺河区', 19: '禹王台', 20: '金明区', 21: '杞 县', 22: '通许县', 23: '尉氏县', 24: '开封县', 25: '兰考县'}};

	$.city = function(cities_data) {
		cities = cities_data;
	}

	var findParentCityId = function(city_id) {
		for (i in cities) {
 			for (j in cities[i]) {
 				if (city_id == j) {
 					return i
 				}
 			}
 		}
 		return false
 	};


	var findCity = function(city_id) {
		 if(typeof(cities[city_id]) == "undefined")
				 return false;
		 return cities[city_id];
 	};

	var fillOption = function(el, city_id , selected_id) {
		 var json = findCity(city_id);
		 if (json) {
			$.each(json , function(k , v) {
				var option;
				if (k == selected_id)
					option = '<option value="'+k+'" selected>'+v+'</option>';
				else
					option = '<option value="'+k+'">'+v+'</option>';
				el.append(option);
			})
		 }
 	};

	var provinceChange = function(the_city) {
		the_city.find('.js-city-city').empty();
		the_city.find('.js-city-city').append(title[1]);
		fillOption(the_city.find('.js-city-city'),
			the_city.find('.js-city-province').val());
		the_city.find('.js-city-local').empty();
		the_city.find('.js-city-local').append(title[2]);
	};

	var cityChange = function(the_city) {
		the_city.find('.js-city-local').empty();
		the_city.find('.js-city-local').append(title[2]);
		fillOption(the_city.find('.js-city-local'),
			the_city.find('.js-city-city').val());
	};

	var townChange = function(the_city) {
		the_city.find('input')
				.val(the_city.find('.js-city-local').val());
	};

	$.fn.city = function (options) {
		return this.each(function() {
			var the_city = $(this);
 			the_city.append('<select class="js-city-province">' + 
								title[0] + '</select>');
 			the_city.append('<select class="js-city-city">' + 
								title[1] + '</select>');
 			the_city.append('<select class="js-city-local">' + 
								title[2] + '</select>');
 			the_city.append('<input type="hidden" name="' + 
								options['name'] + '" />');


			the_city.find(".js-city-province").change(function() {
				provinceChange(the_city);
			});
			the_city.find(".js-city-city").change(function() {
				cityChange(the_city);
			});
			the_city.find(".js-city-local").change(function() {
				townChange(the_city);
			});

			town = options['city'];
			city = findParentCityId(town);
			province = findParentCityId(city);
			if (province) {
		 		fillOption(the_city.find('.js-city-province'),
						0 , province);
		 		if (city) {
				 	fillOption(the_city.find('.js-city-city'),
							province , city);
				 	if (town) {
						 fillOption(the_city.find('.js-city-local'),
							city , town);
						the_city.find('input')
							.val(the_city.find('.js-city-local').val());
				 	}
		 		}
 			} else {
		 		fillOption(the_city.find('.js-city-province'), 0);
 			}
		});
	}
}( jQuery ));
