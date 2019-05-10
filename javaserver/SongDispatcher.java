
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
		String result = "";
		int dfsPage = 0;
		Music[] music;

		int offset = page * count;

		do {
			music = getSongArray(dfsPage);
			dfsPage++;
			if (offset > music.length)
				;
			offset -= music.length;
		} while (offset > music.length);

		Music[] ret = new Music[count];

		for (int i = 0; i < ret.length; i++) {
			ret[i] = music[offset + i];
		}

		Gson gson = new Gson();
		return gson.toJson(ret);
	}

	/**
	 * Creates array of songs on a page
	 * 
	 * @param page: page from dfs
	 */
	private Music[] getSongArray(int page) throws Exception {
		RemoteInputFileStream rifs = dfs.read("map", page);
		rifs.connect();
		String result = "";
		while (rifs.available() > 0)
			result += (char) rifs.read();

		rifs.close();
		Gson gson = new Gson();
		Music[] music = gson.fromJson(result, Music[].class);
		return music;
	}

	/**
	 * searchSongs: filters a song
	 * 
	 * @param search: Search keyword
	 * @param count:  the number of songs
	 * @param page:   offset
	 */
	public String searchSongs(String search, Integer count, Integer page) throws Exception {
		String result = "";
		int dfsPage = 0;
		Music[] music;

		if(search.length()<2)
			search += "  ";
		String bounds = search.subString(0,2);

		int offset = -1 * page * count;
		Music[] ret = new Music[count];

		do {

			if(inBounds(bounds,getLowerBound(dfsPage),getUpperBound(dfsPage)){
				music = getSongArray(dfsPage);

				for (int i = 0; i < music.length; i++) {
					Music temp = music[i];
					if (matches(temp, search)) {
						if (offset > 0) {
							ret[offset] = temp;
						}
						offset++;
					}
				}
			}
			dfsPage++;

		} while (offset < count);

		Gson gson = new Gson();
		return gson.toJson(ret);
	}

	/**
	 * Checks to see if theres a match from the page and search
	 * 
	 * @param music:  song with metadata
	 * @param search: information of song being searched
	 * 
	 * @return true if sound is on the page
	 */
	private boolean matches(Music music, String search) {
		if (music.release.name.indexOf(search) != -1)
			return true;
		if (music.artist.name.indexOf(search) != -1)
			return true;
		return false;
	}

	char[] index = new char[]{'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9','-','+'};
	private boolean inBounds(String key,String lower,String upper){
		String sub = "";
		if(key.length()>0) sub += key.toUpperCase().charAt(0);
		else sub += "A";
		if(key.length()>1) sub += key.toUpperCase().charAt(1);
		else sub += "A";
		int nKey = keyToInt(sub);
		if(keyToInt(lower) <= nKey && nKey < keyToInt(upper))
			return true;
		return false;
	}

	/* convert keys to int for easier comparison */
	private int keyToInt(String key){
		int result = 0;

		for(int i=0;i<index.length;i++)
			if(index[i] == key.charAt(0))
				result += i*100;

		for(int i=0;i<index.length;i++)
			if(index[i] == key.charAt(1))
				result += i;

		return result;
	}

	private String getLowerBound(int page){
			return = dfs.lower("map", page);
	}

	private String getUpperBound(int page){
			return = dfs.lower("map", ++page);
	}


}
