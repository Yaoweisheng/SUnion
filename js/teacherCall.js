/*teacherCall.js*/
var TeacherCall = React.createClass({
	render: function(){
		return (
			<div >
				<div className="h40"></div>
				<Students />
				<div className="f40"></div>
				<Send />
			</div>);
	}
});

var Students = React.createClass({
	render: function(){
		return (
			<div className="students">
				<Student />
				<Student />
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
				<div className="class_name">课程名称：叉叉叉叉</div>
				<input className="student_checkbox" type="checkbox" name="" />
				<div className="class_time">课程时间：周三三四五节</div>
				<div className="class_number">课程人数：98人</div>
				<div className="line"></div>
			</div>
			);
	}
});

var Send = React.createClass({
	render: function(){
		return (
			<footer className="information">
				<div className="send">发起点名</div>
			</footer>
			);
	}
});

ReactDOM.render(
  <TeacherCall />,
  document.getElementsByClassName("page4")[0]
);