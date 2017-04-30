/*courseCall.js*/
// var weeks = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
var weeks = ["周日","周一","周二","周三","周四","周五","周六"];

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
	componentDidMount: function () {
    	window.addEventListener('scroll', this.handleScroll);
	},
	componentWillUnmount: function () {
    	window.removeEventListener('scroll', this.handleScroll);
	},
	handleScroll: function (e) {
		PubSub.publish("top_scroll", document.body.scrollTop > this.refs.top.clientHeight)
  	},
	render:function(){
		return (
			<div className="top" ref="top">
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
	getDefaultProps: function() {
	    return {
	    	navTitles: ["发送消息", "上课点名", "课程预定", "学生信息查询", "空余时间", "弹幕发送"]
	    };
	},
	getInitialState: function() {
	    return {
	    	fixed: false,
	    	active: 1
	    };
	},
	activeClick: function(index, event) {
		this.setState({active: index})
	},
	componentDidMount: function () {
		this.pubsub_token = PubSub.subscribe('top_scroll', function (topic, scroll) {
			if(this.state.fixed != scroll) {
				this.setState({fixed: scroll})
			}
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token)
	},
	render:function(){ 
		var lis = []
		for(var i = 0; i < this.props.navTitles.length; i++) {
			lis.push(
				<li key={i} className={this.state.active==i?"active":""} onClick={this.activeClick.bind(this, i)}>{this.props.navTitles[i]}</li>
			)
		}
		return (
			<div>
				<div className={this.state.fixed?"navbar fixed": "navbar"}>
					<div className="logo"></div>
					<ul className="nav">
						{lis}
					</ul>
				</div>
				<div className="fill01" style={{height:this.state.fixed?"50px":"0px"}}></div>
			</div>
			);
	}
});

var Content = React.createClass({
	getDefaultProps: function() {
	    return {
	    	courses: {"total":12,"classes":[{"totalStu":98,"croom":"2n219","id":1,"cname":"算法设计基础","week":1,"index":1,"toIndex":2},{"totalStu":98,"croom":"2n219","id":6,"cname":"算法设计基础","week":1,"index":3,"toIndex":5}]}
	    };
	},
	getInitialState: function() {
	    return {
	    };
	},
	render : function(){
		return (
			<div className="content">
				<div className="ul_top"></div>
					<ul>
					{
						this.props.courses.classes.map(function(c, index) {
							return <Course key={index} c={c} />
						})
					}
					</ul>
				<div className="ul_bottom"></div>
				<Send />
			</div>
			);
	}
});

var Course = React.createClass({
	getInitialState: function() {
	    return {
	    	check: false
	    };
	},
	classClick: function() {
		// alert(this.state.check)
		if(!this.state.check) {
			this.setState({check: !this.state.check},function(){
				var data = {
					id: this.props.c.id,
					cname: this.props.c.cname,
					index: this.props.c.index,
					toIndex: this.props.c.toIndex,
					week: this.props.c.week
				}
				PubSub.publish("class_click", data)
			})
		}
	},
	componentDidMount: function () {
		this.pubsub_token = PubSub.subscribe('class_click', function (topic, data) {
			if(this.props.c.id != data.id) {
				this.setState({check: false})
			}
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token)
	},
	render : function(){
		return (
				<li className={this.state.check?"check":""} onClick={this.classClick}>
					<div>课程名称：{this.props.c.cname}</div>
					<div>课程时间：{weeks[this.props.c.week] + " 第" + this.props.c.index + "节-第" + this.props.c.toIndex + "节"}</div>
					<div>课程地点：{this.props.c.croom}</div>
					<div>{this.props.c.totalStu}人</div>
				</li>
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
	    	cId: -1,
	    	cname: '',
	    	index: null,
	    	toIndex: null,
	    	weekIndex: null
	    };
	},
	send: function() {
		// alert(this.state.check)
		// this.setState({check: !this.state.check})
		// alert(this.state.cId)
		if(this.state.cId != -1){
		    //微信API获取当前用户位置
		}
		
	},
	componentDidMount: function () {
		this.pubsub_token = PubSub.subscribe('class_click', function (topic, data) {
			this.setState({cId: data.id, cname: data.cname, index: data.index, toIndex: data.toIndex, weekIndex: data.week}, function(){
				// alert(this.state.cId)
			})
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token)
	},
	render: function(){
		return (
				<div>
					<div className="course_name">已选班级：{this.state.cname?(this.state.cname + weeks[this.state.weekIndex] + " 第" + this.state.index + "节-第" + this.state.toIndex + "节"):""}</div>
					<div className="btn" onClick={this.send}>发起点名</div>
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

ReactDOM.render(
  <Index />,
  document.getElementsByClassName("page06")[0]
);
