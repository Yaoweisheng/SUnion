//teacherHistoryMessage.js
var TeacherHistoryMessage = React.createClass({
    render: function(){
      return(
        <div>
          <Time />
          <Messages /> 
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

var Messages = React.createClass({
	getDefaultProps: function() {
	    return {
	    	messages: [{"time":"2017-04-11 16:13:22","content":"今天不上课啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦，自由复习！！","students":[{"id":1,"sname":"曹辉","snumber":"1","headimageUrl":"img/student_img.png"},{"id":2,"sname":"璐璐","snumber":"2","headimageUrl":"img/student_img.png"}]},{"time":"2017-05-12 08:13:22","content":"嗯，今天很生气","students":[{"id":2,"sname":"璐璐","snumber":"2","headimageUrl":"img/student_img.png"}]}]
	    	// message: ch.history.teacher
	    };
	},
	getInitialState: function() {
	    return {

	    };
	},
	render :function(){
		return (
			<div className="students">
			{
				this.props.messages.map(function(mess, index) {
					return <Message key={index} message={mess} index={index} />
				})
			}
			</div>
		);
	}
});
var Message = React.createClass({
	getDefaultProps: function() {
	    return {
	    	
	    };
	},
	getInitialState: function() {
	    return {
	    	show: false
	    };
	},
	showChange: function(index){
		this.setState({
			show: !this.state.show
		}, function(){
			var s = {
				show: this.state.show,
				index: index
			}
			PubSub.publish("show", s)
		})
	},
	render :function(){
		return (
			<div className={this.state.show?"student show":"student"}>
				<div className="stu" onClick={this.showChange.bind(this, this.props.index)}>
					<div className="student_name">{this.props.message.time}</div>
					<div className="message">发送内容:{this.props.message.content}</div>
					{
						!this.state.show?<div className="student_detail">查看详情</div>:null
					}
				</div>
				<Detail show={this.state.show} index={this.props.index} detail={this.props.message.students} />
				<div className="line"></div>
			</div>
		);
	}
});
var Detail = React.createClass({
	getDefaultProps: function() {
	    return {
	    	
	    };
	},
	getInitialState: function() {
	    return {
	    	height: "0px",
	    	h2: this.props.detail.length * 45,
	    };
	},
	componentDidMount: function () {
		this.pubsub_token = PubSub.subscribe('show', function (topic, s) {
			if(this.props.index == s.index) {
				this.setState({height: s.show?(this.state.h2 + "px"):"0px"})
			}
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token)
	},
	render: function(){
		
		// if(this.props.show) {
			return(
				<div className="weui-cells" style={{height:this.state.height}}>
				{
					this.props.detail.map(function(stu, index) {
						// alert(stu.id)
							return (
					            <div className="weui-cell" key={index}>
					                <div className="weui-cell__bd">
					                    <img src={stu.headimageUrl}/> <p className="name">{stu.sname}</p>
					                </div>
					                <div className="weui-cell__ft">{stu.snumber}</div>
					            </div>
					        )
						}
					
					)
				}

				</div>
			
			)
		// }
		// else return null
	}
}
)
ReactDOM.render(
  <TeacherHistoryMessage />,
  document.getElementsByClassName("page2")[0]
);