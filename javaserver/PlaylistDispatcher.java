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
 * This class handles modifying a user's playlist
 */
public class PlaylistDispatcher {
	public PlaylistDispatcher() {
	}

	/**
	 * getPlaylist: Get a user's playlist
	 * 
	 * @param username: Username
	 * @return Playlist JSON
	 */
	public String getPlaylist(String username) throws FileNotFoundException, IOException {
		Users users = Users.getUsers();

		if (!users.exists(username))
			return "[]";
		Users.User user = users.get(username);

		Gson gson = new Gson();
		return gson.toJson(user.playlist);
	}

	/**
	 * This method creates a user's playlist
	 * 
	 * @param username:     Username
	 * @param playlistName: Name of new playlist
	 * @return Playlist JSON
	 */
	public String createPlaylist(String username, String playlistName) throws Exception {
		Users users = Users.getUsers();

		if (!users.exists(username))
			return "[]";

		Users.User user = users.get(username);

		user.playlist.add(new Users.Playlist(playlistName));

		Users.save(users);

		Gson gson = new Gson();
		return gson.toJson(user.playlist);
	}

	/**
	 * Deletes a user's playlist
	 * 
	 * @param username:     Username
	 * @param playlistName: name of playlist to be deleted
	 * @return Playlist JSON after deleting
	 */
	public String deletePlaylist(String username, String playlistName) throws Exception {
		Users users = Users.getUsers();

		if (!users.exists(username))
			return "[]";

		Users.User user = users.get(username);

		user.deletePlaylist(playlistName);

		Users.save(users);

		Gson gson = new Gson();
		return gson.toJson(user.playlist);
	}

	/**
	 * Adds a song to a playlist
	 * 
	 * @param username:     Username
	 * @param playlistName: Name of playlist song is being added to
	 * @param songId:       Song's ID
	 * @param songName:     Song's name
	 * @param artist:       Song's artist
	 * @param duration:     Song's duration
	 * @return Playlist JSON
	 */
	public String addSong(String username, String playlistName, String songId, String songName, String artist,
			String duration) throws Exception {
		Users users = Users.getUsers();

		if (!users.exists(username))
			return "[]";
		Users.User user = users.get(username);

		if (!user.existsPlaylist(playlistName))
			return "[]";
		Users.Playlist playlist = user.getPlaylist(playlistName);

		playlist.songs.add(new Users.Song(songId, songName, artist, duration));

		Users.save(users);

		Gson gson = new Gson();
		return gson.toJson(user.playlist);
	}

	/**
	 * Deletes a song from a playlist
	 * 
	 * @param username:     Username
	 * @param playlistName: Name of playlist song is being added to
	 * @param songId:       Song's ID
	 * @return Playlist JSON
	 */
	public String deleteSong(String username, String playlistName, String songId) throws Exception {
		Users users = Users.getUsers();

		if (!users.exists(username))
			return "[]";
		Users.User user = users.get(username);

		if (!user.existsPlaylist(playlistName))
			return "[]";
		Users.Playlist playlist = user.getPlaylist(playlistName);

		playlist.deleteSong(songId);

		Users.save(users);

		Gson gson = new Gson();
		return gson.toJson(user.playlist);
	}

}
