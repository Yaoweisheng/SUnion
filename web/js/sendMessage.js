/*sendMessage.js*/
var Index = React.createClass({
	getDefaultProps: function() {
	    return {
	    };
	},
	getInitialState: function() {
	    return {
	    };
	},
	render:function(){
		return (
			<div >
				<Top />
				<Navbar />
				<Message />
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
	    	active: 0
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

var Message = React.createClass({
	render : function(){
		return (
			<div className="message">
				<Content />
				<List />
			</div>
			);
	}
});

var Content = React.createClass({
	render : function(){
		return (
			<div className="content">
				<div className="header">发送内容:</div>
				<textarea></textarea>
				<div className="btn">发送信息</div>
			</div>
			);
	}
});

var List = React.createClass({
	render : function(){
		return (
			<div className="list">
				<Sendee />
				<Sendee />
			</div>
		);
	}
});

var Sendee = React.createClass({
	render : function(){
		return (
			<div className="students">
				<Course />
				<Students />
			</div>
			);
	}
});

var Course = React.createClass({
	render : function(){
		return (
				<div>
					<span>数据结构周一345节(68人)</span>
					<input type="checkbox" name="" />
				</div>
			);
	}
});

var Students = React.createClass({
	render : function(){
		return (
				<ul>
					<Student />
					<Student />
					<Student />
					<Student />
					<Student />
				</ul>
			);
	}
});

var Student = React.createClass({
	render : function(){
		return (
			<li>
				<div className="infor">高娟娟201432933333333</div>
				<input type="checkbox" name="" />
			</li>
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
  document.getElementsByClassName("page04")[0]
);