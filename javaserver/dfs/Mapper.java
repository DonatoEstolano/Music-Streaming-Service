
package dfs;

import java.io.IOException;

import com.google.gson.JsonObject;

public class Mapper implements MapReduceInterface {

@Override
public void map(String key, JsonObject value, DFS context, String file) throws IOException {
	//let newKey be the song title in value
	//let newValue be a subset of value
	
	
	// The new values can have the items of interest
	// Song title, year of release, duration, artist and album
	
	Object newKey;
	Object newValue;
	context.emit(newKey, newValue, file);	
}
@Override
public void reduce(String key, JsonObject values, DFS context, String file) throws IOException {
	// TODO Auto-generated method stub
	sort(values);
	context.emit(key, values, file);
	}
