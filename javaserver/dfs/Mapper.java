package dfs;

import java.io.IOException;
import com.google.gson.*;

public class Mapper implements MapReduceInterface{

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

	@Override
	public void reduce(String key, JsonArray values, ChordMessageInterface context, String file) throws Exception{
		context.reduceEmit(key,values.toString());
	}


}
