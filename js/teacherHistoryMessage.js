//teacherHistoryMessage.js
var TeacherHistoryMessage = React.createClass({
    render: function(){
      return(
        <div>
      {/*    <Header />*/}
          <div className="h40"></div>
          <Time />
          <Students /> 
        </div>
      );
     }
    });

/*var Header = React.createClass({
	render : function(){
		return (
  	       		<header>
 		         <h3>老师历史消息</h3>
	         	</header>			
			);
	}
});*/

var Time = React.createClass({
	render : function(){
		return (
			<div className="time">
				<Select />
				<Search />
			</div>
			);
	}
});
var Select = React.createClass({
	render : function(){
		return (
			<select>
				<option>最近一周</option>
				<option>最近一个月</option>
				<option>最近一年</option>
			</select>
			);
	}
});
var Search = React.createClass({
	render : function(){
		return (
			<form className="search">
				<input className="text" type="text/css" />
				<input className="submit" type="submit" value="搜索" />
			</form>
			);
	}
});

var Students = React.createClass({
	render :function(){
		return (
			<div className="students">
				<Student />
				<Student />
				<Student />
				<Student />
				<Student />
			</div>
			);
	}
});
var Student = React.createClass({
	render :function(){
		return (
			<div className="student">
			<div className="student_name">2017年4月14日</div>
			<div className="message">发送内容:发送信息发送信息发送信息发送信息发送信息发送信息发送信息发送信息</div>
			<div className="student_detail">查看详情</div>
			<div className="line"></div>
			</div>
			);
	}
});

ReactDOM.render(
  <TeacherHistoryMessage />,
  document.getElementsByClassName("page2")[0]
);