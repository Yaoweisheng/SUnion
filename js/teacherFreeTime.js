/*teacherfreeTime.js*/
var TeacherFreeTime = React.createClass({
	render : function(){
		return (
			<div className="page12">
			<Header />
			<div className="h40"></div>
			<Class />
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
			<Time />
			<Table />
			</div>
			);
	}
});

var Time = React.createClass({
	render : function(){
		return (
			<select className="time">
			<option>第二学期 第五周</option>
			<option>第二学期  第六周</option>
			<option>第二学期   第七周</option>
			</select>
			);
	}
});

var Table = React.createClass({
	render : function(){
		return (
			<table className="table table-bordered table-striped">
			<Thead />
			<Tbodys />
			</table>
			);
	}
});

var Thead = React.createClass({
	render : function(){
		return (
			<thead>
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

var Tbodys = React.createClass({
	render : function(){
		return (
			<tbody>
			<Tbody />
			<Tbody />
			<Tbody />
			<Tbody />
			<Tbody />
			<Tbody />
			<Tbody />
			<Tbody />
			<Tbody />
			<Tbody />
			<Tbody />
			<Tbody />
			</tbody>
			);
	}
}); 

var Tbody = React.createClass({
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
