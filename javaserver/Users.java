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

public class Users{
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

	public Users(){
		users = new ArrayList<User>();
	}
	public boolean exists(String username){
		for(int i=0;i<users.size();i++){
			if(users.get(i).username.equals(username))
				return true;
		}
		return false;
	}
	public User get(String username){
		for(int i=0;i<users.size();i++){
			if(users.get(i).username.equals(username))
				return users.get(i);
		}
		return null;
	}

	public static class User{
		String username;
		String password;
		ArrayList<Playlist> playlist;
		public User(){
			playlist = new ArrayList<Playlist>();
		}
		public User(String username, String password){
			this.username = username;
			this.password = password;
			playlist = new ArrayList<Playlist>();
		}
		public boolean existsPlaylist(String name){
			for(int i=0;i<playlist.size();i++){
				if(playlist.get(i).name.equals(name))
					return true;
			}
			return false;
		}
		public Playlist getPlaylist(String name){
			for(int i=0;i<playlist.size();i++){
				if(playlist.get(i).name.equals(name))
					return playlist.get(i);
			}
			return null;
		}
		public Playlist deletePlaylist(String name){
			for(int i=0;i<playlist.size();i++){
				if(playlist.get(i).name.equals(name))
					return playlist.remove(i);
			}
			return null;
		}
	}

	public static class Playlist{
		String name;
		ArrayList<Song> songs;
		public Playlist(){
			songs = new ArrayList<Song>();
		}
		public Playlist(String name){
			this.name = name;
		}
		public Song deleteSong(String id){
			for(int i=0;i<songs.size();i++){
				if(songs.get(i).id.equals(id))
					return songs.remove(i);
			}
			return null;
		}
	}

	public static class Song{
		String id;
		String name;
		String artist;
		String duration;
		public Song(){}
		public Song(String id, String name, String artist, String duration){
			this.id = id;
			this.name = name;
			this.artist = artist;
			this.duration = duration;
		}
	}

	public static Users getUsers(){
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

	public static void save(Users users) throws Exception{
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
