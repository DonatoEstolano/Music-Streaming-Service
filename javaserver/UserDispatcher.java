import java.io.IOException;
import java.io.InputStream;
import java.io.FileReader;
import java.io.FileInputStream;
import java.io.File;
import java.io.*;
import java.util.Base64;
import java.io.FileNotFoundException;
import com.google.gson.Gson;
import java.util.*;

/**
 * This class authenticates and creates users
 */
public class UserDispatcher
{
	public UserDispatcher(){
		Users.initDFS();
	}
	
	/**
	 * authenticateUser: Check if a user and password is correct
	 * 
	 * @param username: Username
	 * @param password: password
	 * 
	 * @return user JSON on creation or "false" if user exists
	 */
	public String authenticateUser(String username, String password) throws FileNotFoundException, IOException {
		Gson gson = new Gson();
		Users users = new Users();
		try {
			users = gson.fromJson(new FileReader("users.json"), Users.class);
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (!users.exists(username))
			return "false";

		Users.User user = users.get(username);

		if (user.password.equals(password))
			return gson.toJson(user);

		return "false";
	}

	/**
	 * createUser: Creates a user
	 * 
	 * @param username: Username
	 * 
	 * @param password: password
	 * 
	 * @return "true" on account creation
	 */
	public String createUser(String username, String password) throws FileNotFoundException, IOException {
		Gson gson = new Gson();
		Users users = new Users();
		try {
			users = gson.fromJson(new FileReader("users.json"), Users.class);
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (!users.exists(username)) {
			users.users.add(new Users.User(username, password));

			String userJson = gson.toJson(users);
			System.out.println(userJson);

			FileWriter fileWriter = new FileWriter("users.json");
			fileWriter.write(userJson);
			fileWriter.close();
		}

		return "true";
	}
}
