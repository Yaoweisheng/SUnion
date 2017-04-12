//sendInformation.js
    var SendInformation = React.createClass({
        render: function(){
          return(
            <div>
	    	  <header>
		 		<h3>发送消息</h3>
			  </header>
              <div className="h40"></div>
              <Course />
              <Students />
              <div className="f40"></div>   
              <Information />
            </div>
          );
         }
        });
    var Line = React.createClass({
    	render: function(){
    		return <div className="line"></div>;
    	}
    });

    var Course = React.createClass({
        render: function() {
	        return (
	          <div className="course">
	            <label>课程</label>
	            <Line />
	            <Select />
	          </div>
	       	  );
         }
        });
    var Select = React.createClass({
    	render: function(){
    		return(
	            <select>
	              <option>（点击选择课程）</option>
	              <option>（点击选择课程）</option>
	              <option>（点击选择课程）</option>
	            </select> 
    			);
    	}
   	
    });

    var Students = React.createClass({
        render:function(){
          return (
            <div className="students">
              <Student />
              <Student />
              <Student />
              <Student />
              <Student />
            </div>
          );
        }
      });

    var Student = React.createClass({
        render: function(){
          return(
            <div className="student">
              <StudentImg />
              <StudentName />
              <StudentCheckbox />
              <StudentNumber />
              <StudentDetail />
              <Line />
            </div>
          );
        }
      });

    var StudentImg = React.createClass({
    	render: function(){
    		return (<div className="student_img"></div>);
    	}
    });

    var StudentName = React.createClass({
    	render: function(){
    		return (<div className="student_name">学生姓名：房竹青</div>);
    	}
    });

    var StudentCheckbox = React.createClass({
    	render: function(){
    		return 	(<div><input className="student_checkbox" type="checkbox" name=""/></div>);
    	}
    });


    var StudentNumber = React.createClass({
    	render: function(){
    		return (<div className="student_number">学号：2015333123456</div>);
    	}
    });

    var StudentDetail = React.createClass({
    	render: function(){
    		return (<div className="student_detail">查看详情</div>);
    	}
    });

    var Information = React.createClass({
    	render:function(){
    		return (
    			<footer className="information">
		    		<NumberCheck />
		    		<InformationContent />
		    		<Send />
	    		</footer>);
    	}
    });

    var NumberCheck = React.createClass({
    	render :function(){
    		return (
	    		<div className="number_check">
					<div className="number">已选64人</div>
					<input className="checkbox" type="checkbox" name=""/>
					<label className="check_all">全选</label>
				</div>

    			);
    	}
    });

    var InformationContent = React.createClass({
    	render :function(){
    		return (
				<div className="information_content">
					<span>信息内容:</span>
					<textarea autofocus></textarea>
				</div>

    			);
    	}
    });

    var Send = React.createClass({
    	render : function(){
    		return <div className="send">发送消息</div>;
    	}
    });

    ReactDOM.render(
        <SendInformation />,
        document.getElementsByClassName("page1")[0]
      );