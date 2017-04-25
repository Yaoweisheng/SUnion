var weeks = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
var SendInformation = React.createClass({
    render: function(){
      return(
        <div>
            <Course />
            <Students /> 
            <Information />
            <div className="f40"></div>
            <Tip />
        </div>
      );
    }
});
var Line = React.createClass({
	render: function(){
		return <div className="line"></div>
	}
});

var Course = React.createClass({
    render: function() {
      return (
        <div className="course">
          <label>课程</label>
          <Line />
          <Select />
        </div>
     	  );
     }
});
var Select = React.createClass({
    getDefaultProps: function() {
        return {
            course:ch.teacher.classes
        };
    },
    getInitialState: function() {
        return {
            students: [],
            cId: -1
        };
    },
    classChange: function(event){
        this.setState(
            {
                cId: event.target.value
            },
            function(){
        	var cId = this.state.cId;
                if(this.state.cId != -1) {
                    $.post("tc-getStuOfCid.action",
                   {
                        cid: this.state.cId
                   },
                    function(data,status){
                       alert(cId+'++')
                        var data2 = {
                            cId: cId,
                            students: data
                        }
                        PubSub.publish('class_change', data2)
                    });
                }
            }
        )
    },
	render: function(){
		return(
            <select value={this.state.cId} onChange={this.classChange}>
                <option value="-1">（点击选择课程）</option>
                {
                    this.props.course.classes.map(function (c, index) {
                    return <option key={index} value={c.id}>{c.cname}</option>
                    })
                }
            </select> 
		);
	}
	
});

var Students = React.createClass({
    getDefaultProps: function() {
        return {
            };
    },
    getInitialState: function() {
        return {
            students: [],
            cId: -1,
        };
    },
    componentDidMount: function () {
        this.pubsub_token = PubSub.subscribe('class_change', function (topic, data) {
            this.setState({
                cId: data.cId,
                students: data.students
            }, function(){
            })
        }.bind(this))
    },
    componentWillUnmount: function () {
        PubSub.unsubscribe(this.pubsub_token)
    },
    render:function(){
        return (
            <div className="students">
            {
                this.state.students.map(function (stu, index) {
                    return <Student key={index} stu={stu} />
                })
            }
            </div>
        );
    }
});

var Student = React.createClass({
    getDefaultProps: function() {
        return {
        };
    },
    getInitialState: function() {
        return {
            check: true,
        };
    },
    componentDidMount: function () {
        this.pubsub_token = PubSub.subscribe('check_all', function (topic, checkAll) {
            // alert(checkAll)
            if(checkAll){
                if(this.state.check == false) {
                    this.setState({
                        check: true
                    }, function(){
                    })
                }
            }
            else {
                if(this.state.check == true) {
                    this.setState({
                        check: false
                    }, function(){
                    })
                }
            }
        }.bind(this))
    },
    componentWillUnmount: function () {
        PubSub.unsubscribe(this.pubsub_token)
    },
    detail: function() {

    },
    change: function(){

    },
    studentClick: function() {
        this.setState({
            check: !this.state.check
        }, function(){
            var stu = {
                check: this.state.check,
                id: this.props.stu.id
            }
            PubSub.publish("check_one", stu)
        })
    },
    render: function(){
        return(
            <div className="student">
                <div className="stu" onClick={this.studentClick}>
                    <div className="student_img" style={{backgroundImage: 'url(' + this.props.stu.headimageUrl + ')'}}></div>
                    <div className="student_name">学生姓名：{this.props.stu.sname}</div>
                    
                    <div className="student_number">学号：{this.props.stu.snumber}</div>
                </div>
                {/*<div className="student_detail" onClick={this.detail}>查看详情</div>*/}
                <input className="student_checkbox" value={this.state.check} ref="checkbox" onClick={this.studentClick} onChange={this.change} checked={this.state.check?"checked":""} type="checkbox" name=""/>
                <Line />
            </div>
        );
    }
});

var Information = React.createClass({
	render:function(){
		return (
			<footer className="information">
    		<NumberCheck />
    		<InformationContent />
  		</footer>);
	}
});

var NumberCheck = React.createClass({
    getDefaultProps: function() {
        return {
        
        };
    },
    getInitialState: function() {
        return {
            students: [],
            checkAll: false,
            studentNumber: 0
        };
    },
    checkChange: function(){
    },
    checkAll: function(){
        this.setState({checkAll: !this.state.checkAll}, function(){
            if(this.state.checkAll) {
                this.setState({studentNumber: this.state.students.length})
            }
            else {
                this.setState({studentNumber: 0})
            }
            PubSub.publish('check_all', this.state.checkAll)
        })
    },
    componentDidMount: function () {
        this.pubsub_token0 = PubSub.subscribe('class_change', function (topic, data) {
            this.setState({
                students: data.students,
                checkAll: true,
                studentNumber: data.students.length
            }, function(){
            })
        }.bind(this))
        this.pubsub_token1 = PubSub.subscribe('check_one', function (topic, stu) {
            if(stu.check){
                this.setState({studentNumber: this.state.studentNumber+1}, function(){
                    // alert(this.state.studentNumber)
                    // alert(this.state.students.length)
                    if(this.state.studentNumber == this.state.students.length) {
                        this.setState({checkAll: true})
                    }
                })
            }
            else {
                this.setState({studentNumber: this.state.studentNumber-1}, function(){
                    if(this.state.checkAll == true) {
                        this.setState({checkAll: false})
                    }
                })
            }
        }.bind(this))
    },
    componentWillUnmount: function () {
        PubSub.unsubscribe(this.pubsub_token0)
        PubSub.unsubscribe(this.pubsub_token1)
    },
	render :function(){
		return (
  		<div className="number_check">
  			<div className="number">已选{this.state.studentNumber}人</div>
  			<input className="checkbox" onClick={this.checkAll} onChange={this.checkChange} checked={this.state.checkAll?"checked":""} type="checkbox" name=""/>
  			<label className="check_all" onClick={this.checkAll}>全选</label>
		</div>
    );
	}
});

var InformationContent = React.createClass({
    getDefaultProps: function() {
        return {
        
        };
    },
    getInitialState: function() {
        return {
            students: [],
            cId: -1,
            content: '',
            idArray:[],
            ids: '',
            index: 0
        };
    },
    contentChange: function(event){
        this.setState({content: event.target.value})
    },
    send: function(){
	alert(this.state.cId)
        if(this.state.cId != -1) {
                       
            var s = this.state.idArray.join(',')
            this.setState({ids:s}, function() {
                 alert(this.state.ids)
                $.post("tc-sendNotice.action",
                {
                    openId:ch.teacher.openId,
                    ids:this.state.ids,
                    content: this.state.content
                },
                    function(data,status){
                    PubSub.publish('submit_code', data);
                });
            })
        }
    },
    componentDidMount: function () {
        this.pubsub_token0 = PubSub.subscribe('class_change', function (topic, data) {
            this.setState({
                cId: data.cId, students: data.students
            }, function(){
                var a = this.state.idArray
                for(var i = 0; i < data.students.length; i++) {
                    a[i] = data.students[i].id
                }
                this.setState({idArray: a, index: a.length})
            })
        }.bind(this))
        this.pubsub_token1 = PubSub.subscribe('check_one', function (topic, stu) {
            if(stu.check){
                var a = this.state.idArray
                a[this.state.index] = stu.id
                this.setState({idArray: a, index: this.state.index+1})
            }
            else {
                var b = this.state.idArray
                for(var i = 0; i < b.length; i++) {
                    if(b[i] == stu.id){
                        b.splice(i, 1)
                        break
                    }
                }
                this.setState({idArray: b, index: this.state.index-1})
            }
        }.bind(this))
        this.pubsub_token2 = PubSub.subscribe('check_all', function (topic, checkAll) {
            // alert(checkAll)
            if(checkAll){
                var a = this.state.idArray
                for(var i = 0; i < this.state.students.length; i++) {
                    a[i] = this.state.students[i].id
                }
                this.setState({idArray: a, index: a.length})
            }
            else {
                this.setState({idArray: [], index: 0})
            }
        }.bind(this))
    },
    componentWillUnmount: function () {
        PubSub.unsubscribe(this.pubsub_token0)
        PubSub.unsubscribe(this.pubsub_token1)
        PubSub.unsubscribe(this.pubsub_token2)
    },
	render :function(){
		return (
        <div>
      		<div className="information_content">
      			<span>信息内容:</span>
      			<textarea autofocus onChange={this.contentChange}></textarea>
      		</div>
            <div className="send" onClick={this.send}>发送消息</div>
        </div>
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
            success: 2002
        };
    },
    modif: function(){
        this.setState({
            success: 2002
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
            case 2002: {
                return null
            }
            case 2000: {
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
                                {this.props.tips[this.state.success-2001]}
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
  <SendInformation />,
  document.getElementsByClassName("page1")[0]
);
