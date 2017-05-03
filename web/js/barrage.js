/*freeTime.js*/
var weeks = ["周日","周一","周二","周三","周四","周五","周六"];
var getBarrage = function(i) {
	// alert("func")
	PubSub.publish('getBarrage', "这是个弹幕" + i)
}
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
		if(!this.props.start) {
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
		else return null
	}
});

var Barrages = React.createClass({
	getInitialState: function() {
	    return {
	    	bas: [],
	    	index: 0,
	    	start: false,
	    	course: {"total":12,"classes":[{"id":1,"cname":"算法设计基础","week":1,"index":1,"toIndex":2},{"id":6,"cname":"算法设计基础","week":1,"index":3,"toIndex":5}]},
	    	// course: ch.teacher.classes,
	    	cId: -1
	    };
	},
    componentDidMount: function () {
        this.pubsub_token = PubSub.subscribe('getBarrage', function (topic, data) {
            var bas = this.state.bas
            bas.push(data)
            this.setState({bas: bas})
        }.bind(this))

    	this.timer = setInterval(function () {
    		this.setState({index: this.state.index+1}, function() {
    			getBarrage(this.state.index)
    		})
		}.bind(this), 500);
    },
    componentWillUnmount: function () {
        PubSub.unsubscribe(this.pubsub_token)
    },
	click: function() {
		this.setState({
			start: !this.state.start
		}, function() {
			// alert("st")
			PubSub.publish("start", this.state.start)
		})
	},
	classChange: function(event) {
		this.setState(
		{
			cId: event.target.value,
		},
		function(){
		}
		)
	},
	render : function(){
		return (
			<div  className="barrage">
			 	{
			 		this.state.bas.map(function(ba, index) {
			 			return <Barrage key={index} ba={ba} index={index} />
			 		})
			 	}
				<div className="barrageBtn">
					{
						!this.state.start?
						<select value={this.state.cId} onChange={this.classChange}>
							<option value={-1}>选择班级</option>
							{
		            			this.state.course.classes.map(function (c, index) {
		    						return <option key={index} value={c.id}>{c.cname + " " + weeks[c.week] + " 第" + c.index + "节-第" + c.toIndex + "节"}</option>
		  						})
		            		}
						</select>
						:null
					}
					<div className="btn" onClick={this.click}>{this.state.start?"关闭弹幕":"开启弹幕"}</div>
				</div>
			</div>
			);
	}
});

var Barrage = React.createClass({
	getInitialState: function() {
	    return {
	    	color: 'rgb' + '(' + (Math.floor(0+Math.random()*200)) + ',' + (Math.floor(0+Math.random()*200)) + ',' + (Math.floor(0+Math.random()*200)) + ')',
	    	right: "0px",
	    	// top: (30 * this.props.index + 100) % 700 + "px"
	    	top: (Math.floor((Math.random()*700) / 20) *20) + "px"
	    };
	},
    componentDidMount: function () {
		this.timer = setInterval(function () {
			this.setState({
				right: "100%"
			});
		}.bind(this), 100);
    },
	render : function(){
		return (
				<p className="ba" style={{color:this.state.color, right: this.state.right, top: this.state.top}}>{this.props.ba}</p>
			);
	}
});

var Footer = React.createClass({

	render:function(){
		if(!this.props.start) {
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
		else return null
	}
});


ReactDOM.render(
  <Index />,
  document.getElementsByClassName("page03")[0]
);