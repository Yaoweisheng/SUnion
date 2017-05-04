// nearbyNews.js
var Index = React.createClass({
	getDefaultProps: function() {
	    return {
	    	course: {"total":12,"classes":[{"id":1,"cname":"算法设计基础","week":1,"index":1,"toIndex":2},{"id":6,"cname":"算法设计基础","week":1,"index":3,"toIndex":5}]}
	    	// course: ch.teacher.classes
	    };
	},
	getInitialState: function() {
	    return {

	    };
	},
	render : function(){
		return (
			<div>
				<Top />
				<Navbar />
				<News course={this.props.course} />
				<New />
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
	    	navTitles: ["发送消息", "上课点名", "课程预定", "周边新闻", "空余时间", "弹幕发送"]
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

var News = React.createClass({
	getDefaultProps: function(){
		return{
			array:[
			{img: "img/news1.png", "title": "读书节•浙江**大学", "content": "组织学生多读书、读好书，吸收民族文化和世界文化精华，丰富学生的知识，扩大他们的知识面。"},
			{img: "img/news2.png", "title": "钱塘诗会•浙江**大学", "content": "通过对百年新诗的演绎，唤起同学对中国百年新诗的庄严记忆。"},
			{img: "img/news3.png", "title": "高校联谊•浙江**大学、浙江**大学", "content": "活跃高校的校园气氛，培养现代大学生现代主义热情和团队合作精神。"},
			{img: "img/news4.png", "title": "元旦晚会•浙江**大学", "content": "晚会将以新颖的题材、经典的节目，集多种舞台表演形式，溶亲情、友情、师生情于一体。"}
			]
		}
	},
	getInitialState: function(){
		return{
			active: -1,
			click: false
		}
	},
	mouseOut: function(index){
		this.setState({active: -1})
	},
	mouseOver: function(index){
		// alert("over")
		this.setState({active: index})
	},
	newClick: function(){
		this.setState({click: true}, function(){
			PubSub.publish("new_click", true)
		})
	},
	render: function(){
		if(!this.state.click)
		return(
		<div className="news">
		{
			this.props.array.map(function(a, index) {
				return (
				<div key={index} className="new" onClick={this.newClick} onMouseOver={this.mouseOver.bind(this, index)} onMouseOut={this.mouseOut.bind(this, index)}>
					<img src={a.img} />
					<div className={this.state.active == index ? "activity active": "activity"}>
						<div className="title">{a.title}</div>
						<div className="content" style={{"display":this.state.active == index ? "block" : "none"}}>{a.content}</div>
					</div>
				</div>
				)
			}.bind(this))
		}
		</div>
		)
		return null 
	}
})

var New = React.createClass({
	getInitialState: function(){
		return{
			click: false
		}
	},
	componentDidMount: function () {
		this.pubsub_token = PubSub.subscribe('new_click', function (topic, data) {
			this.setState({
				click: true
			})
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token)
	},
	render:function(){
		if(this.state.click == true) {
		return (
			<div>
				<h3>读书节</h3>
				<p>&nbsp;&nbsp;&nbsp;&nbsp;4月23日，某某省第三届全民读书节拉开帷幕，昨日也是第19个“世界读书日”。配合我省全民读书节，营造某某大学的书香气息，丰富学生的校园文化生活，“共建人文校园”某某大学首届大学生读书节开幕式，也于昨日在某某大学崇山校区图书馆学术报告厅举行。本届读书节于4月23日至5月22日为期一个月，将开展一系列的读书文化活动。</p>
				<br />
				<div className="img">
					<img src="img/readDayImg1.jpg"/>
				</div>
				<p>&nbsp;&nbsp;&nbsp;&nbsp;与书相伴的人生是有质量的，把每一天都当做读书节，让阅读成为主基调。某某大学也将坚持以学生发展为本，营造充满人文智慧和人文关怀的校园文化，倡导开展读书活动，提高学生的综合素质，形成某某大学浓郁人文气息的科学氛围。</p>
				<br />
				<div className="img">
					<img src="img/readDayImg2.jpg"/>
				</div>
				<p>&nbsp;&nbsp;&nbsp;&nbsp;在昨日的首届读书节开幕式上，某某大学学生会还发起了“书香盈校园 放飞中国梦”大型阅读签名活动。走入书中，用馥郁的书香陶冶情操和气质，沁润心灵；走入图书馆中，多读书、读好书，增长才情和智慧；从书中走出来，用博学睿智、奋发有为的精神实现梦想。倡导学生养成“爱读书、多读书、读好书”的良好习惯，以各学院为单位，进行了签名。</p>
			</div>
		)
		}
		return null
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
  document.getElementsByClassName("page08")[0]
);
