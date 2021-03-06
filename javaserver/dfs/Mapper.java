package dfs;

import java.io.IOException;
import com.google.gson.*;
import java.util.*;

public class Mapper implements MapReduceInterface{

	/* 
	 * Maps the given value and emits it
	 * @param key key of vlaue
	 * @param value json object to map
	 * @param context our filemap helper class
	 * @param file file name
	 */
	@Override
	public void map(String key, JsonObject value, FileMap context, String file) throws IOException {

		/* parse new key */
		String newKey = value.getAsJsonObject("song").get("title").getAsString();
		//System.out.println("Mapping: "+newKey);

		/* make new value */
		JsonObject newValue = new JsonObject();
		newValue.addProperty("title",newKey);
		newValue.addProperty("duration",value.getAsJsonObject("song").get("duration").getAsString());
		newValue.addProperty("id",value.getAsJsonObject("song").get("id").getAsString());
		newValue.addProperty("artist",value.getAsJsonObject("artist").get("name").getAsString());
		newValue.addProperty("album",value.getAsJsonObject("release").get("name").getAsString());

		context.emit(newKey,newValue);
	}

	/*
	 * Reduces the given json array and emits it
	 * @param key key of values
	 * @param values the array of values
	 * @param context Chord to emit back too
	 * @param file file name
	 */
	@Override
	public void reduce(String key, JsonArray values, ChordMessageInterface context, String file) throws Exception{

		JsonArray newValues = sort(values);

		context.reduceEmit(key,newValues.toString());

	}

	/* Helper class to help sort */
	public class Song implements Comparable{
		String key;
		JsonObject song;
		public Song(String key,JsonObject song){
			this.key = key;
			this.song = song;
		}

		@Override
		public int compareTo(Object obj){
			return key.compareTo(((Song)obj).key);
		}
	}

	/* Sorts a given json array by their id
	 * @param values json array
	 */
	private JsonArray sort(JsonArray values){
		ArrayList<Song> songs = new ArrayList<Song>();
		for(JsonElement e : values){
			JsonObject music = e.getAsJsonObject();
			String key = music.get("id").getAsString();
			Song tempSong = new Song(key,music);
			songs.add(tempSong);
		}
		Collections.sort(songs);

		JsonArray result = new JsonArray();
		for(Song s : songs){
			result.add(s.song);
		}

		return result;
	}


}
