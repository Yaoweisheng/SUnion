/*sendMessage.js*/
var weeks = ['周日','周一','周二','周三','周四','周五','周六']
var numStr = function(i, j) {
    var str = ""
    for(; i <= j; i++) {
        str += i + ""
    }
    return str
}
var Index = React.createClass({
	getDefaultProps: function() {
	    return {
	    };
	},
	getInitialState: function() {
	    return {
	    };
	},
	render:function(){
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

var Message = React.createClass({
	render : function(){
		return (
			<div className="message">
				<StuList />
				<Content />
				<HisMess />
			</div>
		);
	}
});

var Content = React.createClass({
	render : function(){
		return (
			<div className="content">
				<Search />
				<StuDetail />
				<Send />
			</div>
		);
	}
});

var StuList = React.createClass({
	render : function(){
		return (
			<div className="list">
				<Class />
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
            input: ""
        };
    },
    componentDidMount: function () {
    },
    componentWillUnmount: function () {
    },
    inputChange: function(event) {
        this.setState({input: event.target.value})
    },
    stuSearch: function() {
        /*$.post(".action",
        {
            openId: request.teacher.openId,
            studentName: this.state.stuName,
        },
            function(data,status){
                PubSub.publish('stu_search', data)
        });*/
        var data = [{"id":1,"sname":"曹辉","snumber":"1","colloge":"启新学院","clazz":"14电子信息实验班","headimageUrl":"img/new2.png","inClasses":[{"id":1,"cname":"算法设计基础","week":1,"index":1,"toIndex":2},{"id":6,"cname":"算法设计基础","week":1,"index":3,"toIndex":5}]}]
        PubSub.publish('stu_search', data)
    },
	render: function() {
		return (
			<div className="search">
				<input type="text" placeholder="请输入学生姓名" value={this.state.input} onChange={this.inputChange} />
				<div className="btn" onClick={this.stuSearch}>搜索</div>
			</div>
		)
	}
})
var StuDetail = React.createClass({
    getDefaultProps: function() {
        return {
            };
    },
    getInitialState: function() {
        return {
            // students: [{"id":1,"sname":"曹辉","snumber":"1","colloge":"启新学院","clazz":"14电子信息实验班","headimageUrl":"img/student_img.png","inClasses":[{"id":1,"cname":"算法设计基础","week":1,"index":1,"toIndex":2},{"id":6,"cname":"算法设计基础","week":1,"index":3,"toIndex":5}]}],
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
	render: function() {
		return (
			<div className="stu_detail">
	            <ul>
	                {
		                this.state.students.map(function (stu, index) {
		                    return <Stu key={index} stu={stu} />
		                })
		            }
	            </ul>
			</div>
		)
	}
})
var Stu = React.createClass({
    getDefaultProps: function() {
        return {
            };
    },
    getInitialState: function() {
        return {
            check: true
        };
    },
	change: function() {

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
	render: function() {
		return (
			<li className="s" onClick={this.studentClick}>
                <input type="checkbox" name="" onClick={this.studentClick} onChange={this.change} checked={this.state.check?"checked":""} />
                <img src={this.props.stu.headimageUrl} />
                <div>姓名：{this.props.stu.sname}</div>
                <div>学号：{this.props.stu.snumber}</div>
                <div className="det">
                    <ul>
                        <li>学院：{this.props.stu.colloge}</li>
                        <li>班级：{this.props.stu.clazz}</li>
                        <Classes inClasses={this.props.stu.inClasses} />
                    </ul>
                </div>
            </li>
		)
	}
})
var Classes = React.createClass({
    render: function() {
        var inClasses = []
        for(var index = 0; index < this.props.inClasses.length; index++) {
            var c = this.props.inClasses[index]
            inClasses.push(<li key={index}>{c.cname + " " + weeks[c.week] + numStr(c.index, c.toIndex) + "节"}</li>)
        }
        return (
            <li>
                <div className="course02">课程：</div>
                <ul className="course03">
                    {inClasses}
                </ul>
            </li>
        )
    }
})
var HisMess = React.createClass({
	getDefaultProps: function() {
	    return {
	    	messages: [{"time":"2017-04-11 16:13:22","content":"今天不上课啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦，自由复习！！","students":[{"id":1,"sname":"曹辉","snumber":"1","headimageUrl":"img/student_img.png"},{"id":2,"sname":"璐璐","snumber":"2","headimageUrl":"img/student_img.png"}]},{"time":"2017-05-12 08:13:22","content":"嗯，今天很生气","students":[{"id":2,"sname":"璐璐","snumber":"2","headimageUrl":"img/student_img.png"}]}]
	    	// message: ch.history.teacher
	    };
	},
	render: function() {
		return (
			<div className="his_mess">
				<div className="header">历史消息</div>
				<div className="search">
					<input type="text" />
					<div className="btn">搜索</div>
				</div>
				<ul>
				{
					this.props.messages.map(function(mess, index) {
						return <Mess key={index} message={mess} index={index} />
					})
				}
				</ul>
			</div>
		)
	}
})

var Mess = React.createClass({
	getDefaultProps: function() {
	    return {
	    	
	    };
	},
	getInitialState: function() {
	    return {
	    	show: false,
	    	del: false
	    };
	},
    delete: function() {
    	this.setState({del: true})
    },
	showChange: function(){
		this.setState({
			show: !this.state.show
		}, function(){
			// var s = {
			// 	show: this.state.show,
			// 	index: index
			// }
			// PubSub.publish("show", s)
		})
	},
	render :function(){
		return (
			<li className={this.state.show?"show":""} style={{display:this.state.del?"none":"block"}} >
				<div onClick={this.showChange}>
					<div className="time">{this.props.message.time}</div>
					<div>发送内容:</div>
					<div>{this.props.message.content}</div>
					<div className="btns">
						<div className="btn" onClick={this.delete}>删除</div>
						<div className="btn">详情</div>
					</div>
				</div>
				<Detail show={this.state.show} index={this.props.index} detail={this.props.message.students}/>
			</li>
		);
	}
});
var Detail = React.createClass({
	getDefaultProps: function() {
	    return {	    	
	    };
	},
	getInitialState: function() {
	    return {
	    	// height: "0px",
	    	h2: this.props.detail.length * 40,
	    };
	},
	componentDidMount: function () {
		/*this.pubsub_token = PubSub.subscribe('show', function (topic, s) {
			if(this.props.index == s.index) {
				this.setState({height: s.show?(this.state.h2 + "px"):"0px"})
			}
		}.bind(this))*/
	},
	componentWillUnmount: function () {
		// PubSub.unsubscribe(this.pubsub_token)
	},
	render: function(){
		// if(this.props.show) {
				// alert(this.props.detail[0].sname)
			return(
				<div className="detail" style={{height:this.props.show?(this.state.h2 + "px"):"0px"}}>
					<ul>
						{
							// this.props.show ?(
								this.props.detail.map(function(stu, index) {
									return (
									<li key={index} style={{display:!this.props.show?"none":"block"}}>
										<img src={stu.headimageUrl} />
										<div>姓名:{stu.sname}</div>
										<div>学号:{stu.snumber}</div>
									</li>
									)
								}.bind(this))
							// )
							/*:(
								this.props.detail.map(function(stu, index) {
									return (
									<li key={index} style={{borderBottom: "#fff", height: "40px"}}>
									</li>
									)
								})
							)*/
						}
					</ul>
				</div>
			
			)
		// }
		// else return null
	}
}
)
var Class = React.createClass({
    getDefaultProps: function() {
        return {
            // course:ch.teacher.classes
            course: {"total":12,"classes":[{"id":1,"cname":"算法设计基础","week":1,"index":1,"toIndex":2, "croom": "2n327", "totalStu": 5},{"id":6,"cname":"算法设计基础","week":1,"index":3,"toIndex":5, "croom": "2n327", "totalStu": 5}]}
        };
    },
	render : function(){
		return (
			<div className="students">
			{
				this.props.course.classes.map(function(c, index) {
					return (
						<div key={index}>
							<Course class={c} />
							<Students class={c} />
						</div>
					)
				})
			}
			</div>
		);
	}
});

var Course = React.createClass({
	getInitialState: function() {
		return {
			checkAll: false,
			show: false
		}
	},
	cClick: function() {
		if(!this.state.show) {
			this.setState({show: true, checkAll: true}, function(){
				PubSub.publish("show", this.props.class.id)
			})
		}
		else {
			this.setState({checkAll: !this.state.checkAll}, function() {
				if(!this.state.checkAll) {
					this.setState({show: false}, function(){
						PubSub.publish("close", this.props.class.id)
					})
				}
			})
		}
	},
	change: function() {

	},
	render : function(){
		return (
				<div onClick={this.cClick} className="cou">
					<span className="course">{this.props.class.cname + weeks[this.props.class.week] + numStr(this.props.class.index, this.props.class.toIndex) + "节(" + this.props.class.totalStu + "人)"}</span>
					{/*<input type="checkbox" onChange={this.change} checked={this.state.checkAll?"checked":""} name="" />*/}
				</div>
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
        	// students: [{"id":"2","sname":"张三","snumber":"2014339960011","headimageUrl":"img/news1.png"},{"id":"6","sname":"李四","snumber":"2014339960015","headimageUrl":"img/student_img.png"}],
            students: [],
        };
    },
    componentDidMount: function() {
    	this.pubsub_token0 = PubSub.subscribe("show", function(topic, id) {
    		// alert(this.props.id)
    		if(this.props.class.id == id) {
    			//ajax
    			/* $.post("tc-getStuOfCid.action",
                   {
                        cid: this.props.id
                   },
                    function(data,status){
                    	this.setState({students: data})
                    });*/
                var data = [{"id":"2","sname":"张三","snumber":"2014339960011","headimageUrl":"img/news1.png"},{"id":"6","sname":"李四","snumber":"2014339960015","headimageUrl":"img/student_img.png"}]
    			this.setState({students: data}, function(){
					PubSub.publish("class_show", data)
    			})
    		}
    	}.bind(this))
    	this.pubsub_token1 = PubSub.subscribe("close", function(topic, id) {
    		if(this.props.class.id == id) {
    			this.setState({students: []})
    		}
    	}.bind(this))
    },
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token0)
		PubSub.unsubscribe(this.pubsub_token1)
	},
	render : function(){
		// alert(this.state.students[0].id)
		return (
				<ul>
				{
					this.state.students.map(function(s, index) {
						return <Student key={index} stu={s} />
					})
				}
				</ul>
			);
	}
});

var Student = React.createClass({
	getInitialState: function() {
		return {
			check: true
		}
	},
	stuClick: function() {
		this.setState({check: !this.state.check}, function() {
			var data = {
				id: this.props.stu.id,
				check: this.state.check
			}
			PubSub.publish("check_one", data)
		})
	},
	change: function() {

	},
	render : function(){
		// alert(this.props.stu.sname)
		return (
			<li onClick={this.stuClick}>
				<div className="infor"><span className="name">{this.props.stu.sname}</span><span >{this.props.stu.snumber}</span></div>
				<input type="checkbox" onChange={this.change} checked={this.state.check?"checked":""} name="" />
			</li>
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
            content: '',
            idArray:[],
            ids: '',
        };
    },
    contentChange: function(event){
        this.setState({content: event.target.value})
    },
    send: function(){
	// alert(this.state.cId)
        // if(this.state.cId != -1) {
                       
            var s = this.state.idArray.join(',')
            this.setState({ids:s}, function() {
                 alert(this.state.ids)
                /*$.post("tc-sendNotice.action",
                {
                    // openId:ch.teacher.openId,
                    ids:this.state.ids,
                    content: this.state.content
                },
                    function(data,status){
                    PubSub.publish('submit_code', data);
                });*/
            })
        // }
    },
    componentDidMount: function () {
        this.pubsub_token0 = PubSub.subscribe('class_show', function (topic, data) {
            var a = this.state.idArray
            for(var i = 0; i < data.length; i++) {
            	if(a.indexOf(data[i].id) == -1) {
            		a.push(data[i].id)
            	}
            }
            this.setState({idArray: a})
        }.bind(this))
        this.pubsub_token1 = PubSub.subscribe('stu_search', function (topic, data) {
            // alert(data[0].id)
                // alert(data[0].id)
            var a = this.state.idArray
            for(var i = 0; i < data.length; i++) {
            	if(a.indexOf(data[i].id) == -1) {
            		a.push(data[i].id)
            	}
            }
            this.setState({idArray: a})
        }.bind(this))
        this.pubsub_token2 = PubSub.subscribe('check_one', function (topic, stu) {
            if(stu.check){
                var a = this.state.idArray
            	if(a.indexOf(stu.id) == -1) {
            		a.push(stu.id)
            	}
                this.setState({idArray: a})
            }
            else {
                var b = this.state.idArray
                for(var i = 0; i < b.length; i++) {
                    if(b[i] == stu.id){
                        b.splice(i, 1)
                        break
                    }
                }
                this.setState({idArray: b})
            }
        }.bind(this))
    },
    componentWillUnmount: function () {
        PubSub.unsubscribe(this.pubsub_token0)
        PubSub.unsubscribe(this.pubsub_token1)
        PubSub.unsubscribe(this.pubsub_token2)
    },
	render: function() {
		return (
			<div className="send">
			<div className="header">发送内容:</div>
			<textarea onChange={this.contentChange}></textarea>
			<div className="btn" onClick={this.send}>发送信息</div>
			</div>
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
  document.getElementsByClassName("page04")[0]
);