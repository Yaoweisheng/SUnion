var AddCourse = React.createClass({
	render :function(){
		return (
			<div >
				<CourseAdd />
				<Save />
			</div>
			);
	}
});

var CourseAdd = React.createClass({
	render :function(){
		return (
			<div className="weui-cells weui-cells_form">
				{/*<CourseName />*/}
				<Course />
				<Course />
			</div>
			);
	}
});

var CourseName = React.createClass({
	render :function(){
		return (
			<div className="weui-cell">
	            <div className="weui-cell__hd"><label className="weui-label">课程名称</label></div>
	            <div className="weui-cell__bd">
	                <input className="weui-input" type="text" placeholder="请输入课程名称"/>
	            </div>
			</div>
			);
	}
});

var Course = React.createClass({
	render :function(){
		return (
			<div className="weui-cells weui-cells_form">
				{/*<div className="weui-cells__title">&nbsp;</div>*/}
				<CoursePlace />
				<CourseNumber />
			</div>
			);
	}
});

var CoursePlace = React.createClass({
	render :function(){
		return (
	        <div className="weui-cell">
	            <div className="weui-cell__hd">
	                <label className="weui-label">地点</label>
	            </div>
	            <div className="weui-cell__bd">
	                <input className="weui-input" type="text" placeholder="请输入课程地点" />
	            </div>
	        </div>
			);
	}
});

var CourseNumber = React.createClass({
	render :function(){
		return (
	        <div className="weui-cell">
	            <div className="weui-cell__hd"><label for="" className="weui-label">节数</label></div>
	            <div className="weui-cell__bd">
	            	<span>
		            	<select>
		            		<option>周一</option>
		            		<option>周二</option>
		            		<option>周三</option>
		            	</select> 
		            	<select>
		            		<option>第4节</option>
		            		<option>第5节</option>
		            		<option>第6节</option>
		            	</select>
		            	-
		            	<select>
		            		<option>第4节</option>
		            		<option>第5节</option>
		            		<option>第6节</option>
		            	</select>
		            </span>
	            </div>
	        </div>
			);
	}
});

var Save = React.createClass({
	render :function(){
		return (
		    <div className="weui-btn-area">
		        <a className="weui-btn weui-btn_primary" href="javascript:" id="showTooltips">添加其他时段</a>
		        <a className="weui-btn weui-btn_plain-primary" href="javascript:" id="showTooltips">保存</a>
		    </div>
			);
	}
});

ReactDOM.render(
  <AddCourse />,
  document.getElementsByClassName("page13")[0]
);