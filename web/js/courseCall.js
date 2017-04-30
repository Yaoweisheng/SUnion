/*courseCall.js*/
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

var Content = React.createClass({
	render : function(){
		return (
			<div className="content">
				<div className="ul_top"></div>
					<ul>
						<Course />
						<Course />
						<Course />
						<Course />
					</ul>
				<div className="ul_bottom"></div>
				<div>
					<div className="course_name">已选班级：数据结构周一345节</div>
					<div className="btn">发起点名</div>
				</div>
			</div>
			);
	}
});

var Course = React.createClass({
	render : function(){
		return (
				<li>
					<div>课程名称：数据结构</div>
					<div>课程时间：周一345节</div>
					<div>68人</div>
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
  document.getElementsByClassName("page06")[0]
);
