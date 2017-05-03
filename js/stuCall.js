/*stuCall.js*/
var weeks = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
var numStr = function(i, j) {
    var str = ""
    for(; i <= j; i++) {
        str += i + " "
    }
    return str
}
var GetPercent = function(num, total) { 
	num = parseFloat(num); 
	total = parseFloat(total); 
	if (isNaN(num) || isNaN(total)) { 
	return "-"; 
	} 
	return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00 + "%"); 
} 
var StuCall = React.createClass({
	getDefaultProps: function() {
	    return {
	    	// stuInfo: ch.student.infor
	    	stuInfo: {"student":{"id":1,"sname":"曹辉","snumber":"1","headimageUrl":"img/student_img.png"},"class":{"id":4,"cname":"算法设计基础","croom":"3n457","totalStu":2,"week":4,"index":1,"toIndex":2},"totalCall":12,"callTime":0}
	    };
	},
	getInitialState: function() {
	    return {
	    	index: 0
	    };
	},
	render: function(){
		return (
			<div>
				<Course class={this.props.stuInfo.class} />
				<Student stu={this.props.stuInfo.student} />
				<CallHistory total={this.props.stuInfo.totalCall} call={this.props.stuInfo.callTime} />
				<Call snum={this.props.snumber} />
				<Tip />
			</div>
		);
	}
});

var Course = React.createClass({
	render: function(){
		return (
			<div className="course">
				<ul>
					<li>{this.props.class.cname}</li>
					<li>{weeks[this.props.class.week] + numStr(this.props.class.index, this.props.class.toIndex) + "节"}</li>
				</ul>
			</div>
			);
	}
});


var Student = React.createClass({
	render: function(){
		return (
			<div className="stu">
				<img src={this.props.stu.headimageUrl} />
				<ul>
					<li>姓名:{this.props.stu.sname}</li>
					<li>学号:{this.props.stu.snumber}</li>
				</ul>
			</div>
			);
	}
});



var CallHistory = React.createClass({
	render: function(){
		return (
			<div className="callHis">
				<ul>
					<li>
						共点名:{this.props.total}次
					</li>
					<li>
						出勤:{this.props.call}次
					</li>
					<li>
						出勤率:{GetPercent(this.props.call, this.props.total)}
					</li>
				</ul>
			</div>
			);
	}
});



var Call = React.createClass({
	call: function() {
		/*$.ajax({

		    cache : false,

		    type : 'POST',

		    dataType : 'json',

		    url : 'stu-backCallRoll.action',

		    data : {

				'snumber' : this.props.snum,

				'longitude' : longitude,

				'latitude' : latitude,

				'openId' : ch.teacher.openId

    		},
	    	success : function(data) {
	    		PubSub.publish("submit_code", data)
	    	}
    	});*/
	    PubSub.publish("submit_code", 4000)
	},
	render: function(){
		return (
			<div className="call">
				<div className="btn2" onClick={this.call}>到!</div>
			</div>
			);
	}
});


var Tip = React.createClass({
    getDefaultProps: function() {
        return {
            tips: ['位置不再规定范围内', '点名已经结束', '点名失败(网络或其他原因)']
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
            case 4000: {
                return (
                        <div>
                            <div className="weui-mask_transparent"></div>
                            <div className="weui-toast">
                                <i className="weui-icon-success-no-circle weui-icon_toast"></i>
                                <p className="weui-toast__content">点名成功</p>
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
                                {this.props.tips[this.state.success-4001]}
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
  <StuCall />,
  document.getElementsByClassName("page8")[0]
);