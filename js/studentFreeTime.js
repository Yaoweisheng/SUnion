// studentFreeTime.js
/*teacherfreeTime.js*/
var weeks = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
var StudentFreeTime = React.createClass({
	getDefaultProps: function() {
	    return {
	    	spareTimes:ch.teacher.spareTimes
	    };
	},
	getInitialState: function() {
	    return {

	    };
	},
	render : function(){
		return (
			<div>
				<Panel teacher={this.props.spareTimes.tname} course="算法理论基础" />
				<div className="fill01 stu"></div>
				<TimeTable course={this.props.spareTimes} />
				<div className="f40"></div>
				<Send />
				<Tip />
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
			<div className="panel panel-default fixed stu">
				<div className="panel-body">
					<Class teacher={this.props.teacher}  course={this.props.course}/>
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
	    };
	},
	render : function(){
		return (
			<div className="weui-flex">
	            <div className="weui-flex__item">
		            <div className="placeholder center">
		            老师：{this.props.teacher}
		            </div>
	        	</div>
	            <div className="weui-flex__item">
		            <div className="placeholder center">
		            课程：{this.props.course}
		            </div>
	            </div>
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
	    };
	},
	getInitialState: function() {
	    return {
	    };
	},
	componentDidMount: function () {
	},
	componentWillUnmount: function () {
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
		for(var i = 0; i < this.props.course.times.length; i++) {
			array[this.props.course.times[i].cindex-1][this.props.course.times[i].cweek].rowspan = this.props.course.times[i].toIndex - this.props.course.times[i].cindex + 1;
			array[this.props.course.times[i].cindex-1][this.props.course.times[i].cweek].selected = false
			// alert(array[this.props.course.times[i].index-1][this.props.course.times[i].week].rowspan)
			// array[this.props.course.times[i].cindex-1][this.props.course.times[i].week].cname = this.props.course.times[i].cname;
			for(var k = this.props.course.times[i].cindex; k < this.props.course.times[i].toIndex; k++) {
				array[k][this.props.course.times[i].cweek].rowspan = -1;
			}

		}
	    return {
	    	cTimeArray: array
	    };
	},
	componentDidMount: function () {
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
  				  className="check"
  				   rowSpan={this.props.showArray[i].rowspan}>
  				   </td>);
			}
		}
	    return {
	    	cols: cols,
	    	showArray: this.props.showArray
	    };
	},
	timetableClick: function(index){
		if(this.state.showArray[index].rowspan != 1) {
			var showArray = this.state.showArray
			showArray[index].selected = !showArray[index].selected
			this.setState({showArray: showArray}, function(){
				var data = {
					weekIndex: index,
					index: this.props.index,
					toIndex: this.props.index + this.state.showArray[index].rowspan - 1,
					selected: this.state.showArray[index].selected
				}
    			PubSub.publish('free_time_change', data)
			})
		} 
	},
	componentDidMount: function () {
	},
	componentWillUnmount: function () {
	},
	render : function(){
		var cols = [];
		for(var i = 0; i < 7; i++) {
			if(this.state.showArray[i].rowspan != -1) {
  				cols.push(<td onClick={this.timetableClick.bind(this, i)}
  				 key={i} index={i+1}
  				  className={this.state.showArray[i].selected? "selected" : (this.state.showArray[i].rowspan == 1?"":"check")}
  				   rowSpan={this.state.showArray[i].rowspan}>
  				   {this.state.showArray[i].cname?this.state.showArray[i].cname:''}
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
	    	// cId: null,
	    	cTimes: [],
	    	times: '',
	    	tIndex: 0,
	    };
	},
	send: function(){
		// var times = this.state.times.join('&')
		this.setState({times: this.state.cTimes.join('&')}, function(){
			//alert(this.state.times)
			$.post("stu-backSpareTime.action",
		    {
		        openId: ch.teacher.openId,
		        spareTimes: this.state.times
		    },
		        function(data,status){
		        // alert("数据: \n" + data + "\n状态: " + status);
				PubSub.publish('submit_code', data)
		    });
		    // PubSub.publish('submit_code', 0)
		}
		)
		//Ajax 'tc-spareTime.action':ch.teacher.openId, this.state.cId, this.state.times
	},
	componentDidMount: function () {
		this.pubsub_token = PubSub.subscribe('free_time_change', function (topic, data) {
			if(data.selected) {
				var a = [data.weekIndex, data.index, data.toIndex]
				var cTimes = this.state.cTimes
				cTimes[this.state.tIndex] = a.join(',')
				this.setState({cTimes: cTimes, tIndex: this.state.tIndex + 1}, function(){
				})
			}
			else {
				var cTimes = this.state.cTimes
				for(var i = 0; i < cTimes.length; i++) {
					var b = cTimes[i].split(',')
					if(b[0] == data.weekIndex && b[1] == data.index && b[2] == data.toIndex) {
						cTimes.splice(i, 1)
						this.setState({cTimes: cTimes, tIndex: this.state.tIndex - 1})
						break
					}
				}
			}
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token)
	},
	render : function(){
		return (
			<footer>
				<div className="send" onClick={this.send}>提交给老师</div>
			</footer>
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
	    	success: 2
	    };
	},
	modif: function(){
		this.setState({
			success: 2
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
			case 2: {
				return null
			}
			case 1: {
				return (
					    <div>
					        <div className="weui-mask_transparent"></div>
					        <div className="weui-toast">
					            <i className="weui-icon-success-no-circle weui-icon_toast"></i>
					            <p className="weui-toast__content">发送成功</p>
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
			                    {this.props.tips[this.state.success]}
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
	<StudentFreeTime />,
	document.getElementsByClassName("page12")[0]
);
