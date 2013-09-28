$(function()
{
	var bing_url = 'http://www.bing.com/HPImageArchive.aspx?format=js&n=5';
	var yql = 'SELECT * FROM json WHERE url="'+bing_url+'"';
	var url = 'http://query.yahooapis.com/v1/public/yql?q='+encodeURIComponent(yql)+'&format=json&callback=?';

	$.getJSON(url, function(response)
	{
		var bing = response.query.results.json;

		$.each(bing.images, function(i, el)
		{
			var y = el.startdate.substring(0, 4),
			    m = el.startdate.substring(4, 6) - 1,
			    d = el.startdate.substring(6, 8);

			var view = {
				date         : new Date(y, m, d).toLocaleDateString(),
				preview_url  : 'http://www.bing.com' + el.url,
				download_url : 'http://www.bing.com/hpwp/' + el.hsh,
				caption      : el.copyright,
				caption_url  : el.copyrightlink,
				rendered     : false
			};

			var template = 
				'<article class="item">' +
					'<img src="{{preview_url}}" alt="">' +
					'<div class="carousel-caption">' +
						'<h1>Bing Wallpaper for {{date}}</h1>' +
						'<p>{{caption}}.</p>' +
						'<p><a href="{{download_url}}" title="Download" target="_blank">download</a> | <a href="{{caption_url}}" target="_blank">more info</a></p>' +
					'</div>' +
				'</article>';

			var html = Mustache.render(template, view);

			$('article:eq(0)').addClass('active');
			$('.carousel-inner').append(html);
		});

		$('.carousel').carousel({
			interval : false
		});
	});
});
