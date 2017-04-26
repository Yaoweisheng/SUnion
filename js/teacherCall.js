/*teacherCall.js*/
var weeks = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
var TeacherCall = React.createClass({
	getDefaultProps: function() {
	    return {

	    };
	},
	getInitialState: function() {
	    return {
	    };
	},
	render: function(){
		//初始化配置
		/*wx.config({

	    debug : false,

	    appId : ch.appId,

	    timestamp : ch.timestamp,

	    nonceStr : ch.nonceStr,

	    signature : ch.signature,   

	    jsApiList : [ 'getLocation' ]

		});*/
		return (
			<div >
				<Classes />
				<div className="f40"></div>
				<Send />
			</div>);
	}
});

var Classes = React.createClass({
	getDefaultProps: function() {
	    return {
	    	courses: {"total":12,"classes":[{"totalStu":98,"croom":"2n219","id":1,"cname":"算法设计基础","week":1,"index":1,"toIndex":2},{"totalStu":98,"croom":"2n219","id":6,"cname":"算法设计基础","week":1,"index":3,"toIndex":5}]}
	    };
	},
	getInitialState: function() {
	    return {
	    };
	},
	componentDidMount: function () {

	},
	componentWillUnmount: function () {

	},
	render: function(){
		return (
			<div className="students">
			{
				this.props.courses.classes.map(function(c, index) {
					return <Class key={index} c={c} />
				})
			}
			</div>);
	}
});

var Class = React.createClass({
	getDefaultProps: function() {
	    return {
	    	// courses: {"total":12,"classes":[{"id":1,"cname":"算法设计基础","week":1,"index":1,"toIndex":2},{"id":6,"cname":"算法设计基础","week":1,"index":3,"toIndex":5}]}
	    };
	},
	getInitialState: function() {
	    return {
	    	check: false
	    };
	},
	classClick: function() {
		// alert(this.state.check)
		this.setState({check: !this.state.check},function(){
			PubSub.publish("class_click", this.props.c.id)
		})
	},
	componentDidMount: function () {
		this.pubsub_token = PubSub.subscribe('class_click', function (topic, cId) {
			
			if(this.props.c.id != cId) {
				this.setState({check: false})
			}
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token)
	},
	render: function(){
		return (
			<div className={this.state.check?"student check":"student"} onClick={this.classClick}>
				<div className="class_name">课程名称：{this.props.c.cname}</div>
				{/*<input className="student_checkbox" type="checkbox" checked={this.state.check?"checked":""} name="" />*/}
				<div className="class_time">课程时间：{weeks[this.props.c.week] + " 第" + this.props.c.index + "节-第" + this.props.c.toIndex + "节"}</div>
				<div className="class_number">课程人数：{this.props.c.totalStu}</div>
				<div className="class_number">课程地点：{this.props.c.croom}</div>
				<div className="line"></div>
			</div>
			);
	}
});

var Send = React.createClass({
	getDefaultProps: function() {
	    return {
	    	// courses: {"total":12,"classes":[{"id":1,"cname":"算法设计基础","week":1,"index":1,"toIndex":2},{"id":6,"cname":"算法设计基础","week":1,"index":3,"toIndex":5}]}
	    };
	},
	getInitialState: function() {
	    return {
	    	cId: -1
	    };
	},
	send: function() {
		// alert(this.state.check)
		// this.setState({check: !this.state.check})
		// alert(this.state.cId)
		if(this.state.cId != -1){
			$.ajax({

			    cache : false,

			    type : 'POST',

			    dataType : 'json',

			    url : 'tc-callRoll.action',

			    data : {

					'cid' : this.state.cId,

					'longitude' : longitude,

					'latitude' : latitude,

					'openId' : ch.teacher.openId

				},

				success : function(data) {

					alert(data);

				}
		});
		}
		
	},
	componentDidMount: function () {
		this.pubsub_token = PubSub.subscribe('class_click', function (topic, cId) {
			this.setState({cId: cId}, function(){
				// alert(this.state.cId)
			})
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token)
	},
	render: function(){
		return (
			<footer className="information">
				<div className="send" onClick={this.send}>发起点名</div>
			</footer>
			);
	}
});

ReactDOM.render(
  <TeacherCall />,
  document.getElementsByClassName("page4")[0]
);