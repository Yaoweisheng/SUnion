/*sendMessage.js*/
var Index = React.createClass({
	render : function(){
		return (
			<div>
				<Top />
				<Navbar />
				<Message />
				<Footer />
			</div>
			);
	}
});

var Index = React.createClass({
	getInitialState: function() {
	    return {
	    	start: false
	    };
	},
    componentDidMount: function () {
        this.pubsub_token = PubSub.subscribe('start', function (topic, start) {
        	// alert("start")
        	this.setState({start: start}, function(){
        		// alert(this.state.start)
        	})
        }.bind(this))
    },
    componentWillUnmount: function () {
        PubSub.unsubscribe(this.pubsub_token)
    },
	render : function(){
		return (
			<div>
				<Top start={this.state.start} />
				<Navbar start={this.state.start} />
				<Barrages />
				<Footer start={this.state.start} />
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
		if(!this.props.start) {
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
		else return null
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
  <SendMessage />,
  document.getElementsByClassName("page04")[0]
);