var weeks = ["周日","周一","周二","周三","周四","周五","周六"];
var TeacherFreeTime = React.createClass({
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
				<Panel classes={this.props.course.classes} />
				<div className="fill01"></div>
				<TimeTable course={this.props.course} />
				<div className="f40"></div>
				<Send />
				<CourseDialog course={this.props.course} />
				<Tip />
			</div>
		);
	}
});

var Header = React.createClass({
	render : function(){
		return (
			<header>
				<h3>老师预定课程</h3>
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
	    	// classes: {"total":12,"classes":[{"id":1,"cname":"算法设计基础","week":1,"index":1,"toIndex":2},{"id":6,"cname":"算法设计基础","week":1,"index":3,"toIndex":5}]}
	    	// classes: ch.teacher.classes
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
			      <th className="number"></th>
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
			// alert(array[this.props.course.classes[i].index-1][this.props.course.classes[i].week].cname)
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
				array[data.index][data.weekIndex].cname2 = data.name + " @" + data.position + (data.description?(" (" + data.description + ")"):"")
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


var Send = React.createClass({
	getDefaultProps: function() {
	    return {
	    };
	},
	getInitialState: function() {
	    return {
	    	cId: -1,
	    	cweek: -1,
	    	cindex: -1,
	    	toIndex: -1,
	    	classroom: "",
	    	cname: "",
	    	describtion: ""
	    };
	},
	send: function(){
		// alert(this.state.cId)
		// alert(this.state.classroom)
		if(this.state.cid != -1 && this.state.cindex != -1) {
			$.post("tc-classAppo.action",
		    {
		        openId: ch.teacher.openId,
		        cid: this.state.cId,
		        cweek: this.state.cweek,
		        cindex: this.state.cindex,
		        toIndex: this.state.toIndex,
		        classroom: this.state.classroom,
		        cname: this.state.cname,
		        describ: this.state.describtion
		    },
		        function(data,status){
		        // alert("数据: \n" + data + "\n状态: " + status);
				PubSub.publish('submit_code', data)
		    });
		}
		//Ajax 'tc-spareTime.action':ch.teacher.openId, this.state.cId, this.state.times
	},
	componentDidMount: function () {
		this.pubsub_token0 = PubSub.subscribe('class_change', function (topic, cId) {
			this.setState({cId: cId})
		}.bind(this))
		this.pubsub_token1 = PubSub.subscribe('free_time_change', function (topic, data) {
			if(!data.delete) {
				// alert(data.position)
				this.setState({cweek: data.weekIndex, cindex: data.index, toIndex: data.toIndex, classroom: data.position, describtion: data.describtion}, function(){
				
				})
			}
			else {
				this.setState({cweek: -1, cindex: -1, toIndex: -1, classroom: "", describtion: ""})
			}
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
var CourseDialog = React.createClass({
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
	    	cInfor: {},
	    	freeTime: true,
	    	courseName: "",
	    	coursePosition: "",
	    	courseDescription: "",
	    	only: false
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
			},function(){
				if(this.state.cInfor.cname) {
					this.setState({freeTime: false})
				}
			})
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token0)
	},
	option1Change: function (event) {
		this.setState({index:event.target.value}, function(){
			if(this.state.toIndex*1 < this.state.index){
				this.setState({toIndex: this.state.index}, 
					function(){})
			}
		})
	},
	option2Change: function (event) {
		this.setState({toIndex:event.target.value})
	},
	nameChange: function(event) {
		this.setState({courseName: event.target.value})
	},
	weekChange: function(event) {
		this.setState({weekIndex: event.target.value})
	},
	positionChange: function(event) {
		this.setState({coursePosition: event.target.value})
	},
	descriptionChange: function(event) {
		this.setState({courseDescription: event.target.value})
	},
	cancel: function(){
		this.setState({show: false, freeTime: true}, function(){
			/*PubSub.publish('course_time_change', this.state.index)
			PubSub.publish('class_change', this.state.index)*/
		})
	},
	affirm: function() {
		if(this.state.freeTime && !this.state.cInfor.selected) {
			if(this.state.courseName != "" && this.state.coursePosition != "") {
				this.setState({show: false, only: true}, function(){
					var data = {
						index: this.state.index, 
						toIndex: this.state.toIndex, 
						weekIndex: this.state.weekIndex, 
						delete: 0,
						name: this.state.courseName,
						position: this.state.coursePosition,
						description: this.state.courseDescription
					}
					PubSub.publish('free_time_change', data)
				})
			}
		}
		else if(this.state.cInfor.selected) {
			var cInfor = this.state.cInfor
			cInfor.selected = false
			this.setState({cInfor: cInfor, show: false, only: false}, function(){
				var data = {index: this.state.index, toIndex: this.state.toIndex, weekIndex: this.state.weekIndex, delete: 1}
				PubSub.publish('free_time_change', data)
			})
		}
		else if(this.state.cInfor.cname) {
			this.setState({freeTime: true}) 
		}
	},
	render: function(){
		if(!this.state.cInfor.selected && this.state.only && this.state.show) {
			return (
			    <div className="js_dialog" id="iosDialog2">
		            <div className="weui-mask"></div>
		            <div className="weui-dialog">
		                <div className="weui-dialog__bd">只能选择一个时间段</div>
		                <div className="weui-dialog__ft">
		                    <a href="javascript:;" className="weui-dialog__btn weui-dialog__btn_primary" onClick={this.cancel}>知道了</a>
		                </div>
		            </div>
		        </div>
			)
		}
		else if(!this.state.cInfor.selected && this.state.freeTime && this.state.show) {
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
	                <div className="weui-dialog__hd"><strong className="weui-dialog__title">填写课程信息</strong></div>
	                <div className="weui-dialog__bd">
			            <label htmlFor="courseName">课程名称</label><input type="text" name="courseName" placeholder="请输入课程名称" onChange={this.nameChange} />
			        </div>
			        <div className="weui-dialog__bd">
			            <label>课程时间</label>
	            		<select className="sel01" value={this.state.weekIndex} onChange={this.weekChange}>	
			            {
			            	weeks.map(function(week, index){
			      				return <option key={index} value={index}>{week}</option>
			      			})
			            }
	            		</select>
			        </div>
	                <div className="weui-dialog__bd">
	                		<label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
			            	<select className="sel02" value={this.state.index} onChange={this.option1Change}>
			            		{options1}
			            	</select>
			            	<span>&nbsp;-&nbsp;</span>
			            	<select className="sel02" value={this.state.toIndex} onChange={this.option2Change}>
			            		{options2}
			            	</select>
			        </div>
			        <div className="weui-dialog__bd">
			            <label htmlFor="coursePosition">课程地点</label><input type="text" name="coursePosition" placeholder="请输入课程地点" onChange={this.positionChange} />
			        </div>
			        <div className="weui-dialog__bd">
			            <label htmlFor="courseDescription">课程备注</label><input type="text" name="courseDescription" placeholder="请输入课程备注" onChange={this.descriptionChange} />
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
			    <div className="js_dialog" id="androidDialog1">
			        <div className="weui-mask"></div>
			        <div className="weui-dialog weui-skin_android">
			            <div className="weui-dialog__hd"><strong className="weui-dialog__title">{this.state.cInfor.cname2}</strong></div>
			            <div className="weui-dialog__bd">
			            	{weeks[this.state.weekIndex]}&nbsp;第{this.state.index+1}节&nbsp;-&nbsp;第{this.state.toIndex+1}节<br/>
			                需要进行课程替换吗？
			            </div>
			            <div className="weui-dialog__ft">
			                <a href="javascript:;" className="weui-dialog__btn weui-dialog__btn_default" onClick={this.cancel}>取消</a>
			                <a href="javascript:;" className="weui-dialog__btn weui-dialog__btn_primary" onClick={this.affirm}>确定</a>
			            </div>
			        </div>
			    </div>
		        )
		}
		else if(!this.state.freeTime && this.state.show) {
			return (
			    <div className="js_dialog" id="androidDialog1">
			        <div className="weui-mask"></div>
			        <div className="weui-dialog weui-skin_android">
			            <div className="weui-dialog__hd"><strong className="weui-dialog__title">{this.state.cInfor.cname}</strong></div>
			            <div className="weui-dialog__bd">
			            	{weeks[this.state.weekIndex]}&nbsp;第{this.state.index+1}节&nbsp;-&nbsp;第{this.state.toIndex+1}节<br/>
			                需要进行课程替换吗？
			            </div>
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
	<TeacherFreeTime />,
	document.getElementsByClassName("page12")[0]
);
