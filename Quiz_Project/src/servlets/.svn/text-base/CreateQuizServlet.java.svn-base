package servlets;

import java.io.IOException;
import java.sql.SQLException;
import java.util.*;

import javax.servlet.ServletException;
import javax.servlet.http.*;

import Shared.*;

/**
 * Servlet implementation class CreateQuizServlet
 */
public class CreateQuizServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Map<String, String[]> formDataMap;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CreateQuizServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		User user = (User) request.getSession().getAttribute("user");
		Integer timedQuiz = 0;
		
		String quizTitle = request.getParameter("quizTitle");
		String quizDesc = request.getParameter("quizDesc");
		String quizcategory = request.getParameter("quizCategory");
		if(request.getParameter("timedQuiz") == "" || request.getParameter("timedQuiz") == null){
			timedQuiz = 0;
		}else{
			timedQuiz = Integer.valueOf(request.getParameter("timedQuiz"));
		}
		
		boolean isRandom = request.getParameter("isRandom") !=null ? true:false;
		boolean isMultiple = request.getParameter("isMultiple") !=null ? true:false;
		boolean isPracticeEnabled = request.getParameter("isPracticeEnabled") != null? true:false;
		boolean isImmediateCorrectionEnabled = request.getParameter("isImmediateCorrectionEnabled") != null? true:false;
		
		//System.out.println("");
		
		//System.out.println(quizTitle + " "+ quizDesc +" " + user.userID +" "+ quizcategory+ " "+  isRandom+ " "+ isMultiple + " "+ isPracticeEnabled + " "+ isImmediateCorrectionEnabled + " "+timedQuiz);
		
		Quiz quiz = new Quiz(quizTitle, quizDesc, user.userID, quizcategory, 0, 0, isRandom, isMultiple, isPracticeEnabled, isImmediateCorrectionEnabled, false, timedQuiz);
		try {
			quiz.saveQuiz();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		formDataMap = request.getParameterMap();
		Set<Map.Entry<String, String[]>> entries = formDataMap.entrySet();
		//iterate through the map values to find a question. 
		for(Map.Entry<String, String[]> entry : entries){
			String key = entry.getKey();
			
			try {
				if(key.startsWith("Question_QR_")){
					createQR(key,quiz);
				}else if(key.startsWith("Question_PR_")){
					createPR(key,quiz);
				}else if(key.startsWith("Question_FIB_")){
					createFIB(key,quiz);
				}else if(key.startsWith("Question_MC_")){
					createMC(key,quiz);	
				}else if(key.startsWith("Question_MCMA_")){
					createMCMA(key,quiz);
				}else if(key.startsWith("Question_M_")){
					createM(key, quiz);
				}
			} catch (NumberFormatException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		//forward the request to the quizInfo.jsp page
		response.sendRedirect("quizInfo.jsp?quizID="+quiz.quizID);
	}
	
	public void createQR(String question, Quiz quiz) throws NumberFormatException, SQLException{
		String questionString = formDataMap.get(question)[0];
		
		int length = ("question_QR_").length();
		String questionNo = question.substring(length);
		String questionKey = "question_QR_"+questionNo;
		
		List<String> left = new ArrayList<String>(); 
		List<String> right = new ArrayList<String>(); 
		boolean ordered = false;
		ArrayList<String> answerTextBoxes = new ArrayList<String>();
		Integer timing = 0;
		//iterate through form data to get the value of order checkbox
		
		Set<Map.Entry<String, String[]>> entries = formDataMap.entrySet();
		//iterate through the map values to find answer and checkbox 
		for(Map.Entry<String, String[]> entry : entries){
			String key = entry.getKey();
			
			if(key.contains(questionKey)){
				if(key.endsWith("_order")){
					ordered = formDataMap.get(key)[0].equals("ordered")?true:false;
				}else if(key.contains("_answer")){
					answerTextBoxes.add(key);
				}else if(key.endsWith("_time")){
					String time = formDataMap.get(key)[0];
					if(time == null || time == ""){
						timing = 0;
					}else{
						timing = Integer.valueOf(formDataMap.get(key)[0]);
					}
				}
			}
		
		}
		
		Collections.sort(answerTextBoxes);
		
		for(int i=0;i<answerTextBoxes.size();i++){
			String[] answer = formDataMap.get(answerTextBoxes.get(i));
			
			left.add(answer[0]);
			if(ordered == true){
				right.add(String.valueOf(i));
			}else{
				right.add("0");
			}
		}
		 
		quiz.addQuestion(questionString, "", "QR", timing , left, right);
		
	}
	
	public void createPR(String question, Quiz quiz) throws NumberFormatException, SQLException{
		String questionString = formDataMap.get(question)[0];
		
		int length = ("question_PR_").length();
		String questionNo = question.substring(length);
		String questionKey = "question_PR_"+questionNo;
		
		List<String> left = new ArrayList<String>(); 
		List<String> right = new ArrayList<String>(); 
		boolean ordered = false;
		ArrayList<String> answerTextBoxes = new ArrayList<String>();
		String imageLink = null;
		Integer timing =0;
		
		//iterate through form data to get the value of order checkbox
		Set<Map.Entry<String, String[]>> entries = formDataMap.entrySet();
		//iterate through the map values to find answer and checkbox 
		for(Map.Entry<String, String[]> entry : entries){
			String key = entry.getKey();
			
			if(key.contains(questionKey)){
				if(key.endsWith("_order")){
					ordered = formDataMap.get(key)[0].equals("ordered")?true:false;
				}else if(key.contains("_answer")){
					answerTextBoxes.add(key);
				}else if(key.contains("_imageLink")){
					imageLink = key;
				}else if(key.endsWith("_time")){
					String time = formDataMap.get(key)[0];
					if(time == null || time == ""){
						timing = 0;
					}else{
						timing = Integer.valueOf(formDataMap.get(key)[0]);
					}
				}
			}
		
		}
		
		Collections.sort(answerTextBoxes);
		
		for(int i=0;i<answerTextBoxes.size();i++){
			String[] answer = formDataMap.get(answerTextBoxes.get(i));
			
			left.add(answer[0]);
			if(ordered == true){
				right.add(String.valueOf(i));
			}else{
				right.add("0");
			}
		}
		
		quiz.addQuestion(questionString, formDataMap.get(imageLink)[0], "PR", timing , left, right);
		
	}
	
	public void createFIB(String question, Quiz quiz) throws NumberFormatException, SQLException{
		String questionString = formDataMap.get(question)[0];
	
		int length = ("question_FIB_").length();
		String questionNo = question.substring(length);
		String questionKey = "question_FIB_"+questionNo;
		
		List<String> left = new ArrayList<String>(); 
		List<String> right = new ArrayList<String>(); 
		boolean ordered = false;
		ArrayList<String> answerTextBoxes = new ArrayList<String>();
		Integer timing = 0;
		
		//iterate through form data to get the value of order checkbox
		Set<Map.Entry<String, String[]>> entries = formDataMap.entrySet();
		//iterate through the map values to find answer and checkbox 
		for(Map.Entry<String, String[]> entry : entries){
			String key = entry.getKey();
			
			if(key.contains(questionKey)){
				if(key.endsWith("_order")){
					ordered = formDataMap.get(key)[0].equals("ordered")?true:false;
				}else if(key.contains("_answer")){
					answerTextBoxes.add(key);
				}else if(key.endsWith("_time")){
					String time = formDataMap.get(key)[0];
					if(time == null || time == ""){
						timing = 0;
					}else{
						timing = Integer.valueOf(formDataMap.get(key)[0]);
					}
				}
			}
		
		}
		
		Collections.sort(answerTextBoxes);

		for(int i=0;i<answerTextBoxes.size();i++){
			String[] answer = formDataMap.get(answerTextBoxes.get(i));

			left.add(answer[0]);
			if(ordered == true){
				right.add(String.valueOf(i));
			}else{
				right.add("0");
			}
		}
		
		quiz.addQuestion(questionString, "", "FIB", timing , left, right);
		
	}
	
	public void createMC(String question, Quiz quiz) throws NumberFormatException, SQLException{
		String questionString = formDataMap.get(question)[0];

		int length = ("question_MC_").length();
		String questionNo = question.substring(length);
		String questionKey = "question_MC_"+questionNo;
		
		String selectedValue = null;
		
		List<String> left = new ArrayList<String>(); 
		List<String> right = new ArrayList<String>(); 
		ArrayList<String> answerTextBoxes = new ArrayList<String>();
		Integer timing = 0;
		
		//iterate through form data to get the value of order checkbox
		
		Set<Map.Entry<String, String[]>> entries = formDataMap.entrySet();
		//iterate through the map values to find answer and checkbox 
		for(Map.Entry<String, String[]> entry : entries){
			String key = entry.getKey();
			
			if(key.contains(questionKey)){
				if(key.contains("_answer")){
					answerTextBoxes.add(key);
				}else if(key.endsWith("_radiobox")){
					String selectedValueTextBox = formDataMap.get(key)[0];
					selectedValue = formDataMap.get(selectedValueTextBox)[0];
				}else if(key.endsWith("_time")){
					String time = formDataMap.get(key)[0];
					if(time == null || time == ""){
						timing = 0;
					}else{
						timing = Integer.valueOf(formDataMap.get(key)[0]);
					}
				}
			}
		
		}
		

		for(int i=0;i<answerTextBoxes.size();i++){
			String[] answer = formDataMap.get(answerTextBoxes.get(i));

			left.add(answer[0]);
			if(answer[0] == selectedValue){
				right.add("1");
			}else{
				right.add("0");
			}
		}
		
		quiz.addQuestion(questionString, "", "MC", timing , left, right);
		
	}
	
	public void createMCMA(String question, Quiz quiz) throws NumberFormatException, SQLException{
		String questionString = formDataMap.get(question)[0];
		
		int length = ("question_MCMA_").length();
		String questionNo = question.substring(length);
		String questionKey = "question_MCMA_"+questionNo;
		
		String[] selectedValues = null;
		
		List<String> left = new ArrayList<String>(); 
		List<String> right = new ArrayList<String>(); 
		ArrayList<String> answerTextBoxes = new ArrayList<String>();
		Integer timing =0;
		
		//iterate through form data to get the value of order checkbox
		
		Set<Map.Entry<String, String[]>> entries = formDataMap.entrySet();
		//iterate through the map values to find answer and checkbox 
		for(Map.Entry<String, String[]> entry : entries){
			String key = entry.getKey();
			
			if(key.contains(questionKey)){
				if(key.contains("_answer")){
					answerTextBoxes.add(key);
				}else if(key.endsWith("_checkbox")){
					selectedValues = formDataMap.get(key);
				}else if(key.endsWith("_time")){
					String time = formDataMap.get(key)[0];
					if(time == null || time == ""){
						timing = 0;
					}else{
						timing = Integer.valueOf(formDataMap.get(key)[0]);
					}
				}
			}
		
		}
		
		for(int i=0;i<answerTextBoxes.size();i++){
			String[] answer = formDataMap.get(answerTextBoxes.get(i));
			
			left.add(answer[0]);
			
			boolean rightSide = false;
			for(int j=0;j<selectedValues.length;j++){
				String val = formDataMap.get(selectedValues[j])[0];

				if(answer[0] == val){
					right.add("1");
					rightSide = true;
					break;
				}
			}
			
			if(rightSide == false){
				right.add("0");
				rightSide = true;
			}
		}
		
		quiz.addQuestion(questionString, "", "MCMA", timing , left, right);
		
	}
	
	public void createM(String question, Quiz quiz) throws NumberFormatException, SQLException{
		String questionString = formDataMap.get(question)[0];

		int length = ("question_M_").length();
		String questionNo = question.substring(length);
		String questionKey = "question_M_"+questionNo;
		
		//System.out.println("questionKey = "+questionKey);
		
		List<String> left = new ArrayList<String>(); 
		List<String> right = new ArrayList<String>(); 
		
		List<String> leftAnswerTextBoxes = new ArrayList<String>();
		
		Integer timing = 0;
		
		//iterate through form data to get the value of left and right hand side data
		Set<Map.Entry<String, String[]>> entries = formDataMap.entrySet();
		//iterate through the map values to find left and right matches 
		for(Map.Entry<String, String[]> entry : entries){
			String key = entry.getKey();
			
			if(key.contains(questionKey)){
				if(!leftAnswerTextBoxes.contains(key)){
					if(key.contains("_leftMatch_")){
						//add this to the leftAnswerTextBoxes
						leftAnswerTextBoxes.add(key);
					}else if(key.endsWith("_time")){
						String time = formDataMap.get(key)[0];
						if(time == null || time == ""){
							timing = 0;
						}else{
							timing = Integer.valueOf(formDataMap.get(key)[0]);
						}
					}
				}
			}
		
		}
		
		
		for(int i=0;i<leftAnswerTextBoxes.size();i++){
			String val = leftAnswerTextBoxes.get(i);
			//System.out.println("val = "+val);
			//get the number of the answer
			int leftIndex = val.lastIndexOf("_leftMatch_");
			//System.out.println("leftIndex="+leftIndex);
			String answerNo = val.substring((leftIndex+11));
			
			//System.out.println("answerNo- "+answerNo);
			
			String leftMatch = formDataMap.get(val)[0];
			left.add(leftMatch);
			
			String rightMatch = formDataMap.get(questionKey+"_rightMatch_"+answerNo)[0];
			right.add(rightMatch);
		}
		
		quiz.addQuestion(questionString, "", "M", timing , left, right);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
