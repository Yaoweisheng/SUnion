/*studentHistoryMessage.js*/
var StudentHistoryMessage = React.createClass({
	render: function(){
		return (
			<div >
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
	getDefaultProps: function() {
	    return {
	    	
	    };
	},
	getInitialState: function() {
	    return {
	    	// students: [{"id":1,"sname":"曹辉","snumber":"1","colloge":"启新学院","clazz":"14电子信息实验班","headimageUrl":"img/student_img.png","inClasses":[{"id":1,"cname":"算法设计基础","week":1,"index":1,"toIndex":2},{"id":6,"cname":"算法设计基础","week":1,"index":3,"toIndex":5}]}]
	    	mess: [{"tname":"刘晓庆","content":"今天不上课啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦","time":"2017-04-11 16:13:22"}]
	    };
	},
	render: function(){
		// alert(this.state.mess[0].tname)
		return (
			<div className="students">
				{this.state.mess.map(function(m, index){
					return <Student key={index} mess={m} />
				})}		
			</div>);
	}
});

var Student = React.createClass({
	render: function(){
		// alert(this.props.mess.tname)
		return (
			<ul>
				<li className="time">{this.props.mess.time}</li>
				<li className="cname">课程名称：{this.props.mess.tname}</li>
				<li className="tname">任课教师：{this.props.mess.tname}</li>
				<li className="message"><div className="mess">消息内容：</div><div className="con">{this.props.mess.content}</div></li>
				<li className="line"></li>	
			</ul>);
	}
});


ReactDOM.render(
  <StudentHistoryMessage />,
  document.getElementsByClassName("page14")[0]
);