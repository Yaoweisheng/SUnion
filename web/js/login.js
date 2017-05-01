/*login.js*/
var Index = React.createClass({
	render : function(){
		return (
			<div>
				<Welcome />
				<Login />
				<Tip />
			</div>
			);
	}
});

var Welcome = React.createClass({
	render : function(){
		return (
			<div>
				<div className="bg">
					<div className="bg1"></div>
					<div className="bg2"></div>
				</div>
				<div className="sun">
					<div className="logo"></div>
					<div className="title">欢迎使用SUnion系统</div>
				</div>
			</div>
			);
	}
});

var Login = React.createClass({
	render : function(){
		return (
			<div className="login">
				<Nav />
				<Panel />
			</div>
			);
	}
});

var Nav = React.createClass({
	getDefaultProps: function() {
	    return {
	    };
	},
	getInitialState: function() {
	    return {
	    	index: 0
	    };
	},
	userClick: function(index) {
		this.setState({index: index}, function() {
			PubSub.publish("identity", index)
		})
	},
	render : function(){
		return (
			<div className="nav">
				<ul className="nav nav-tabs">
					<li className={this.state.index == 2 ? "system active": "system"} onClick={this.userClick.bind(this, 2)}>系统管理员</li>
					<li className={this.state.index == 1 ? "student active": "student"} onClick={this.userClick.bind(this, 1)}>教务处</li>
					<li className={this.state.index == 0 ? "teacher active": "teacher"} onClick={this.userClick.bind(this, 0)}>老师</li>
				</ul>
			</div>
			);
	}
});

var Panel = React.createClass({
	getDefaultProps: function() {
	    return {
	    	headers: ["教师登录", "教务处登录", "系统管理员登录"]
	    };
	},
	getInitialState: function() {
	    return {
	    	identity: 0
	    };
	},
	componentDidMount: function () {
		this.pubsub_token = PubSub.subscribe('identity', function (topic, data) {
			this.setState({
			    identity: data
			})
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token)
	},
	render : function(){
		return (
			<div className="panel">
				<div className="header">{this.props.headers[this.state.identity]}</div>
				<User />
			</div>
			);
	}
});

var User = React.createClass({
	getDefaultProps: function() {
	    return {
	    	// provinces:  ch.bind.province
	    	provinces: ["浙江省","安徽省","山东省"]
	    };
	},
	getInitialState: function() {
	    return {
	    	school: -1,
	    	number: '',
	    	password: '',
	    	identity: 0
	    };
	},
	passwordChange: function(event) {
		this.setState({
			password: event.target.value
		},
			function(){

			}
		)
	},
	numberChange: function(event) {
		this.setState({
			number: event.target.value
		},
			function(){
			}
		)
	},
	submit: function() {
		$.post("weba-login.action",
	    {
			identity: this.state.identity,
	        schoolName: this.state.school,
	        number: this.state.number,
	        password: this.state.password,
	    },
        function(data,status){
         //alert("数据: \n" + data + "\n状态: " + status); 
		PubSub.publish('submit_code', data)

		if(data.msgCode == 5000) {
			switch(this.state.identity) {
				case 0: 
					setTimeout("window.location.href = '../edumanager/teacher/index.jsp'", 500)
					break;
				case 1: 
					var username = data.obj.edmName;
					var schoolId = data.obj.school.id;
					setTimeout("window.location.href='../edumanager/schoolmanager/index.html?username=' + username + '&schoolId=' + schoolId", 500)//（带参数跳转页面）
					break;
				case 2: 
					var username = data.obj.username;
					setTimeout("window.location.href='../edumanager/supermanager/index.html?username=' + username;", 500)//（带参数跳转页面）
			}
		}
	    });
	},
	componentDidMount: function () {
		this.pubsub_token0 = PubSub.subscribe('identity', function (topic, data) {
			this.setState({
			    identity: data
			}, function(){
				if(this.state.identity != 0) {
					this.setState({school: ""})
				}
			})
		}.bind(this))
		this.pubsub_token1 = PubSub.subscribe('school_change', function (topic, data) {
			this.setState({
				school: data
			})
		}.bind(this))

	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token0)
		PubSub.unsubscribe(this.pubsub_token1)
	},
	render : function(){
		return (
			<div className="form">
				<ul>
				{!this.state.identity?
				<li>
					<Province />
					<City />
					<District />
					<School />
				</li>
            	:<li></li>}
				<li>
					<label>工号</label>
					<input type="text" name="" onChange={this.numberChange} placeholder="请输入工号" />
				</li>
				<li>
					<label>密码</label>
					<input type="password" name="" onChange={this.passwordChange} placeholder="请输入教务密码" />
				</li>
				<li className="rem">
					<div className="rem_pass">记住密码</div>
					<input className="rem_pass" type="checkbox" name="" />
				</li>
			</ul>
			<div className="btn" onClick={this.submit}>登录</div>
		</div>
		);
	}
});
var Province = React.createClass({
	getDefaultProps: function() {
	    return {
	    	provinces:  ch.bind.province
	    };
	},
	getInitialState: function() {
	    return {
	    	province: ''
	    };
	},
	provinceChange: function(event) {
		this.setState(
			{
				province: event.target.value
			},
			function(){
    			PubSub.publish('province_change', this.state.province)
			}
		)
	},
	render :function(){
		return (
            	
            	<select value={this.state.province} onChange={this.provinceChange}>
        		<option value={-1}>选择省</option>
        		{
        			this.props.provinces.map(function (province, index) {
						return <option key={index} value={province}>{province}</option>
					})
        		}
            	</select>
			);
	}
});

var City = React.createClass({
	getDefaultProps: function() {
	    return {
	    };
	},
	getInitialState: function() {
	    return {
	    	citys: [],
	    	city: ''
	    };
	},
	componentDidMount: function () {
		this.pubsub_token = PubSub.subscribe('province_change', function (topic, province) {
			
			this.citysRequest = $.get('sch-getCityOfProvince.action?province=' + province, function (result) {
		      this.setState({
		      	  citys: result
		      })
		    }.bind(this))
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token)
    	this.citysRequest.abort()
	},
	cityChange: function(event) {
		this.setState(
			{
				city: event.target.value
			},
			function(){
    			PubSub.publish('city_change', this.state.city)
			}
		)
	},
	render :function(){
		return (
	            <select value={this.state.city} onChange={this.cityChange}>
	        		<option value={-1}>选择市</option>
            		{
            			this.state.citys.map(function (city, index) {
    						return <option key={index} value={city}>{city}</option>
  						})
            		}
            	</select>
			);
	}
});
var District = React.createClass({
	getDefaultProps: function() {
	    return {
	    };
	},
	getInitialState: function() {
	    return {
	    	districts: [],
	    	district: ''
	    };
	},
	componentDidMount: function () {
		this.pubsub_token = PubSub.subscribe('city_change', function (topic, city) {
			this.districtsRequest = $.get('sch-getDistrictOfCity.action?city=' + city, function (result) {
		      this.setState({
		      	  districts: result
		      })
		    }.bind(this))
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token)
    	this.districtsRequest.abort()
	},
	districtsChange: function(event) {
		this.setState(
			{
				district: event.target.value
			},
			function(){
    			PubSub.publish('districts_change', this.state.district)
			}
		)
	},
	render :function(){
		return (
	            <select value={this.state.district} onChange={this.districtsChange}>
            		<option value={-1}>选择区</option>
            		{
            			this.state.districts.map(function (district, index) {
    						return <option key={index} value={district}>{district}</option>
  						})
            		}
                </select>
			);
	}
});

var School = React.createClass({
	getDefaultProps: function() {
	    return {
	    };
	},
	getInitialState: function() {
	    return {
	    	schools: [],
	    	school: ''
	    };
	},
	componentDidMount: function () {
		this.pubsub_token = PubSub.subscribe('districts_change', function (topic, district) {
			this.districtsRequest = $.get('sch-getSchoolOfDistrict.action?district=' + district, function (result) {
		      this.setState({
		      	  schools: result
		      })
		    }.bind(this))
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token)
    	this.districtsRequest.abort()
	},
	schoolsChange: function(event) {
		this.setState(
			{
				school: event.target.value
			},
			function(){
    			PubSub.publish('school_change', this.state.school)
			}
		)
	},
	render :function(){
		return (
	            <select className="school" value={this.state.school} onChange={this.schoolsChange} >
            		<option value={-1}>选择学校</option>
            		{
            			this.state.schools.map(function (school, index) {
    						return <option key={index} value={school}>{school}</option>
  						})
            		}
            	</select>
			);
	}
});

var Tip = React.createClass({
	getDefaultProps: function() {
	    return {
	    	tips: ['找不到该老师', '找不到该教务管理员', '找不到该系统管理员', '密码错误']
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
				success: data.msgCode
			}, function() {

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
			case 5000: {
				return (
					    <div>
					        <div className="weui-mask_transparent"></div>
					        <div className="weui-toast">
					            <i className="weui-icon-success-no-circle weui-icon_toast"></i>
					            <p className="weui-toast__content">登录成功</p>
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
			                    {this.props.tips[this.state.success - 5001]}
			                </div>
			                <div className="weui-dialog__ft">
			                    {/*/*
						 * <a href="javascript:;"
						 * className="weui-dialog__btn
						 * weui-dialog__btn_default">辅助操作</a>*/}
			                    <a href="javascript:;" onClick={this.modif} className="weui-dialog__btn weui-dialog__btn_primary">修改</a>
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
  document.getElementsByClassName("page07")[0]
);