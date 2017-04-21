/*teacherfreeTime.js*/
var weeks = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
var TeacherFreeTime = React.createClass({
	getDefaultProps: function() {
	    return {
	    	course: {"total":12,"classes":[{"id":1,"cname":"算法设计基础","week":1,"index":1,"toIndex":2},{"id":8,"cname":"算法设计基础121212121","week":5,"index":3,"toIndex":5},{"id":9,"cname":"算法设计基础12321312","week":3,"index":6,"toIndex":8},{"id":6,"cname":"算法设计基础","week":1,"index":3,"toIndex":5},{"id":6,"cname":"算法设计基础","week":1,"index":3,"toIndex":5},{"id":6,"cname":"算法设计基础","week":1,"index":3,"toIndex":5}]}
	    };
	},
	getInitialState: function() {
	    return {

	    };
	},
	render : function(){
		return (
			<div>
				<Panel classes={this.props.course.classes} />
				<div className="fill01"></div>
				<TimeTable course={this.props.course} />
				<div className="f40"></div>
				<Send />
				<FreeDialog course={this.props.course} />
			</div>
		);
	}
});

var Header = React.createClass({
	render : function(){
		return (
			<header>
				<h3>空闲时间统计</h3>
			</header>
		);
	}
});

var Panel = React.createClass({
	render: function(){
		return (
			<div className="panel panel-default fixed">
				<div className="panel-body">
					<Class classes={this.props.classes} />
					<Time />
				</div>
			</div>
		)
	}
})

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

var TimeTable = React.createClass({
	getDefaultProps: function() {
	    return {
	    };
	},
	getInitialState: function() {
	    return {
	    };
	},
	componentDidMount: function () {
		this.pubsub_token = PubSub.subscribe('province_change', function (topic, province) {
			
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token)
	},
	render : function(){
		return (
			<div className="timetable">
				<Table course={this.props.course}/>
			</div>
		);
	}
});

var Time = React.createClass({
	getDefaultProps: function() {
	    return {
	    	
	    };
	},
	getInitialState: function() {
	    return {
	    	timeId: ''
	    };
	},
	timeChange: function(event){
		this.setState(
			{
				timeId: event.target.value,
			},
			function(){
    			PubSub.publish('time_change', this.state.timeId)
			}
		)
	},
	render : function(){
		return (
			<div className="timetable">
				<div className="time">
					<select onChange={this.timeChange}>
					<option>第二学期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第五周</option>
					<option>第二学期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第六周</option>
					<option>第二学期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第七周</option>
					</select>
				</div>
			</div>
		);
	}
});

var Table = React.createClass({
	getDefaultProps: function() {
	    return {
	    	classes: [{id : 2, cname: '”算法设计基础”',week: '”星期一”',time: '“08:00 ”'},{id : 4,cname: '”算法实践”',week: '”星期二”',time: '“13:30”'}]
	    };
	},
	getInitialState: function() {
	    return {
	    };
	},
	componentDidMount: function () {
		this.pubsub_token = PubSub.subscribe('province_change', function (topic, province) {
			
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token)
	},
	render : function(){
		return (
			<table className="table table-striped">
				<Thead />
				<Tbody course={this.props.course} />
			</table>
			);
	}
});

var Thead = React.createClass({
	render : function(){
		return (
			<thead className="fixed">
			    <tr>
			      <th></th>
			      {
			      	weeks.map(function(week, index){
			      		return <th key={index}>{week}</th>
			      	})
			      }
			      {/*<th>日</th>
			      <th>一</th>
			      <th>二</th>
			      <th>三</th>
			      <th>四</th>
			      <th>五</th>
			      <th>六</th>*/}
			    </tr>
			</thead>
		);
	}
});

var Tbody = React.createClass({
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
		}
	    return {
	    	cTimeArray: array
	    };
	},
	componentDidMount: function () {
		this.pubsub_token = PubSub.subscribe('free_time_change', function (topic, data) {
			var array = this.state.cTimeArray;
			if(!data.delete) {
				array[data.index][data.weekIndex].selected = true
				array[data.index][data.weekIndex].rowspan = data.toIndex - data.index + 1
				for(var i = data.index + 1; i <= data.toIndex; i++) {
					array[i][data.weekIndex].rowspan = -1
				}
			}
			else {
				array[data.index][data.weekIndex].selected = false
				for(var i = data.index ; i <= data.toIndex; i++) {
					array[i][data.weekIndex].rowspan = 1
				}
			}
			this.setState({cTimeArray: array})
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token)
	},
	render : function(){
		var rows = [];
		for(var i = 0; i < this.props.course.total; i++) {
  			rows.push(<Tr key={i} index={i} showArray={this.state.cTimeArray[i]} />);
  		}
		return (
			<tbody>
		  		<tr className="fill02"></tr>
		  		{rows}
			</tbody>
		);
	}
}); 

var Tr = React.createClass({
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
  				  className={this.props.showArray[i].cname?"check":(this.props.showArray[i].selected? "selected" : "")}
  				   rowSpan={this.props.showArray[i].rowspan}>
  				   {this.props.showArray[i].cname?this.props.showArray[i].cname:''}
  				   </td>);
			}
		}
	    return {
	    	cols: cols
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
  				  className={this.props.showArray[i].cname?"check":(this.props.showArray[i].selected? "selected" : "")}
  				   rowSpan={this.props.showArray[i].rowspan}>
  				   {this.props.showArray[i].cname?this.props.showArray[i].cname:''}
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


var Send = React.createClass({
	getDefaultProps: function() {
	    return {
	    };
	},
	getInitialState: function() {
	    return {
	    	cId: null,
	    	times: []
	    };
	},
	send: function(){
		this.setState({times: this.state.times.join('&')})
		//Ajax 'tc-spareTime.action':ch.teacher.openId, this.state.cId, this.state.times
	},
	componentDidMount: function () {
		this.pubsub_token0 = PubSub.subscribe('class_change', function (topic, cId) {
			this.setState({cId: cId})
		}.bind(this))
		this.pubsub_token1 = PubSub.subscribe('free_time_change', function (topic, data) {
			var a = [data.weekIndex, data.index, data.toIndex]
			this.setState({times: a.join(',')})
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token0)
		PubSub.unsubscribe(this.pubsub_token1)
	},
	render : function(){
		return (
			<footer>
				<div className="send" onClick={this.send}>发送给学生</div>
			</footer>
		);
	}
});
var FreeDialog = React.createClass({
	getDefaultProps: function() {
	    return {

	    };
	},
	getInitialState: function() {
	    return {
	    	show: false,
	    	index: null,
	    	toIndex: null,
	    	weekIndex: null,
	    	cInfor: {}
	    };
	},
	componentDidMount: function () {
		this.pubsub_token0 = PubSub.subscribe('free_time_click', function (topic, data) {
			// alert(data.courseIndex)
			this.setState({
				index: data.courseIndex, 
				toIndex: (data.cInfor.cname || data.cInfor.selected) ? data.courseIndex + data.cInfor.rowspan - 1: data.courseIndex + 1, 
				weekIndex: data.weekIndex, 
				show: true, 
				cInfor: data.cInfor
			},function(){})
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token0)
	},
	option1Change: function (event) {
		this.setState({index:event.target.value}, function(){if(this.state.toIndex < this.state.index){this.setState({toIndex: this.state.index})}})
	},
	option2Change: function (event) {
		this.setState({toIndex:event.target.value})
	},
	cancel: function(){
		this.setState({show: false}, function(){
			/*PubSub.publish('course_time_change', this.state.index)
			PubSub.publish('class_change', this.state.index)*/
		})
	},
	affirm: function() {
		if(!this.state.cInfor.cname && !this.state.cInfor.selected) {
			this.setState({show: false}, function(){
				var data = {index: this.state.index, toIndex: this.state.toIndex, weekIndex: this.state.weekIndex, delete: 0}
				PubSub.publish('free_time_change', data)
			})
		}
		else if(this.state.cInfor.cname) {
			var cInfor = this.state.cInfor
			cInfor.cname = null
			this.setState({cInfor: cInfor})
		}
		else if(this.state.cInfor.selected) {
			var cInfor = this.state.cInfor
			cInfor.selected = false
			this.setState({cInfor: cInfor, show: false}, function(){
				var data = {index: this.state.index, toIndex: this.state.toIndex, weekIndex: this.state.weekIndex, delete: 1}
				PubSub.publish('free_time_change', data)
			})
		}
	},
	render: function(){
		if(!this.state.cInfor.selected && !this.state.cInfor.cname && this.state.show) {
			var options1 = [];
			for(var i = 0; i < this.props.course.total; i++) {
	  			options1.push(<option key={i} value={i}>第{i+1}节</option>);
	  		}
			var options2 = [];
			for(var i = this.state.index; i < this.props.course.total; i++) {
				i /= 1;//声明i是数字
	  			options2.push(<option key={i} value={i}>第{i+1}节</option>);
	  		}
	    	return (
	        <div className="js_dialog" id="iosDialog1">
	            <div className="weui-mask"></div>
	            <div className="weui-dialog">
	                <div className="weui-dialog__hd"><strong className="weui-dialog__title">选择时间段</strong></div>
	                <div className="weui-dialog__bd">
			            	<select value={this.state.index} onChange={this.option1Change}>
			            		{options1}
			            	</select>
			            	&nbsp;-&nbsp;
			            	<select value={this.state.toIndex} onChange={this.option2Change}>
			            		{options2}
			            	</select></div>
	                <div className="weui-dialog__ft">
	                    <a href="javascript:;" className="weui-dialog__btn weui-dialog__btn_default" onClick={this.cancel}>取消</a>
	                    <a href="javascript:;" className="weui-dialog__btn weui-dialog__btn_primary" onClick={this.affirm}>确定</a>
	                </div>
	            </div>
	        </div>
	        )
		}
		else if(this.state.cInfor.cname && this.state.show) {
			return (
			    <div className="js_dialog" id="androidDialog1">
			        <div className="weui-mask"></div>
			        <div className="weui-dialog weui-skin_android">
			            <div className="weui-dialog__hd"><strong className="weui-dialog__title">{this.state.cInfor.cname}</strong></div>
			            <div className="weui-dialog__bd">
			            	{weeks[this.state.weekIndex]}&nbsp;第{this.state.index+1}节&nbsp;-&nbsp;第{this.state.toIndex+1}节<br/>
			                需要空闲时间进行替换吗？
			            </div>
			            <div className="weui-dialog__ft">
			                <a href="javascript:;" className="weui-dialog__btn weui-dialog__btn_default" onClick={this.cancel}>取消</a>
			                <a href="javascript:;" className="weui-dialog__btn weui-dialog__btn_primary" onClick={this.affirm}>确定</a>
			            </div>
			        </div>
			    </div>
			)
		}
		else if(this.state.cInfor.selected && this.state.show) {
			return (
			        <div className="js_dialog" id="iosDialog1">
			            <div className="weui-mask"></div>
			            <div className="weui-dialog">
			                <div className="weui-dialog__hd"><strong className="weui-dialog__title">空闲时间</strong></div>
			                <div className="weui-dialog__bd">{weeks[this.state.weekIndex]}&nbsp;第{this.state.index+1}节&nbsp;-&nbsp;第{this.state.toIndex+1}节<br/>是否删除空余时间？</div>
			                <div className="weui-dialog__ft">
			                    <a href="javascript:;" className="weui-dialog__btn weui-dialog__btn_default" onClick={this.cancel}>取消</a>
			                    <a href="javascript:;" className="weui-dialog__btn weui-dialog__btn_primary" onClick={this.affirm}>确定</a>
			                </div>
			            </div>
			        </div>
		        )
		}
        return null
    }
});

ReactDOM.render(
	<TeacherFreeTime />,
	document.getElementsByClassName("page12")[0]
);
