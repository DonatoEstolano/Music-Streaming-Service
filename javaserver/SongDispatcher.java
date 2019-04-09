
/**
* SongDispatcher is the main responsable for obtaining the songs 
*
* @author  Oscar Morales-Ponce
* @version 0.15
* @since   02-11-2019 
*/

import java.io.IOException;
import java.io.InputStream;
import java.io.FileReader;
import java.io.FileInputStream;
import java.io.File;
import java.util.Base64;
import java.io.FileNotFoundException;
import com.google.gson.Gson;

import dfs.*;

public class SongDispatcher {

	static final int PORT = 7778;
	static final int JOIN_PORT = 7777;
	static final int FRAGMENT_SIZE = 8192;
	// static final int FRAGMENT_SIZE = 40000;
	DFS dfs;

	/**
	 * Base constructor for SongDispatcher
	 */
	public SongDispatcher() {
		try {
			dfs = new DFS(PORT);
			dfs.join("127.0.0.1", JOIN_PORT);
		} catch (Exception e) {
			System.out.println(e);
		}
	}

	/**
	 * getSongChunk: Gets a chunk of a given song
	 * 
	 * @param song:     Song ID. Each song has a unique ID
	 * @param fragment: The chunk corresponds to [fragment * FRAGMENT_SIZE,
	 *                  FRAGMENT_SIZE]
	 * @return Returns String with song chunk
	 */
	public String getSongChunk(String song, Long fragment) throws FileNotFoundException, IOException {
		System.out.println(song);
		System.out.println(fragment);
		byte buf[] = new byte[FRAGMENT_SIZE];

		try {
			RemoteInputFileStream rifs = dfs.read(song, 0);
			rifs.connect();
			rifs.skip(fragment * FRAGMENT_SIZE);
			/*
			 * for(int i=0;i<fragment*FRAGMENT_SIZE;i++) rifs.read();
			 */
			rifs.read(buf, 0, FRAGMENT_SIZE);
			rifs.close();
		} catch (Exception e) {
		}

		// Encode in base64 so it can be transmitted
		return Base64.getEncoder().encodeToString(buf);
	}

	/**
	 * getFileSize: Gets a size of the file
	 * 
	 * @param song: Song ID. Each song has a unique ID
	 * @return Int holding file size
	 */
	public Integer getFileSize(String song) throws FileNotFoundException, IOException {
		Integer total = 0;
		try {
			RemoteInputFileStream rifs = dfs.read(song, 0);
			rifs.connect();
			total = rifs.available();
			rifs.close();
		} catch (Exception e) {
		}

		return total;
	}

	/**
	 * getSongs: gets songs
	 * 
	 * @param count: The count to return
	 * 
	 * @param page:  What page to return
	 * @return returns "Done" after printing size of music
	 */
	public String getSongs(Integer count, Integer page) throws Exception {
		System.out.println("getSongs");
		String result = "";
		RemoteInputFileStream rifs = dfs.read("musicjson", 0);
		rifs.connect();
		while (rifs.available() > 0)
			result += (char) rifs.read();

		rifs.close();

		Gson gson = new Gson();
		Music[] music = gson.fromJson(result, Music[].class);

		System.out.println(music.length);

		return "done";
	}

}
