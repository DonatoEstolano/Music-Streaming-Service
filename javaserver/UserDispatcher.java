import java.io.IOException;
import java.io.InputStream;
import java.io.FileReader;
import java.io.FileInputStream;
import java.io.File;
import java.util.Base64;
import java.io.FileNotFoundException;


public class UserDispatcher
{
	public UserDispatcher(){}
	
	/* 
	* authenticateUser: Check if a user and password is correct
	* @param username: Username
	* @param password: password
	*/
	public String authenticateUser(String username, String password) throws FileNotFoundException, IOException{
		System.out.println(username+" "+password);
		return "true";
	}

	/* 
	* createUser: Creates a user
	* @param username: Username
	* @param password: password
	*/
	public String createUser(String username, String password) throws FileNotFoundException, IOException{
		System.out.println(username+" "+password);
		return "true";
	}

}
