<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*" %>
<%@ page import="Shared.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Qwizzler - Take a Quiz</title>

	<link rel="stylesheet" type="text/css" href="theme.css"/>
	<link rel="stylesheet" type="text/css" href="takeQuiz.css"/>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
	<script src="theme.js" type="text/javascript"></script>
	<script src="takeQuiz.js" type="text/javascript"></script>
</head>
<body>
	<%@ include file="topBar.jsp" %>
	<div id="blueBar">
		<div class="centerer">
			<div id="descriptionContainer">
				<h2>Welcome to the Quizzes!</h2>
				<p> Here you can select to take quizzes by choosing among the different categories. Clicking on the quiz name will take you to the quiz's information page. </p>
			</div>
			<div id="categoryIconsContainer">
				<div id="topCategories">
					<div class="iconSegment" id="allCategoriesIcon">
						<p>All categories</p>
						<img src="https://encrypted-tbn2.google.com/images?q=tbn:ANd9GcR-NFUta5Iw9F9l4yfTkwL0goCDMvWZSWYa9pDUh9ld_MBreSx3" />
					</div>
					<div class="iconSegment" id="historyIcon">
						<p>History</p>
						<img src="https://encrypted-tbn3.google.com/images?q=tbn:ANd9GcS5wH_4e8t_N6Pih7DFkOStv5IbzJXdBgfWoRvhDGCejmgyzt_V" />
					</div>
					<div class="iconSegment" id="geographyIcon">
						<p>Geography</p>
						<img src="https://encrypted-tbn3.google.com/images?q=tbn:ANd9GcTFPJjCcKrnuJMFuA6R4vOPRBhYCNyvqaAI0f3w27Q5KJ6SrhUp" />
					</div>
					<div class="iconSegment" id="entertainmentIcon">
						<p>Entertainment</p>
						<img src="https://encrypted-tbn2.google.com/images?q=tbn:ANd9GcReOg9ymnF8l0Wla3kfPrjRt16f1Xs9XnXKuYBrPaYlmyt7_2lZ" />
					</div>
					<div class="iconSegment" id="mathIcon">
						<p>Math & Science</p>
						<img src="https://encrypted-tbn3.google.com/images?q=tbn:ANd9GcSrnxjoMx3MlEw1pxDv4FkTgdD2xOtsHeSQSRmkarPs30JN_DodqA" />
					</div>
					<div class="iconSegment" id="literatureIcon">
						<p>Literature</p>
						<img src="https://encrypted-tbn0.google.com/images?q=tbn:ANd9GcRvUc6QZTYh42-U92cvFmHdl65yHViKtcCaxFhW1jRhdy_6-RNZ" />
					</div>
					
				</div>
				<div id="bottomCategories">
					<div class="iconSegment" id="sportsIcon">
						<p>Sports</p>
						<img src="https://encrypted-tbn0.google.com/images?q=tbn:ANd9GcTWjHYoyRfC2VcntdC537weiO74NuyerJg86Cf5QcTKM3fEypTl" />
					</div>
					<div class="iconSegment" id="languageIcon">
						<p>Language</p>
						<img src="https://encrypted-tbn3.google.com/images?q=tbn:ANd9GcQ22elyloku-0O8oNHRm7RK8OPvESqtiUB4K6cZbMeCPLjmAJEr" />
					</div>
					<div class="iconSegment" id="justForFunIcon">
						<p>Just For Fun</p>
						<img src="https://encrypted-tbn3.google.com/images?q=tbn:ANd9GcR3w-ClTmyVHmDy_7Me4dG1uAnQxFruHEsXoqriCoflVMOQxe1Jow" />
					</div>
					<div class="iconSegment" id="religionIcon">
						<p>Religion</p>
						<img src="https://encrypted-tbn3.google.com/images?q=tbn:ANd9GcTOvehLVuhf9HOqxopkvr5Xa7UIToclrIuAxe9v8qMFPhUzJF6H1g" />
					</div>
					<div class="iconSegment" id="moviesIcon">
						<p>Movies</p>
						<img src="https://encrypted-tbn3.google.com/images?q=tbn:ANd9GcSCUTZSakcrWCu-d-cd9Zv7jrY3UtKijHdLe9oYAilb3rZroSHrRg" />
					</div>
					<div class="iconSegment" id="televisionIcon">
						<p>TV</p>
						<img src="https://encrypted-tbn2.google.com/images?q=tbn:ANd9GcQEZGVCNUs8rs0L9cTd-DpoqyvAfAcPiVMUqj8J1hS65FtHpqF5h630-foJPA" />
					</div>
				</div>
			</div>		
		</div>
	</div>
	<div id="mainContent">
		<div class="centerer">
			<div id="quizzes" class="content">
				<select id="quizSelector">
					<option value="ALL">View All</option>
					<option value="HISTORY">History</option>
					<option value="GEOGRAPHY">Geography</option>
					<option value="ENTERTAINMENT">Entertainment</option>
					<option value="MATH_AND_SCIENCE">Math and Science</option>
					<option value="LITERATURE">Literature</option>
					<option value="SPORTS">Sports</option>
					<option value="LANGUAGE">Language</option>
					<option value="JUST_FOR_FUN">Just For Fun</option>
					<option value="RELIGION">Religion</option>
					<option value="MOVIES">Movies</option>
					<option value="TELEVISION">Television</option>
				</select>
				<div id="quizList">
				
				</div>
			</div>
		</div>
	</div>
</body>
</html>