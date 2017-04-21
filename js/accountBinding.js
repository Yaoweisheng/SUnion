var AccountBlinding = React.createClass({
	render :function(){
		return (
			<div className="panel panel-default">
				<div className="panel-body">
					<Identity />
					<BlindingInfor />
					<Tip />
				</div>
			</div>
		);
	}
});

var Identity = React.createClass({
	getDefaultProps: function() {
	    return {
	    };
	},
	getInitialState: function() {
	    return {
	    	teacher: 1
	    };
	},
	studentClick: function(event) {
		alert(0)
		this.setState({
			teacher: 0
		},
			function(){
				PubSub.publish('teacher_change', this.state.teacher)
				alert("0")
			}
		)
	},
	teacherClick: function(event) {
		alert(1)
		this.setState({
			teacher: 1
		},
			function(){
				PubSub.publish('teacher_change', this.state.teacher)
				alert("1")
			}
		)
	},
	render :function(){
		return (
			<ul className="nav nav-tabs">
				<li className={this.state.teacher ? "teacher active" : "teacher"} onClick={this.teacherClick}><a href="#">我是老师</a></li>
				<li className={!this.state.teacher ? "student active" : "student"} onClick={this.studentClick}><a href="#">我是学生</a></li>
			</ul>
		);
	}
});

var BlindingInfor = React.createClass({
	render :function(){
		return (
			<div className="form weui-cells weui-cells_form">
				<Province />
				<City />
				<District />
				<School />
				<StudentId />
				<Password />
				<Identification />
			</div>
			);
	}
});

var Province = React.createClass({
	getDefaultProps: function() {
	    return {
	    	provinces:  ['“浙江省”','”安徽省”','”福建省”']
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
	            <div className="weui-cell">
	                <div className="weui-cell__hd"><label className="weui-label">省份</label></div>
	                <div className="weui-cell__bd">
	                	<select onChange={this.provinceChange}>
	                		<option>(请选择省份)</option>
	                		{
	                			this.props.provinces.map(function (province, index) {
            						return <option key={index}>{province}</option>
          						})
	                		}
	                	</select>
	                </div>
	            </div>
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
			/*this.setState({
		      	  citys: ['1', '2', '3']
		    })*/
		    // alert(province)
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
	            <div className="weui-cell">
	                <div className="weui-cell__hd"><label className="weui-label">市</label></div>
	                <div className="weui-cell__bd">
	                	<select onChange={this.cityChange}>
	                		<option>(请选择市)</option>
	                		{
	                			this.state.citys.map(function (city, index) {
            						return <option key={index}>{city}</option>
          						})
	                		}
	                	</select>
	                </div>
	            </div>
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
			this.districtsRequest = $.get('sch-getDistrictOfCity.action?province=' + city, function (result) {
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
	            <div className="weui-cell">
	                <div className="weui-cell__hd"><label className="weui-label">区</label></div>
	                <div className="weui-cell__bd">
	                	<select onChange={this.districtsChange}>
	                		<option>(请选择区)</option>
	                		{
	                			this.state.districts.map(function (district, index) {
            						return <option key={index}>{district}</option>
          						})
	                		}
	                	</select>
	                </div>
	            </div>
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
			this.districtsRequest = $.get('sch-getSchoolOfDistrict.action?province=' + district, function (result) {
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
	            <div className="weui-cell">
	                <div className="weui-cell__hd"><label className="weui-label">学校</label></div>
	                <div className="weui-cell__bd">
	                	<select onChange={this.schoolsChange}>
	                		<option>(请选择学校)</option>
	                		{
	                			this.state.schools.map(function (school, index) {
            						return <option key={index}>{school}</option>
          						})
	                		}
	                	</select>
	                </div>
	            </div>
			);
	}
});

var StudentId = React.createClass({
	getDefaultProps: function() {
	    return {
	    	numbers: ["学号", "工号"]
	    };
	},
	getInitialState: function() {
	    return {
	    	numberIndex: 1,
	    	number: ''
	    };
	},
	numberChange: function(event) {
		this.setState({
			number: event.target.value
		},
			function(){
    			PubSub.publish('number_change', this.state.number)
			}
		)
	},
	componentDidMount: function () {
		this.pubsub_token = PubSub.subscribe('teacher_change', function (topic, data) {
			this.setState({
				numberIndex: data
			})
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token)
	},
	render :function(){
		return (
	            <div className="weui-cell">
	                <div className="weui-cell__hd"><label className="weui-label">{this.props.numbers[this.state.numberIndex]}</label></div>
	                <div className="weui-cell__bd">
	                    <input className="weui-input" onChange={this.numberChange} type="number" pattern="[0-9]*" placeholder="请输入学号"/>
	                </div>
	            </div>
			);
	}
});

var Password = React.createClass({
	getDefaultProps: function() {
	    return {
	    };
	},
	getInitialState: function() {
	    return {
	    	password: ''
	    };
	},
	passwordChange: function(event) {
		this.setState({
			password: event.target.value
		},
			function(){
    			PubSub.publish('password_change', this.state.password)
			}
		)
	},
	componentDidMount: function () {

	},
	componentWillUnmount: function () {

	},
	render :function(){
		return (
	            <div className="weui-cell">
	                <div className="weui-cell__hd"><label className="weui-label">教务密码</label></div>
	                <div className="weui-cell__bd">
	                    <input className="weui-input" onChange={this.passwordChange} type="password" placeholder="请输入教务密码"/>
	                </div>
	            </div>
			);
	}
});

var Identification = React.createClass({
	getDefaultProps: function() {
	    return {
	    };
	},
	getInitialState: function() {
	    return {
	    	identity: 1,
	    	school: '',
	    	number: '',
	    	password: '',

	    };
	},
	componentDidMount: function () {
		this.pubsub_token0 = PubSub.subscribe('teacher_change', function (topic, data) {
			this.setState({
				numberIndex: data
			})
		}.bind(this))
		this.pubsub_token1 = PubSub.subscribe('school_change', function (topic, data) {
			this.setState({
				school: data
			})
		}.bind(this))
		this.pubsub_token2 = PubSub.subscribe('number_change', function (topic, data) {
			this.setState({
				number: data
			})
		}.bind(this))
		this.pubsub_token3 = PubSub.subscribe('password_change', function (topic, data) {
			this.setState({
				password: data
			})
		}.bind(this))
	},
	componentWillUnmount: function () {
		PubSub.unsubscribe(this.pubsub_token0)
		PubSub.unsubscribe(this.pubsub_token1)
		PubSub.unsubscribe(this.pubsub_token2)
		PubSub.unsubscribe(this.pubsub_token3)
	},
	submit: function(){
		$.post("/user-bind.action",
	    {
	        identity: this.state.identity,
	        school: this.state.school,
	        number: this.state.number,
	        password: this.state.password,
	    },
	        function(data,status){
	        // alert("数据: \n" + data + "\n状态: " + status);
			PubSub.publish('submit_code', data)
	    });
	},
	render :function(){
		return (
			    <div className="weui-btn-area">
			        {/*<a className="weui-btn weui-btn_plain-primary" href="javascript:" id="showTooltips">重置</a>*/}
			        <a className="weui-btn weui-btn_primary" onClick={this.submit} href="javascript:" id="showTooltips">提交</a>
			    </div>
			);
	}
});

var Tip = React.createClass({
	getDefaultProps: function() {
	    return {
	    	tips: ['找不到该学生', '找不到该老师', '密码错误', '用户已绑定']
	    };
	},
	getInitialState: function() {
	    return {
	    	success: 1005
	    };
	},
	modif: function(){
		this.setState({
			success: 1005
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
			case 1005: {
				return null
			}
			case 1000: {
				return (
					    <div>
					        <div className="weui-mask_transparent"></div>
					        <div className="weui-toast">
					            <i className="weui-icon-success-no-circle weui-icon_toast"></i>
					            <p className="weui-toast__content">绑定成功</p>
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
			                    {this.props.tips[this.state.success - 1001]}
			                </div>
			                <div className="weui-dialog__ft">
			                    {/*<a href="javascript:;" className="weui-dialog__btn weui-dialog__btn_default">辅助操作</a>*/}
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
  <AccountBlinding />,
  document.getElementsByClassName("page11")[0]
);