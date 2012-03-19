package servlets;

import javax.servlet.ServletContextEvent;
import SQL.DBConnection;
import Shared.Announcement;
import Shared.Message;
import Shared.Performance;
import Shared.Question;
import Shared.Quiz;
import Shared.User;

/**
 * Application Lifecycle Listener implementation class ServletContextListener
 *
 */
public class ServletContextListener implements javax.servlet.ServletContextListener {

    /**
     * Default constructor. 
     */
    public ServletContextListener() {
        // TODO Auto-generated constructor stub
    }

	/**
     * @see ServletContextListener#contextInitialized(ServletContextEvent)
     */
    public void contextInitialized(ServletContextEvent sce) {
        DBConnection db = new DBConnection();
        User.initDBConnection(db);
        Message.initDBConnection(db);
        Announcement.initDBConnection(db);
        Performance.initDBConnection(db);
        Question.initDBConnection(db);
        Quiz.initDBConnection(db);
    }

	/**
     * @see ServletContextListener#contextDestroyed(ServletContextEvent)
     */
    public void contextDestroyed(ServletContextEvent arg0) {
        // TODO Auto-generated method stub
    }
	
}
