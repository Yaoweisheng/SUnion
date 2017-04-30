/*login.js*/
var Index = React.createClass({
	render : function(){
		return (
			<div>
				<Welcome />
				<Login />
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
	render : function(){
		return (
			<div className="nav">
				<ul className="nav nav-tabs">
					<li className=" teacher">老师</li>
					<li className="active student">学生</li>
					<li className="system">系统</li>
				</ul>
			</div>
			);
	}
});

var Panel = React.createClass({
	render : function(){
		return (
			<div className="panel">
				<div className="header">教师登录</div>
				<User />
				<div className="btn">登录</div>
			</div>
			);
	}
});

var User = React.createClass({
	render : function(){
		return (
			<div className="form">
					<ul>
						<li>
							<select>
								<option>选择省</option>
								<option>选择省</option>
								<option>选择省</option>
							</select>
							<select>
								<option>选择市</option>
								<option>选择市</option>
								<option>选择市</option>
							</select>
							<select className="school">
								<option>选择学校</option>
								<option>选择学校</option>
								<option>选择学校</option>
							</select>
						</li>
						<li>
							<label>工号</label>
							<input type="text" name="" />
						</li>
						<li>
							<label>密码</label>
							<input type="password" name="" />
						</li>
						<li>
							<div className="rem_pass">记住密码</div>
							<input className="rem_pass" type="checkbox" name="" />
						</li>
					</ul>
			</div>
			);
	}
});

ReactDOM.render(
  <Index />,
  document.getElementsByClassName("page07")[0]
);