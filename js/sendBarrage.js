/*sendBarrage.js*/
var SendBarrage = React.createClass({
	render: function(){
		return (
			<div >
				<Barrages />
				<div className="fill"></div>
				<Edit />
			</div>);
	}
});

var Barrages = React.createClass({
	render: function(){
		return (
			<div className="weui-cells">
				<Barrage />
				<Barrage />
				<Barrage />
				<Barrage />
				<Barrage />
				<Barrage />
				<Barrage />
				<Barrage />
				<Barrage />
				<Barrage />
			</div>);
	}
});

var Barrage = React.createClass({
	render: function(){
		return (
			<div className="weui-cell">
				<UserName />
				<Text />
				{/*<Illustration />*/}
			</div>);
	}
});

var UserName = React.createClass({
	render: function(){
		return (
			<div className="weui-cell__bd username">
				<p>用户名：</p>
			</div>);
	}
});

var Text = React.createClass({
	render: function(){
		return (
			<div className="weui-cell__bd text">
				<p>弹幕弹幕幕弹幕弹幕弹幕弹幕弹幕弹幕弹幕弹幕</p>
			</div>);
	}
});

/*var Illustration = React.createClass({
	render: function(){
		return (
			<div className="weui-cell__ft username">文字说明</div>);
	}
});*/

var Edit = React.createClass({
	render: function(){
		return (
			<div className="panel panel-default fixed">
			    <div className="panel-body">
			    	<span>发送消息：</span>
			    	<div>
			    		<form>
			    			<textarea></textarea>
							<a className="weui-btn weui-btn_primary" href="javascript:" id="showTooltips">提交</a>
			    		</form>
			    	</div>
			    </div>
			</div>);
	}
});

ReactDOM.render(
  <SendBarrage />,
  document.getElementsByClassName("page10")[0]
);