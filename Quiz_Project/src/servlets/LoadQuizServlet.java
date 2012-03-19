package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Shared.*;

/**
 * Servlet implementation class LoadQuizServlet
 */
public class LoadQuizServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private int numQuestions;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoadQuizServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int quizID = Integer.parseInt(request.getParameter("quizID"));
		
		request.getSession().setAttribute("score", 0);
		
		PrintWriter out = response.getWriter();
	  	try {
			Quiz quiz = Quiz.loadQuiz(quizID);
			List<Question> questions = quiz.loadQuestions();
			numQuestions = questions.size();
			
			if(!quiz.isImmediateCorrectionEnabled || !quiz.isMultiplePage){
				out.println("<form action=\"GradeQuizServlet?quizID=" + quizID + "\" id=\"singlePageForm\" method=\"post\" onsubmit=\"sortMatching()\">");
				out.println("<input type=\"hidden\" name=\"timeTaken\" id=\"timeTaken\" value=\"\" />");
			}
				
			for(int i = 0; i < numQuestions; i++){
				Question question = questions.get(i);
				
				out.println("<div id=\"questionOuterContainer" + i + "\" class=\"questionOuterContainer\" ");
				if(quiz.isMultiplePage && i != 0) out.println("style=\"display:none;\"");
				out.println(">");
				
				if(quiz.isImmediateCorrectionEnabled && quiz.isMultiplePage){
					out.println("<form action=\"GradeQuestionServlet?qID=" + question.questionID + "\" method=\"post\" onsubmit=\"sortMatchingSingle(" + i + ")\">");
				}
				
				if(question.timeInSeconds > 0){
					out.println("<div class=\"questionTimerContainer\">");
					out.println("<input type=\"hidden\" value=\""+question.timeInSeconds+"\" />");
					out.println("<div class=\"questionTimer\">");
					out.println("</div>");				
					out.println("<button type='button' class='startTimedQuestion'>Start Timer</button>");
					out.println("</div>");
					
					String minutes = "" + (question.timeInSeconds / 60);
					int seconds = (question.timeInSeconds % 60);
					StringBuilder secondString = new StringBuilder();
					if(seconds < 10) secondString.append("0");
					secondString.append(seconds);
					
					out.println("<div class=\"timerValue\">");
					out.println("Timed Question: <span>" + minutes + ":" + secondString.toString() + "</span>");
					out.println("</div>");
				}
				out.println("<div id=\"question" + i + "\" class=\"questionContainer\" ");
				if(question.timeInSeconds > 0)  out.println("style=\"display:none;\"");
				out.println(">");
				
				//fill in answers/inputs
				if(question.type.equals("MC")){
					out.println(MCQuestion(question));
				}
				if(question.type.equals("MCMA")){
					out.println(MCMAQuestion(question));
				}
				if(question.type.equals("QR")){
					out.println(QRQuestion(question));
				}
				if(question.type.equals("PR")){
					out.println(PRQuestion(question));
				}
				if(question.type.equals("FIB")){
					out.println(FIBQuestion(question));
				}
				if(question.type.equals("M")){
					out.println(MQuestion(question));
				}
				
				if(quiz.isMultiplePage){
					out.println("<div class=\"questionButtonDiv\">");
					if(quiz.isImmediateCorrectionEnabled){
						out.print("<button type=\"button\" class=\"checkButton");
						if(question.type.equals("MC")) out.print("MC");
						out.print("\">Check</button>");
					}
					if(i != numQuestions - 1){
						out.println("<button type=\"button\" class=\"nextButton\"");
						if(quiz.isImmediateCorrectionEnabled) out.println(" style=\"display:none;\"");
						out.println(" onclick=\"javascript:showNext(" + i + ", " + (i + 1) + ")\">Next</button>");
					}
					if(i == numQuestions - 1){
						out.println("<button type=\"");
						if(quiz.isImmediateCorrectionEnabled) {
							out.println("button\" class=\"finishButton\" style=\"display:none;\"");
						} else {
							out.println("submit\"");
						}
						out.println(">Finish</button>");
					}
					out.println("</div>");
					
					if(quiz.isImmediateCorrectionEnabled){
						out.println("<div class=\"questionAnswers\">");
						out.println("</div>");
					}
				}
				
				out.println("</div>");
				
				if(quiz.isImmediateCorrectionEnabled && quiz.isMultiplePage){
					out.println("</form>");
				}
				
				out.println("</div>");
			}
			
			if(!quiz.isImmediateCorrectionEnabled || !quiz.isMultiplePage){
				if(!quiz.isMultiplePage) out.println("<button type=\"submit\">Finish</button>");
				out.println("</form>");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	private String MCQuestion(Question question){
		StringBuilder result = new StringBuilder();
		result.append("<h3>");
		result.append(question.question);
		result.append("</h3>");
		result.append("<div class=\"answerContainer\">"); //answers
		for(int i = 0; i < question.left.size(); i++){
			String answer = question.left.get(i);
			result.append("<div class=\"answerRow\"><input type=\"radio\" name=\"" + question.questionID + "\" value=\"" + i + "\" class=\"radioButtonAnswer\"");
			if(i == question.left.size() -1) result.append(" checked");
			result.append("><span>" + answer + "</span></div>");
		}
		result.append("</div>");
		return result.toString();
	}

	private String MCMAQuestion(Question question){
		StringBuilder result = new StringBuilder();
		result.append("<h3>");
		result.append(question.question);
		result.append("</h3>");
		result.append("<div class=\"answerContainer\">"); //answers
		for(int i = 0; i < question.left.size(); i++){
			String answer = question.left.get(i);
			result.append("<div class=\"answerRow\"><input type=\"checkBox\" name=\"" + question.questionID + "-" + i + "\" value=\"" + i + "\" class=\"checkBoxAnswer\"> " + answer + "</div>");
		}
		result.append("</div>");
		return result.toString();
	}
	
	private String QRQuestion(Question question){
		StringBuilder result = new StringBuilder();
		result.append("<h3>");
		result.append(question.question);
		result.append("</h3>");
		result.append("<div class=\"answerContainer\">"); //answers
		for(int i = 0; i < question.left.size(); i++){
			String answer = question.left.get(i);
			result.append("<div class=\"answerRow\"><input type=\"text\" name=\"" + question.questionID + "-" + i + "\" class=\"textFieldAnswer\"></div>");
		}
		result.append("</div>");
		return result.toString();
	}
	
	private String PRQuestion(Question question){
		StringBuilder result = new StringBuilder();
		result.append("<h3>");
		result.append(question.question);
		result.append("</h3>");
		result.append("<div>");
		result.append("<img src=\"" + question.imageURL + "\" />");
		result.append("</div>");
		result.append("<div class=\"answerContainer\">"); //answers
		for(int i = 0; i < question.left.size(); i++){
			String answer = question.left.get(i);
			result.append("<div class=\"answerRow\"><input type=\"text\" name=\"" + question.questionID + "-" + i + "\" class=\"textFieldAnswer\"></div>");
		}
		result.append("</div>");
		return result.toString();
	}
	
	private String FIBQuestion(Question question){
		StringBuilder result = new StringBuilder();
		result.append("<h3>");
		result.append(question.question);
		result.append("</h3>");
		result.append("<div class=\"answerContainer\">"); //answers
		for(int i = 0; i < question.left.size(); i++){
			String answer = question.left.get(i);
			result.append("<div class=\"answerRow\"><input type=\"text\" name=\"" + question.questionID + "-" + i + "\" class=\"textFieldAnswer\"></div>");
		}
		result.append("</div>");
		return result.toString();
	}
	
	private String MQuestion(Question question){
		StringBuilder result = new StringBuilder();
		result.append("<h3>");
		result.append(question.question);
		result.append("</h3>");
		result.append("<div class=\"answerContainer\">"); //answers
		
		result.append("<div class=\"leftAnswersM\">");
		result.append("<ul>");
		for(int i = 0; i < question.left.size(); i++){
			String answer = question.left.get(i);
			result.append("<li class=\"answerRow\">" + answer + "</li>");
		}
		result.append("</ul>");
		result.append("</div>");
		
		result.append("<div class=\"rightAnswersM\">");
		result.append("<input type=\"hidden\" name=\"qid\" value=\"" + question.questionID + "\" />");
		result.append("<ul id=\"sortable" + question.questionID + "\" class=\"sortable\">");
		
		List<Integer> randomOrder = new ArrayList<Integer>();
		for(int i = 0; i < question.right.size(); i++){
			randomOrder.add(i);
		}
		
		Collections.shuffle(randomOrder);
		
		for(int i = 0; i < question.right.size(); i++){
			String answer = question.right.get(randomOrder.get(i));
			result.append("<li class=\"answerRowMatch\" id=\"" + question.questionID + "-" + i + "\" >" + answer);
			result.append("<input type=\"hidden\" name=\"" + question.questionID + "-" + i + "\" value=\"" + answer + "\" /></li>");
		}
		result.append("</ul>");
		result.append("</div>");
		
		result.append("</div>");
		result.append("<script>");
		result.append("$(function() {");
		result.append("$( \"#sortable" + question.questionID + "\" ).sortable();");
		result.append("$( \"#sortable" + question.questionID + "\" ).disableSelection();");
		result.append("});");
		result.append("</script>");
		return result.toString();
	}
	
}

/*"var arr = $(this).sortable(\"toArray\");" +
				"for(var i = 0; i < arr.length; i++){" +
				"$($($(\"#\" + arr[i]).find(\"input\")).get(0)).attr(\"name\", arr[i]);" +
				"}" +*/
