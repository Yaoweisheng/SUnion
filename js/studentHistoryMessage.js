/*studentHistoryMessage.js*/
var StudentHistoryMessage = React.createClass({
	render: function(){
		return (
			<div >
				<Header />
				<div className="h40"></div>
				<Time />
				<Students />			
			</div>);
	}
});

var Header = React.createClass({
	render: function(){
		return (
			<header>
				<h3>学生历史消息</h3>
			</header>
			);
	}
});

var Time = React.createClass({
	render: function(){
		return (
			<div className="time">
				<TimeSelect />
				<Search />
			</div>
			);
	}
});

var TimeSelect = React.createClass({
	render: function(){
		return (
			
				<select>
					<option>最近一个月</option>
					<option>最近一周</option>
					<option>最近一年</option>
				</select>			

			);
	}
});

var Search = React.createClass({
	render: function(){
		return (
			<div className="search">
				<form>
					<input className="text" type="text/css" />
					<input className="submit" type="submit" value="搜索" />
				</form>
			</div>
			);
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
			</div>);
	}
});

var Student = React.createClass({
	render: function(){
		return (
			<div className="student">
				<div className="student_img"></div>
				<div className="student_name">课程名称：××××</div>
				<div className="student_number">任课教师：×××</div>
				<div className="message">消息内容:发送信息发送信息发送信息发送信息发送信息发送信息发送信息发送信息</div>
				<div className="line"></div>	
			</div>);
	}
});


ReactDOM.render(
  <StudentHistoryMessage />,
  document.getElementsByClassName("page2")[0]
);