// stuInforSearch.js
var weeks = ["周日","周一","周二","周三","周四","周五","周六"];
var Index = React.createClass({
	render : function(){
		return (
			<div>
				<Top />
				<Navbar />
				<Search />
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
	    	active: 3
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
var Search = React.createClass({
	getDefaultProps: function() {
	    return {
	    	
	    };
	},
	getInitialState: function() {
	    return {
	    	stuName: ''
	    };
	},
	stuNameChange: function(event) {
		this.setState(
		{
			stuName: event.target.value,
		},
		function(){
			// alert(this.state.stuName)
		}
		)
	},
	stuSearch: function() {
		$.post(".action",
	    {
	        openId: request.teacher.openId,
	        studentName: this.state.stuName,
	    },
	        function(data,status){
				PubSub.publish('stu_search', data)
	    });
	},
	render : function(){
		return (
			<div className="search">		
				<input type="text" name="" placeholder="请输入学生姓名" value={this.state.stuName}  onChange={this.stuNameChange} />
				<div className="btn" onClick={this.stuSearch}>搜索</div>
			</div>
		);
	}
});

var Content = React.createClass({
	getDefaultProps: function() {
	    return {
	    	
	    };
	},
	getInitialState: function() {
	    return {
	    	// students: [{"id":1,"sname":"曹辉","snumber":"1","colloge":"启新学院","clazz":"14电子信息实验班","headimageUrl":"img/student_img.png","inClasses":[{"id":1,"cname":"算法设计基础","week":1,"index":1,"toIndex":2},{"id":6,"cname":"算法设计基础","week":1,"index":3,"toIndex":5}]}]
	    	students: []
	    };
	},
	componentDidMount: function () {
		this.pubsub_token = PubSub.subscribe('stu_search', function (topic, data) {
			this.setState({students: data}, function(){

			})
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token)
	},
	render : function(){
		var students = []
		for(var i = 0; i < this.state.students.length; i++) {
			students.push(
				<li key={i}>
					<div className="detail">详情</div>
					<img src={this.state.students[i].headimageUrl} />
					<div>姓名：{this.state.students[i].sname}</div>
					<div>学号：{this.state.students[i].snumber}</div>
					<div className="det">
						<ul>
							<li>学院：{this.state.students[i].colloge}</li>
							<li>班级：{this.state.students[i].clazz}</li>
							<Classes inClasses={this.state.students[i].inClasses} />
						</ul>
					</div>
				</li>
			)
		}
		return (
		<div className="content">
			<ul>
			{students}
			</ul>
		</div>
		);
	}
});
var Classes = React.createClass({
	render: function() {
		var inClasses = []
		for(var i = 0; i < this.props.inClasses.length; i++) {
			var c = this.props.inClasses[i]
			inClasses.push(<li key={i}>{c.cname + " " + weeks[c.week] + " 第" + c.index + "节-第" + c.toIndex + "节  "}</li>)
		}
		return (
			<li>
				<div className="course">课程：</div>
				<ul className="cou">
					{inClasses}
				</ul>
			</li>
		)
	}
})
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
  document.getElementsByClassName("page02")[0]
);