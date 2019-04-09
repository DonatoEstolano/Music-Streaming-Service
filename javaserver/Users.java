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
import dfs.*;

/**
 * This class handles Users and related classes
 */
public class Users {
	/**
	 * Arraylist of User objects
	 */
	ArrayList<User> users;
	static final int PORT = 7779;
	static final int JOIN_PORT = 7777;
	public static DFS dfs;
	public static void initDFS(){
		try{
			dfs = new DFS(PORT);
			dfs.join("127.0.0.1", JOIN_PORT);            
		}catch(Exception e){
			e.printStackTrace();
		}
	}

	/**
	 * Base constructor for Users. Makes an array of type User
	 */
	public Users(){
		users = new ArrayList<User>();
	}

	/**
	 * Checks if the account exists
	 * 
	 * @param username: Username
	 * @return true if account exists
	 */
	public boolean exists(String username) {
		for (int i = 0; i < users.size(); i++) {
			if (users.get(i).username.equals(username))
				return true;
		}
		return false;
	}

	/**
	 * Returns User
	 * 
	 * @param username: Username
	 * @return User object with matching username
	 */
	public User get(String username) {
		for (int i = 0; i < users.size(); i++) {
			if (users.get(i).username.equals(username))
				return users.get(i);
		}
		return null;
	}

	/**
	 * Handles playlists for a User
	 */
	public static class User {
		/**
		 * Username
		 */
		String username;
		/**
		 * Password
		 */
		String password;
		/**
		 * Arraylist of Playlist objects
		 */
		ArrayList<Playlist> playlist;

		/**
		 * Base constructor for User. Creates list of Playlist objects
		 */
		public User() {
			playlist = new ArrayList<Playlist>();
		}

		/**
		 * Overloaded Constructor for User
		 * 
		 * @param username: Username
		 * @param password: Password
		 */
		public User(String username, String password) {
			this.username = username;
			this.password = password;
			playlist = new ArrayList<Playlist>();
		}

		/**
		 * Checks to see if theres a playlist with the same name
		 * 
		 * @param name: Playlist name
		 * @return true if playlist has the same name
		 */
		public boolean existsPlaylist(String name) {
			for (int i = 0; i < playlist.size(); i++) {
				if (playlist.get(i).name.equals(name))
					return true;
			}
			return false;
		}

		/**
		 * Returns the playlist with the matching name
		 * 
		 * @param name: Playlist name
		 * @return Playlist object with the matching name
		 */
		public Playlist getPlaylist(String name) {
			for (int i = 0; i < playlist.size(); i++) {
				if (playlist.get(i).name.equals(name))
					return playlist.get(i);
			}
			return null;
		}

		/**
		 * Deletes playlist with matching name
		 * 
		 * @param name: Playlist name
		 * @return Returns playlist after removing
		 */
		public Playlist deletePlaylist(String name) {
			for (int i = 0; i < playlist.size(); i++) {
				if (playlist.get(i).name.equals(name))
					return playlist.remove(i);
			}
			return null;
		}
	}

	/**
	 * This class handles the songs in an array
	 */
	public static class Playlist {
		/**
		 * Username
		 */
		String name;
		/**
		 * Arraylist of Song objects
		 */
		ArrayList<Song> songs;

		/**
		 * Base constructor for Playlist
		 */
		public Playlist() {
			songs = new ArrayList<Song>();
		}

		/**
		 * Overloaded Constructor for Playlist
		 * 
		 * @param name: Playlist name
		 */
		public Playlist(String name) {
			this.name = name;
		}

		/**
		 * Removes song from playlist
		 * 
		 * @param id: Song ID
		 * @return playlist after removing a song
		 */
		public Song deleteSong(String id) {
			for (int i = 0; i < songs.size(); i++) {
				if (songs.get(i).id.equals(id))
					return songs.remove(i);
			}
			return null;
		}
	}

	/**
	 * This class holds song info
	 */
	public static class Song {
		/**
		 * Song ID
		 */
		String id;
		/**
		 * Song name
		 */
		String name;
		/**
		 * Song artist
		 */
		String artist;
		/**
		 * Song duration
		 */
		String duration;

		/** Base constructor for Song */
		public Song() {
		}

		/**
		 * Overloaded constructor for Song
		 * 
		 * @param id:       Song ID
		 * @param name:     Song name
		 * @param artist:   Song artist
		 * @param duration: Song duration
		 */
		public Song(String id, String name, String artist, String duration) {
			this.id = id;
			this.name = name;
			this.artist = artist;
			this.duration = duration;
		}
	}

	/**
	 * Returns all users
	 * 
	 * @return Array of users
	 */
	public static Users getUsers() {
		Gson gson = new Gson();
		Users users = new Users();
		try{

			String result = "";
			RemoteInputFileStream rifs = dfs.read("users",0);
			rifs.connect();
			while(rifs.available()>0)
				result += (char)rifs.read();
			rifs.close();
			System.out.println(result);
			users = gson.fromJson(result,Users.class);

		}catch(Exception e){
			e.printStackTrace();
		}
		return users;
	}

	/**
	 * Writes new user to the JSON file
	 * 
	 * @param users: new User information
	 */
	public static void save(Users users) throws Exception {
		Gson gson = new Gson();
		String userJson = gson.toJson(users);

		/* Save to file so we can create a remote input file stream */
		FileWriter fileWriter = new FileWriter("users.json");
		fileWriter.write(userJson);
		fileWriter.close();

		/* Save the file to our dfs */
		RemoteInputFileStream rifs = new RemoteInputFileStream("users.json");
		dfs.write("users", rifs, 0);
		rifs.close();
	}
}
