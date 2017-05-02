/*stuCall.js*/
var StuCall = React.createClass({
	render: function(){
		return (
			<div>
				<Course />
				<Student />
				<CallHistory />
				<Call />
				<div className="f40"></div>
			</div>
			);
	}
});

var Course = React.createClass({
	render: function(){
		return (
			<div className="course">
				<ul>
					<li>数据结构（孙树森）</li>
					<li>周一345节</li>
				</ul>
			</div>
			);
	}
});


var Student = React.createClass({
	render: function(){
		return (
			<div className="stu">
				<img src="img/student_img.png" />
				<ul>
					<li>姓名:房竹青</li>
					<li>学号:20153283333333</li>
				</ul>
			</div>
			);
	}
});



var CallHistory = React.createClass({
	render: function(){
		return (
			<div className="callHis">
				<ul>
					<li>
						共点名:10次
					</li>
					<li>
						出勤:10次
					</li>
					<li>
						出勤率:100%
					</li>
				</ul>
			</div>
			);
	}
});



var Call = React.createClass({
	render: function(){
		return (
			<div className="call">
				<div className="btn2">到!</div>
			</div>
			);
	}
});



ReactDOM.render(
  <StuCall />,
  document.getElementsByClassName("page8")[0]
);