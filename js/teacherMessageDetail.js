/*teacherMessageDetail.js*/

var TeacherMessageDetail = React.createClass({
	render: function(){
		return (
			<div >
				<Time />
				<Students />
				<Content />
			</div>);
	}
});

var Time = React.createClass({
	render: function(){
		return (
			<div className="time">
				<div className="search">
					<form>
						<input className="text" type="text/css" />
						<input className="submit" type="submit" value="搜索" />
					</form>
				</div>
			</div>
			);
	}
});

var Students = React.createClass({
	render: function(){
		return (
			<div >
				<Student />
				<Student />
				<Student />
			</div>);
	}
});

var Student = React.createClass({
	render: function(){
		return (
			<div className="student">
				<div className="student_name">学生姓名：××××</div>
				<div className="student_number">学生学号：2015329700026</div>
				<div className="message">课程名称：×××</div>
				<div className="line"></div>
			</div>
		);
	}
});

var Content = React.createClass({
	render: function(){
		return (
			<footer className="information">
				<div className="information_content">
					<span>信息内容:</span>
					<div className="content">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
				</div>
			</footer>
		);
	}
});



ReactDOM.render(
  <TeacherMessageDetail />,
  document.getElementsByClassName("page3")[0]
);