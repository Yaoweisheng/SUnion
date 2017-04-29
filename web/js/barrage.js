/*freeTime.js*/
var Index = React.createClass({
	render : function(){
		return (
			<div>
				<Top />
				<Navbar />
				<Barrages />
				<Footer />
			</div>
			);
	}
});

var Top = React.createClass({
	render : function(){
		return (
			<div className="top">
				<div className="teacher">SUnion&nbsp;•&nbsp;老师</div>
				<div className="teacherName">
					<div>用户名：高娟娟</div>
					<div>2017年4月29日</div>
				</div>
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
						<li>学生信息查询</li>
						<li>空余时间</li>
						<li className="active">弹幕发送</li>
					</ul>
				</div>
			);
	}
});

var Barrages = React.createClass({
	render : function(){
		return (
			<div  className="barrage">
				<div className="header">
					<div className="title">历史弹幕</div>
				</div>
				<ul>
					<Barrage />
					<Barrage />
					<Barrage />
				</ul>
				<div className="barrageBtn">
					<div className="btn">开启弹幕</div>
				</div>
			</div>
			);
	}
});

var Barrage = React.createClass({
	render : function(){
		return (
				<li>
					<div className="user">高娟娟：</div>
					<div className="content">老师我是智障吗</div>
					<div className="time">2017年4月29号</div>
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
  document.getElementsByClassName("page03")[0]
);