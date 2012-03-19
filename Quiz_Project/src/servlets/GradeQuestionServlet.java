package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Shared.Question;
import Shared.Quiz;

/**
 * Servlet implementation class GradeQuestionServlet
 */
public class GradeQuestionServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private PrintWriter out;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GradeQuestionServlet() {
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
		int questionID = Integer.parseInt(request.getParameter("qID"));
		out = response.getWriter();
		
		try {
			Question q = Question.loadQuestion(questionID);
			List<String> answers = new ArrayList<String>();
			
			if(q.type.equals("MC")){ 
				answers = getMCAnswers(q, request);
			} else if(q.type.equals("MCMA")){
				answers = getMCMAAnswers(q, request);
			} else if(q.type.equals("M")){
				answers = getMAnswers(q, request);
			} else {
				answers = getStringInputAnswers(q, request);
			}
			
			int score = q.getScoreForAnswer(answers);
			
			if(score != 0) out.println("Correct!!<br />");
			else out.println("Wrong!!<br />");
			
			out.println(q.getAnswer());
			
			int origScore = (Integer) request.getSession().getAttribute("score");
			score += origScore;
			request.getSession().setAttribute("score", score);
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private List<String> getStringInputAnswers(Question question, HttpServletRequest request){
		List<String> answers = new ArrayList<String>();
		
		for(int j = 0; j < question.right.size(); j++){
			answers.add(request.getParameter(question.questionID + "-" + j));
		}
		
		/*for(int i = 0; i < question.left.size(); i++){
			String answer = question.left.get(i);
			out.println("<div class=\"answerRow\"><input type=\"text\" name=\"" + question.questionID + "-" + i + "\" class=\"textFieldAnswer\"></div>");
		}*/
		
		//out.println(question.getAnswer());
		
		return answers;
	}
	
	private List<String> getMCAnswers(Question question, HttpServletRequest request){
		List<String> answers = new ArrayList<String>();
		String checkedstr = request.getParameter(question.questionID + "");
		int checked = Integer.parseInt(checkedstr);
		
		for(int j = 0; j < question.right.size(); j++){
			if(checked == j) answers.add("1");
			else answers.add("0");
		}
		
		/*for(int i = 0; i < question.left.size(); i++){
			String answer = question.left.get(i);
			out.println("<div class=\"answerRow\" ");
			
			out.println("><input type=\"radio\" name=\"" + question.questionID + "\" value=\"" + i + "\" class=\"radioButtonAnswer\"><span>" + answer + "</span></div>");
		}*/
		
		//out.println(question.getAnswer());
		
		return answers;
	}
	
	private List<String> getMCMAAnswers(Question question, HttpServletRequest request){
		List<String> answers = new ArrayList<String>();
		Set<Integer> set = new HashSet<Integer>();
		
		for(int j = 0; j < question.right.size(); j++){
			String checked = request.getParameter(question.questionID + "-" + j);
			if(checked != null) set.add(j);
			if(set.contains(j)) answers.add("1");
			else answers.add("0");
		}
		
		/*for(int i = 0; i < question.left.size(); i++){
			String answer = question.left.get(i);
			out.println("<div class=\"answerRow\"><input type=\"checkBox\" name=\"" + question.questionID + "-" + i + "\" value=\"" + i + "\" class=\"checkBoxAnswer\"> " + answer + "</div>");
		}*/
		
		//out.println(question.getAnswer());
		
		return answers;
	}

	private List<String> getMAnswers(Question question, HttpServletRequest request){
		List<String> answers = new ArrayList<String>();
		
		for(int j = 0; j < question.right.size(); j++){
			answers.add(request.getParameter(question.questionID + "-" + j));
		}
		
		/*out.println("<div class=\"leftAnswersM\">");
		out.println("<ul>");
		for(int i = 0; i < question.left.size(); i++){
			String answer = question.left.get(i);
			out.println("<li class=\"answerRow\">" + answer + "</li>");
		}
		out.println("</ul>");
		out.println("</div>");
		
		out.println("<div class=\"rightAnswersM\">");
		out.println("<input type=\"hidden\" name=\"qid\" value=\"" + question.questionID + "\" />");
		out.println("<ul id=\"sortable" + question.questionID + "\" class=\"sortable\">");
		
		for(int i = 0; i < question.right.size(); i++){
			String answer = question.right.get(i);
			out.println("<li class=\"answerRowMatch\" id=\"" + question.questionID + "-" + i + "\" >" + answer);
			out.println("<input type=\"hidden\" name=\"" + question.questionID + "-" + i + "\" value=\"" + answer + "\" /></li>");
		}
		out.println("</ul>");
		out.println("</div>");*/
		
		//out.println(question.getAnswer());
		
		return answers;
	}
}
