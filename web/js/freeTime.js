/*freeTime.js*/
var weeks = ["周日","周一","周二","周三","周四","周五","周六"];
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
				<Content course={this.props.course} />
				<Footer />
				<Tip />
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
	    	active: 4
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

var Content = React.createClass({
	render : function(){
		return (
			<div className="content">
				<Time course={this.props.course} />
				<Infor course={this.props.course} />
			</div>
			);
	}
});

var Time = React.createClass({
	render : function(){
		return (
			<div className="time">
				<Weekly />
				<Day course={this.props.course} />
			</div>
			);
	}
});

var Weekly = React.createClass({
	render : function(){
		return (
				<select>
					<option>第二学期&nbsp;第五周</option>
					<option>第二学期&nbsp;第五周</option>
					<option>第二学期&nbsp;第五周</option>
				</select>
			);
	}
});

var Day = React.createClass({
	render : function(){
		return (
			<table className="table table-striped table-hover">
				<Week />
				<Lessons course={this.props.course} />
			</table>
			);
	}
});

var Week = React.createClass({
	render : function(){
		return (
			<thead>
				<tr>
					<th></th>
					{
				      	weeks.map(function(week, index){
				      		return <th key={index}>{week}</th>
				      	})
			      	}
				</tr>
			</thead>
			);
	}
});

var Lessons = React.createClass({
	getDefaultProps: function() {
	    return {

	    };
	},
	getInitialState: function() {
		var array = new Array(this.props.course.total);
		for(var i = 0; i < array.length; i++) {
			array[i] = new Array(7);
			for(var j = 0; j < 7; j++) {
				array[i][j] = {rowspan:1}
			}
		}
		for(var i = 0; i < this.props.course.classes.length; i++) {
			array[this.props.course.classes[i].index-1][this.props.course.classes[i].week].rowspan = this.props.course.classes[i].toIndex - this.props.course.classes[i].index + 1;
			// alert(array[this.props.course.classes[i].index-1][this.props.course.classes[i].week].rowspan)
			array[this.props.course.classes[i].index-1][this.props.course.classes[i].week].cname = this.props.course.classes[i].cname;
			for(var k = this.props.course.classes[i].index; k < this.props.course.classes[i].toIndex; k++) {
				array[k][this.props.course.classes[i].week].rowspan = -1;
			}
			// alert(array[this.props.course.classes[i].index-1][this.props.course.classes[i].week].cname)
		}
	    return {
	    	cTimeArray: array
	    };
	},
	componentDidMount: function () {
		this.pubsub_token = PubSub.subscribe('free_time_change', function (topic, data) {
			data.index /= 1
			data.toIndex /= 1
			var array = this.state.cTimeArray;
			if(!data.delete) {
				array[data.index][data.weekIndex].selected = true
				array[data.index][data.weekIndex].rowspan = data.toIndex - data.index + 1
				array[data.index][data.weekIndex].cname2 = data.name + (data.position?(" @" + data.position):"") + (data.description?(" (" + data.description + ")"):"")
				// alert(array[data.index][data.weekIndex].cname2)
				for(var i = data.index + 1; i <= data.toIndex; i++) {
					array[i][data.weekIndex].rowspan = -1
				}
			}
			else {
				array[data.index][data.weekIndex].selected = false
				if(!array[data.index][data.weekIndex].cname) {
					for(var i = data.index ; i <= data.toIndex; i++) {
						array[i][data.weekIndex].rowspan = 1
					}
				}
			}
			this.setState({cTimeArray: array},function(){
			})
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token)
	},
	render : function(){
		var rows = [];
		for(var i = 0; i < this.props.course.total; i++) {
			rows.push(<Lesson key={i} index={i} showArray={this.state.cTimeArray[i]} />);
  		}
		return (
			<tbody>
		  		{rows}
			</tbody>
		);
	}
});

var Lesson = React.createClass({
	getDefaultProps: function() {
	    return {
	    };
	},
	getInitialState: function() {
		var cols = [];
		for(var i = 0; i < 7; i++) {
			if(this.props.showArray[i].rowspan != -1) {
  				cols.push(<td onClick={this.timetableClick.bind(this, i)}
  				 key={i} index={i+1}
  				  className={this.props.showArray[i].selected? "selected":(this.props.showArray[i].cname?"check":"")}
  				   rowSpan={this.props.showArray[i].rowspan}>
  				   {this.props.showArray[i].cname?this.props.showArray[i].cname:""}
  				   </td>);
			}
		}
	    return {
	    	cols: cols,
	    };
	},
	timetableClick: function(index){
		var data = {
			courseIndex: this.props.index,
			weekIndex: index,
			cInfor: this.props.showArray[index],
		}
		PubSub.publish('free_time_click', data)
	},
	componentDidMount: function () {
	},
	componentWillUnmount: function () {
	},
	render : function(){
		var cols = [];
		for(var i = 0; i < 7; i++) {
			if(this.props.showArray[i].rowspan != -1) {
  				cols.push(<td onClick={this.timetableClick.bind(this, i)}
  				 key={i} index={i+1}
  				  className={this.props.showArray[i].selected? "selected":(this.props.showArray[i].cname?"check" : "")}
  				   rowSpan={this.props.showArray[i].rowspan}>
  				   {this.props.showArray[i].selected?this.props.showArray[i].cname2:(this.props.showArray[i].cname?this.props.showArray[i].cname:"")}
  				   </td>);
			}
		}
		return (
		    <tr>
		      <td className="number">{this.props.index + 1}</td>
		      {cols}
		    </tr>
		);
	}
});

var Infor = React.createClass({
	render : function(){
		return (
			<div className="infor">
				<Class classes={this.props.course.classes}/>
				<CourseTimes course={this.props.course} />
				<div className="btn">发送</div>
			</div>
		);
	}
});

var Class = React.createClass({
	getDefaultProps: function() {
	    return {
	    	
	    };
	},
	getInitialState: function() {
	    return {
	    	classId: ''
	    };
	},
	classChange: function(event) {
		this.setState(
		{
			classId: event.target.value,
		},
		function(){
			PubSub.publish('class_change', this.state.classId)
		}
		)
	},
	render : function(){
		return (
			<div className="class">
				<label>发送班级</label>
				<select onChange={this.classChange}>
					<option>（点击选择班级）</option>
					{
            			this.props.classes.map(function (c, index) {
    						return <option key={index} value={c.id}>{c.cname + " " + weeks[c.week] + " 第" + c.index + "节-第" + c.toIndex + "节"}</option>
  						})
            		}
				</select>
			</div>
		);
	}
});

var CourseTimes = React.createClass({
	getDefaultProps: function() {
	    return {

	    };
	},
	getInitialState: function() {
		var array = new Array(20)
		for(var i = 0; i < array.length; i++) {
			array[i] = {index: -1, toIndex: -1, weekIndex: -1}
		}
	    return {
	    	indexArray: array,
	    	index: 0,
	    	weekIndex: -1, index: -1, toIndex: -1 
	    };
	},
	componentDidMount: function () {
		/*this.pubsub_token0 = PubSub.subscribe('add', function (topic, data) {
			var iArray = this.state.indexArray
			if(data.i != -1) {
				iArray[data.i] = {index: data.index, toIndex: data.toIndex, weekIndex: data.weekIndex}
			}
			else {
				iArray[this.state.index] = {index: data.index, toIndex: data.toIndex, weekIndex: data.weekIndex}
				this.setState({index: this.state.index+1})
			}
			this.setState({indexArray: iArray}, function(){
				alert(data.i)
				// alert(this.state.indexArray.length)
			})
		}.bind(this))
		this.pubsub_token1 = PubSub.subscribe('delete', function (topic, data) {
			var iArray = this.state.indexArray
			// iArray.splice(data, 1)
			iArray[data] = {index: -1, toIndex: -1, weekIndex: -1}
			this.setState({indexArray: iArray})
		}.bind(this))*/
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token0)
		PubSub.unsubscribe(this.pubsub_token1)
	},
	// add: function(index) {
	// 	if(this.state.index == index && this.state.indexArray[index].index != -1 && this.state.indexArray[index].toIndex != -1 && this.state.indexArray[index].weekIndex != -1) {
	// 		var iArray = this.state.indexArray

	// 	}
	// },
	delete: function(index) {
		// alert(this.props.index + "！！")
		// PubSub.publish("delete", this.props.index)
		var iArray = this.state.indexArray
		iArray[index].index = -1
		iArray[index].toIndex = -1
		iArray[index].weekIndex = -1
		setState({indexArray: iArray})
	},
	weekChange: function(index, event) {
		var iArray = this.state.indexArray
		alert(event.target.value)
		iArray[index].weekIndex = event.target.value
		this.setState({indexArray: iArray}, function(){
			// this.add(index)
		})
	},
	option1Change: function (index, event) {
		var iArray = this.state.indexArray
		iArray[index].index = event.target.value
		if(iArray[index].toIndex*1 < iArray[index].index){
			iArray[index].toIndex = iArray[index].index
		}
		this.setState({indexArray: iArray}, function(){
			// this.add()
		})
	},
	option2Change: function (index, event) {
		var iArray = this.state.indexArray
		iArray[index].toIndex = event.target.value
		this.setState({indexArray: iArray}, function(){
			// this.add()
		})
	},
	render : function(){
		var options1 = [];
		for(var i = 0; i < this.props.course.total; i++) {
  			options1.push(<option key={i} value={i}>第{i+1}节</option>);
  		}
		var options2 = [];
		for(var i = this.state.index; i < this.props.course.total; i++) {
			i /= 1;//声明i是数字
  			options2.push(<option key={i} value={i}>第{i+1}节</option>);
  		}
		// lis.push(<CourseTime key={-1} course={this.props.course} index={-1} data={{index:-1, toIndex:-1, weekIndex:-1}} />)
		// lis.push(<CourseTime key={-1} course={this.props.course} index={this.state.indexArray.length} data={{index: -1, toIndex: -1, weekIndex: -1}} />)
		return (
			<div className="course_time">
					<label>上课时间</label>
					<ul>
						<li>
							<select value={this.state.weekIndex}>
							{weeks.map(function(week, index){
								<option>{week}</option>
							})}
							</select>
							<select value={this.state.index} onChange={this.option1Change}>
			            		{options1}
			            	</select>
			            	<span>-</span>
			            	<select value={this.state.toIndex} onChange={this.option2Change}>
			            		{options2}
			            	</select>
						</li>
					</ul>
			</div>
		);
	}
});

var CourseTime = React.createClass({
	getDefaultProps: function() {
	    return {

	    };
	},
	getInitialState: function() {
	    return {
	    	index: this.props.data.index,
	    	toIndex: this.props.data.toIndex,
	    	weekIndex: this.props.data.weekIndex,
	    	delete: false
	    };
	},
	componentDidMount: function () {
	},
	componentWillUnmount: function () {
		// alert(this.props.index + "！")
	},
	render : function(){
		return ( 
				null
			);
	}
});

var Tip = React.createClass({
	getDefaultProps: function() {
	    return {
	    	tips: ['发送失败请重试']
	    };
	},
	getInitialState: function() {
	    return {
	    	success: -1
	    };
	},
	modif: function(){
		this.setState({
			success: -1
		})
	},
	componentDidMount: function () {
		this.pubsub_token = PubSub.subscribe('submit_code', function (topic, data) {
			this.setState({
				success: data
			})
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token)
	},
	render :function(){
		switch(this.state.success) {
			case -1: {
				return null
			}
			case 2000: {
				return (
					    <div>
					        <div className="weui-mask_transparent"></div>
					        <div className="weui-toast">
					            <i className="weui-icon-success-no-circle weui-icon_toast"></i>
					            <p className="weui-toast__content">预定成功</p>
					        </div>
					    </div>
					)
			}
			default: {
				return (
			        <div className="js_dialog">
			            <div className="weui-mask"></div>
			            <div className="weui-dialog weui-skin_android">
			                <div className="weui-dialog__hd"><strong className="weui-dialog__title">提示</strong></div>
			                <div className="weui-dialog__bd">
			                    {this.props.tips[0]}
			                </div>
			                <div className="weui-dialog__ft">
			                    {/*<a href="javascript:;" className="weui-dialog__btn weui-dialog__btn_default">辅助操作</a>*/}
			                    <a href="javascript:;" onClick={this.modif} className="weui-dialog__btn weui-dialog__btn_primary">重试</a>
			                </div>
			            </div>
			        </div>
				)
			}
		}
	}
})
ReactDOM.render(
  <Index />,
  document.getElementsByClassName("page05")[0]
);
