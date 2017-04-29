/*freeTime.js*/
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
						<li>上课点名</li>
						<li>课程预定</li>
						<li>学生信息查询</li>
						<li className="active">空余时间</li>
						<li>弹幕发送</li>
					</ul>
				</div>
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

var Content = React.createClass({
	render : function(){
		return (
			<div className="content">
				<Time />
				<Infor />
			</div>
			);
	}
});

var Time = React.createClass({
	render : function(){
		return (
			<div className="time">
				<Weekly />
				<Day />
			</div>
			);
	}
});

var Weekly = React.createClass({
	render : function(){
		return (
				<select>
					<option>第二学期&nbsp;第五周</option>
					<option>第二学期&nbsp;第五周</option>
					<option>第二学期&nbsp;第五周</option>
				</select>
			);
	}
});

var Day = React.createClass({
	render : function(){
		return (
			<table className="table table-striped table-bordered">
				<Week />
				<Lessons />
			</table>
			);
	}
});

var Week = React.createClass({
	render : function(){
		return (
			<thead>
				<tr>
					<th></th>
					<th>周日</th>
					<th>周一</th>
					<th>周二</th>
					<th>周三</th>
					<th>周四</th>
					<th>周五</th>
					<th>周六</th>
				</tr>
			</thead>
			);
	}
});

var Lessons = React.createClass({
	render : function(){
		return (
			<tbody>
				<Lesson />
				<Lesson />
			</tbody>
			);
	}
});

var Lesson = React.createClass({
	render : function(){
		return (
			<tr>
				<td className="number">1</td>
				<td></td>
				<td></td>
				<td className="check"></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			);
	}
});

var Infor = React.createClass({
	render : function(){
		return (
			<div className="infor">
				<Class />
				<CourseTimes />
				<div className="btn">发送</div>
			</div>
			);
	}
});

var Class = React.createClass({
	render : function(){
		return (
			<div className="class">
				<label>选择班级</label>
				<select>
					<option>算法周一1-5</option>
					<option>算法</option>
					<option>算法</option>
				</select>
			</div>
			);
	}
});

var CourseTimes = React.createClass({
	render : function(){
		return (
			<div className="course_time">
					<label>上课时间</label>
					<ul>
						<CourseTime />
						<CourseTime />
					</ul>
			</div>
			);
	}
});

var CourseTime = React.createClass({
	render : function(){
		return (
			<li>
				<select>
					<option>周一</option>
					<option>周一</option>
					<option>周一</option>
				</select>
				<select>
					<option>第1节</option>
					<option>第1节</option>
					<option>第1节</option>
				</select>
				<select>
					<option>第2节</option>
					<option>第3节</option>
					<option>第4节</option>
				</select>
			</li>
			);
	}
});

ReactDOM.render(
  <Index />,
  document.getElementsByClassName("page05")[0]
);
