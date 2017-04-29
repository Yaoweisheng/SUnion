/*index.js*/
var Index = React.createClass({
	render:function(){
		return (
			<div >
				<Top />
				<Navbar />
				<CarouselSlide />
				<Introduce />
				<Footer />
			</div>

			);
	}
});

var Top = React.createClass({
	render:function(){
		return (
			<div className="top">
				<User />
				<UserName />
			</div>
			);
	}
});

	var User = React.createClass({
		render:function(){
			return (
					<div className="teacher">SUnion&nbsp;•&nbsp;老师</div>
				);
		}
	});

	var UserName = React.createClass({
		render:function(){
			return (
					<div className="teacherName">
						<div>用户名：高娟娟</div>
						<div>2017年4月29日</div>
					</div>
				);
		}
	});

var Navbar = React.createClass({
	render:function(){
		return (
				<div className="navbar">
					<div className="logo"></div>
					<ul className="nav">
						<li>发送消息</li>
						<li>上课点名</li>
						<li>课程预定</li>
						<li className="active">学生信息查询</li>
						<li>空余时间</li>
						<li>弹幕发送</li>
					</ul>
				</div>
			);
	}
});

var CarouselSlide = React.createClass({
	render:function(){
		return (
			<div id="myCarousel" className="carousel slide">
				<CarouselIndicators />
				<CarouselInner />
				<LeftControl />
				<RightControl />
			</div>
			);
	}
});

	/*轮播（Carousel）指标*/
	var CarouselIndicators = React.createClass({
		render:function(){
			return (
				<ol className="carousel-indicators">
					<li data-target="#myCarousel" data-slide-to="0" className="active"></li>
					<li data-target="#myCarousel" data-slide-to="1"></li>
					<li data-target="#myCarousel" data-slide-to="2"></li>
				</ol> 
				);
		}
	});

	/*轮播（Carousel）项目*/
	var CarouselInner = React.createClass({
		render:function(){
			return (
				<div className="carousel-inner">
					<div className="item active">
						<img src="img/img1.png" alt="First slide" />
					</div>
					<div className="item">
						<img src="img/img2.png" alt="Second slide" />
					</div>
					<div className="item">
						<img src="img/img3.png" alt="Third slide" />
					</div>
				</div>
				);
		}
	});

/*轮播（Carousel）导航*/
var LeftControl = React.createClass({
	render:function(){
		return (
			<a className="carousel-control left" href="#myCarousel" 
			   data-slide="prev">&lsaquo;</a>
			);
	}
});
var RightControl = React.createClass({
	render:function(){
		return (
			<a className="carousel-control right" href="#myCarousel" 
			   data-slide="next">&rsaquo;</a>
			);
	}
});

var Introduce = React.createClass({
	render:function(){
		return (
			<div className="introduce">
				<FuncIntro />
				<News />
			</div>
			);
	}
});

var FuncIntro = React.createClass({
	render:function(){
		return (
			<div className="func_intro">
				<IntroTitle />
				<IntroContent />
			</div>
			);
	}
});

var IntroTitle = React.createClass({
	render:function(){
		return (
			<div className="title">主要功能介绍</div>
			);
	}
});

var IntroContent = React.createClass({
	render:function(){
		return (
				<ul>
					<Accepter />
					<SendInfor />
					<FreeTime />
					<Barrage />

				</ul>
			);
	}
});

var Accepter = React.createClass({
	render:function(){
		return (
				<li>
					<div className="img img1"></div>
					<div>
						<div className="header">接收上课提醒</div>
						<div className="content">学生可以在微信端接收上课提醒(上课时间和上课地点)。</div>
					</div>
				</li>
			);
	}
});

var SendInfor = React.createClass({
	render:function(){
		return (
				<li>
					<div className="img img1"></div>
					<div>
						<div className="header">接收上课提醒</div>
						<div className="content">学生可以在微信端接收上课提醒(上课时间和上课地点)。</div>
					</div>
				</li>
			);
	}
});

var FreeTime = React.createClass({
	render:function(){
		return (
				<li>
					<div className="img img1"></div>
					<div>
						<div className="header">接收上课提醒</div>
						<div className="content">学生可以在微信端接收上课提醒(上课时间和上课地点)。</div>
					</div>
				</li>
			);
	}
});

var Barrage = React.createClass({
	render:function(){
		return (
				<li>
					<div className="img img1"></div>
					<div>
						<div className="header">接收上课提醒</div>
						<div className="content">学生可以在微信端接收上课提醒(上课时间和上课地点)。</div>
					</div>
				</li>
			);
	}
});

var News = React.createClass({
	render:function(){
		return (
			<div className="news">
			<NewsTitle />
			<NewsContents />
			</div>
			);
	}
});

var NewsTitle = React.createClass({
	render:function(){
		return (
			<div className="title">周边新闻</div>
			);
	}
});

var NewsContents = React.createClass({
	render:function(){
		return (
				<ul>
					<NewsContent />
					<NewsContent />
					<NewsContent />
				</ul>
			);
	}
});

var NewsContent = React.createClass({
	render:function(){
		return (
				<li>
					<div className="header">新闻标题</div>
					<div className="content">新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容</div>
				</li>
			);
	}
});

var Footer = React.createClass({
	render:function(){
		return (
			<div className="footer">
				<ul className="ft">
					<li><a>首页</a></li>
					<li><a>系统反馈</a></li>
				</ul>
				<ul>
					<li>copyright©2017|</li>
					<li>SUnoin&nbsp;·&nbsp;老师</li>
				</ul>
			</div>
			);
	}
});


ReactDOM.render(
  <Index />,
  document.getElementsByClassName("page01")[0]
);