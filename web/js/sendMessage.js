/*sendMessage.js*/
var SendMessage = React.createClass({
	render : function(){
		return (
			<div>
				<Top />
				<Navbar />
				<Message />
				<Footer />
			</div>
			);
	}
});

var Top = React.createClass({
	render : function(){
		return (
			<div className="top">
				<User />
				<UserName />
			</div>
			);
	}
});

	var User = React.createClass({
		render : function(){
			return (
					<div className="teacher">SUnion&nbsp;•&nbsp;老师</div>
				);
		}
	});

	var UserName = React.createClass({
		render : function(){
			return( 
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
						<li className="active">发送消息</li>
						<li>上课点名</li>
						<li>课程预定</li>
						<li>学生信息查询</li>
						<li>空余时间</li>
						<li>弹幕发送</li>
					</ul>
				</div>
			);
	}
});

var Message = React.createClass({
	render : function(){
		return (
			<div className="message">
				<Content />
				<List />
			</div>
			);
	}
});

var Content = React.createClass({
	render : function(){
		return (
			<div className="content">
				<div className="header">发送内容:</div>
				<textarea></textarea>
				<div className="btn">发送信息</div>
			</div>
			);
	}
});

var List = React.createClass({
	render : function(){
		return (
			<div className="list">
				<Sendee />
				<Sendee />
			</div>
			);
	}
});

var Sendee = React.createClass({
	render : function(){
		return (
			<div className="students">
				<Course />
				<Students />
			</div>
			);
	}
});

var Course = React.createClass({
	render : function(){
		return (
				<div>
					<span>数据结构周一345节(68人)</span>
					<input type="checkbox" name="" />
				</div>
			);
	}
});

var Students = React.createClass({
	render : function(){
		return (
				<ul>
					<Student />
					<Student />
					<Student />
					<Student />
					<Student />
				</ul>
			);
	}
});

var Student = React.createClass({
	render : function(){
		return (
				<li>
					<div className="infor">高娟娟201432933333333</div>
					<input type="checkbox" name="" />
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
  <SendMessage />,
  document.getElementsByClassName("page04")[0]
);