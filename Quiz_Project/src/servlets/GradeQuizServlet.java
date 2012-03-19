package servlets;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Shared.Question;
import Shared.Quiz;
import Shared.User;

/**
 * Servlet implementation class GradeQuizServlet
 */
public class GradeQuizServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GradeQuizServlet() {
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
		int score = 0;
		
		try {
			Quiz quiz = Quiz.loadQuiz(quizID);
			List<Question> questions = quiz.loadQuestions();
			
			if(quiz.isImmediateCorrectionEnabled && quiz.isMultiplePage){
				score = (Integer) request.getSession().getAttribute("score");
			} else {
				for(int i = 0; i < questions.size(); i++){
					Question question = questions.get(i);
					List<String> answers = new ArrayList<String>();
					
					if(question.type.equals("MC")){ 
						answers = getMCAnswers(question, request);
					} else if(question.type.equals("MCMA")){
						answers = getMCMAAnswers(question, request);
					} else if(question.type.equals("M")){
						answers = getMAnswers(question, request);
					} else {
						answers = getStringInputAnswers(question, request);
					}
					
					
					score += question.getScoreForAnswer(answers);
				}
			}
			
			request.setAttribute("score", score);
			int timeTaken = Integer.parseInt(request.getParameter("timeTaken"));
			request.setAttribute("timeTaken", timeTaken);
			
			//add performance to DB
			quiz.addPerformance(((User)request.getSession().getAttribute("user")).userID, score, timeTaken);
			
			request.getRequestDispatcher("quizResults.jsp").forward(request, response);
			
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
		
		return answers;
	}
	
	private List<String> getMCAnswers(Question question, HttpServletRequest request){
		List<String> answers = new ArrayList<String>();
		int checked = Integer.parseInt(request.getParameter(question.questionID + ""));
		
		for(int j = 0; j < question.right.size(); j++){
			if(checked == j) answers.add("1");
			else answers.add("0");
		}
		
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
		
		return answers;
	}

	private List<String> getMAnswers(Question question, HttpServletRequest request){
		List<String> answers = new ArrayList<String>();
		
		for(int j = 0; j < question.right.size(); j++){
			answers.add(request.getParameter(question.questionID + "-" + j));
		}
		
		return answers;
	}
}
