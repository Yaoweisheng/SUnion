/*courseCall.js*/
var Index = React.createClass({
	render : function(){
		return (
			<div>
				<Top />
				<Navbar />
				<Content />
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
						<li className="active">上课点名</li>
						<li>课程预定</li>
						<li>学生信息查询</li>
						<li>空余时间</li>
						<li>弹幕发送</li>
					</ul>
				</div>
			);
	}
});


var Content = React.createClass({
	render : function(){
		return (
			<div className="content">
				<div className="ul_top"></div>
					<ul>
						<Course />
						<Course />
						<Course />
						<Course />
					</ul>
				<div className="ul_bottom"></div>
				<div>
					<div className="course_name">已选班级：数据结构周一345节</div>
					<div className="btn">发起点名</div>
				</div>
			</div>
			);
	}
});

var Course = React.createClass({
	render : function(){
		return (
				<li>
					<div>课程名称：数据结构</div>
					<div>课程时间：周一345节</div>
					<div>68人</div>
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
  document.getElementsByClassName("page06")[0]
);
