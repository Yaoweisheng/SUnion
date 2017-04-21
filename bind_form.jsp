<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, 
                                     initial-scale=1.0, 
                                     maximum-scale=1.0, 
                                     user-scalable=no">
<title>账户绑定</title>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/globeVar.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/bootstrap.min.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/main.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/weui.css">
<script src="${pageContext.request.contextPath}/js/bootstrap.min.js"></script>
<script src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/react.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/react-dom.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/browser.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/pubsub.js"></script>
<script type="text/javascript">
    ch.createVar("ch.bind.province");
    ch.createVar("ch.teacher.openId");
    ch.createVar("ch.code");
    ch.teacher.openId = '${openId}'
    ch.code = '${code}'
    ch.bind.province = ${request.province};
</script>
</head>
<body>
	<div class="page11"></div>
	<script type="text/babel" src="${pageContext.request.contextPath}/js/accountBinding.js"></script>
</body>
</html>
