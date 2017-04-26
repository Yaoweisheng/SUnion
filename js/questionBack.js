/*questionBack.js*/
var QuestionBack = React.createClass({
	render: function(){
		return (
			<div >
				<Logo />
				<Information />
			</div>);
	}
});

var Logo = React.createClass({
	render: function(){
		return (
			<div className="logo">
				<div className="logo_img">
				</div>
			</div>
			);
	}
});

var Information = React.createClass({
	render: function(){
		return (
			<div className="information">
				<Content />

				<Send />

			</div>
			);
	}
});

var Content = React.createClass({
	render: function(){
		return (
				<div className="information_content">
					<span>反馈内容:</span>
					<textarea autofocus="autofocus"></textarea>
				</div>
			);
	}
});

var Send = React.createClass({
	render: function(){
		return (
				<div className="send">提交申请</div>
			);
	}
});


ReactDOM.render(
  <QuestionBack />,
  document.getElementsByClassName("page7")[0]
);