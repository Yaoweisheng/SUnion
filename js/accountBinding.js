var AccountBlinding = React.createClass({
	render :function(){
		return (
			<div className="panel panel-default">
				<div className="panel-body">
					<Identity />
					<BlindingInfor />
				</div>
			</div>
			);
	}
});

var Identity = React.createClass({
	render :function(){
		return (
			<ul className="nav nav-tabs">
				<li className="teacher active"><a href="#">我是老师</a></li>
				<li className="student"><a href="#">我是学生</a></li>
			</ul>
			);
	}
});

var BlindingInfor = React.createClass({
	render :function(){
		return (
			<div className="form weui-cells weui-cells_form">
				<Province />
				<Downtown />
				<School />
				<StudentId />
				<Password />
				<Identification />
			</div>
			);
	}
});

var Province = React.createClass({
	render :function(){
		return (
	            <div className="weui-cell">
	                <div className="weui-cell__hd"><label className="weui-label">省份</label></div>
	                <div className="weui-cell__bd">
	                	<select>
	                		<option>(请选择省份)</option>
	                		<option>浙江省</option>
	                		<option>北京市</option>
	                		<option>上海市</option>
	                	</select>
	                </div>
	            </div>
			);
	}
});

var Downtown = React.createClass({
	render :function(){
		return (
	            <div className="weui-cell">
	                <div className="weui-cell__hd"><label className="weui-label">市区</label></div>
	                <div className="weui-cell__bd">
	                	<select>
	                		<option>(请选择市区)</option>
	                		<option>杭州市</option>
	                		<option>杭州市</option>
	                		<option>杭州市</option>
	                	</select>
	                </div>
	            </div>
			);
	}
});

var School = React.createClass({
	render :function(){
		return (
	            <div className="weui-cell">
	                <div className="weui-cell__hd"><label className="weui-label">学校</label></div>
	                <div className="weui-cell__bd">
	                	<select>
	                		<option>(请选择学校)</option>
	                		<option>浙江理工大学</option>
	                		<option>浙江理工大学</option>
	                		<option>浙江理工大学</option>
	                	</select>
	                </div>
	            </div>
			);
	}
});

var StudentId = React.createClass({
	render :function(){
		return (
	            <div className="weui-cell">
	                <div className="weui-cell__hd"><label className="weui-label">学号</label></div>
	                <div className="weui-cell__bd">
	                    <input className="weui-input" type="number" pattern="[0-9]*" placeholder="请输入学号"/>
	                </div>
	            </div>
			);
	}
});

var Password = React.createClass({
	render :function(){
		return (
	            <div className="weui-cell">
	                <div className="weui-cell__hd"><label className="weui-label">教务密码</label></div>
	                <div className="weui-cell__bd">
	                    <input className="weui-input" type="password" placeholder="请输入教务密码"/>
	                </div>
	            </div>
			);
	}
});

var Identification = React.createClass({
	render :function(){
		return (
			    <div className="weui-btn-area">
			        <a className="weui-btn weui-btn_plain-primary" href="javascript:" id="showTooltips">重置</a>
			        <a className="weui-btn weui-btn_primary" href="javascript:" id="showTooltips">提交</a>
			    </div>
			);
	}
});



ReactDOM.render(
  <AccountBlinding />,
  document.getElementsByClassName("page11")[0]
);