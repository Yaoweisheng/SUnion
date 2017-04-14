/*teacherfreeTime.js*/
var TeacherFreeTime = React.createClass({
	render : function(){
		return (
			<div>
				<Panel />
				<div className="fill01"></div>
				<TimeTable />
				<div className="f40"></div>
				<Send />
			</div>
		);
	}
});

var Header = React.createClass({
	render : function(){
		return (
			<header>
				<h3>空闲时间统计</h3>
			</header>
			);
	}
});

var Panel = React.createClass({
	render: function(){
		return (
			<div className="panel panel-default fixed">
				<div className="panel-body">
					<Class />
					<Time />
				</div>
			</div>
		)
	}
})

var Class = React.createClass({
	render : function(){
		return (
			<div className="class">
				<label>发送班级</label>
				<select>
					<option>（点击选择班级）</option>
					<option>（点击选择班级）</option>
					<option>（点击选择班级）</option>
				</select>
			</div>
			);
	}
});

var TimeTable = React.createClass({
	render : function(){
		return (
			<div className="timetable">
				<Table />
			</div>
			);
	}
});

var Time = React.createClass({
	render : function(){
		return (
			<div className="timetable">
				<div className="time">
					<select>
					<option>第二学期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第五周</option>
					<option>第二学期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第六周</option>
					<option>第二学期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第七周</option>
					</select>
				</div>
			</div>
		);
	}
});

var Table = React.createClass({
	render : function(){
		return (
			<table className="table table-striped">
				<Thead />
				<Tbody />
			</table>
			);
	}
});

var Thead = React.createClass({
	render : function(){
		return (
			<thead className="fixed">
			    <tr>
			      <th></th>
			      <th>日</th>
			      <th>一</th>
			      <th>二</th>
			      <th>三</th>
			      <th>四</th>
			      <th>五</th>
			      <th>六</th>
			    </tr>
			</thead>
		  );
	}
});

var Tbody = React.createClass({
	render : function(){
		return (
			<tbody>
		  		<tr className="fill02"></tr>
				<Tr />
				<Tr />
				<Tr />
				<Tr />
				<Tr />
				<Tr />
				<Tr />
				<Tr />
				<Tr />
				<Tr />
				<Tr />
				<Tr />
			</tbody>
			);
	}
}); 

var Tr = React.createClass({
	render : function(){
		return (
		    <tr>
		      <td>1</td>
		      <td className="check"></td>
		      <td></td>
		      <td></td>
		      <td className="check"></td>
		      <td></td>
		      <td></td>
		      <td></td>
		    </tr>
			);
	}
});


var Send = React.createClass({
	render : function(){
		return (
			<footer>
				<div className="send">发送给学生</div>
			</footer>
			);
	}
});

ReactDOM.render(
	<TeacherFreeTime />,
	document.getElementsByClassName("page12")[0]
	);
