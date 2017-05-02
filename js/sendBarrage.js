/*sendBarrage.js*/
var func = function(i) {
	// alert("func")
	PubSub.publish('func', "这是个弹幕" + i)
}
var SendBarrage = React.createClass({
	getDefaultProps: function() {
	    return {
	    };
	},
	getInitialState: function() {
	    return {
	    	index: 0
	    };
	},
	componentDidMount: function () {
		// this.refs.bottom.click()
		func(this.state.index)
	},
	componentWillUnmount: function () {
	},
	click: function() {
		this.setState({
			index: this.state.index+1
		}, function() {
			func(this.state.index)
		})
	},
	render: function(){
		return (
			<div >
				<a ref="bottom" href="#bottom" className="toBottom" onClick={this.click} >bottom</a>
				<Barrages />
				<div className="fill01"></div>
				{/*<div className="fill02" id="bottom"></div>*/}
				<a name="bottom"></a>
				<Edit />
			</div>);
	}
});

var Barrages = React.createClass({
	getInitialState: function() {
	    return {
	    	bas: []
	    };
	},
    componentDidMount: function () {
        this.pubsub_token = PubSub.subscribe('func', function (topic, data) {
            // alert("get")
            // alert(data)
            var bas = this.state.bas
            bas.push(data)
            this.setState({bas: bas})
        }.bind(this))
    },
    componentWillUnmount: function () {
        PubSub.unsubscribe(this.pubsub_token)
    },
	render: function(){
		return (
			<div className="weui-cells">
				{
					this.state.bas.map(function(ba, index) {
						return <Barrage key={index} ba={ba} />
					})
				}
			</div>);
	}
});

var Barrage = React.createClass({
	render: function(){
		return (
			<div className="weui-cell">
				{/*<UserName />*/}
				<Text ba={this.props.ba} />
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
    componentDidMount: function () {
    	this.refs.ba.style.backgroundColor = (rand(125, 255), rand(125, 255), rand(125, 255))
    },
	render: function(){
		return (
			<div className="weui-cell__bd text">
				<p ref="ba">{this.props.ba}</p>
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