package dfs;

import com.google.gson.*;
import java.util.*;
import java.io.*;

public class FileMap implements Serializable{

	int counter;
	String filename;
	ArrayList<Page> pages;
	char[] index = new char[]{'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9','-','+'};
	int currentPage;

	public FileMap(String file){
		this.filename = file;
		pages = new ArrayList<Page>();
		counter = 0;
		currentPage = 0;
	}

	public void onPageComplete(){
		counter--;
	}

	public void appendEmptyPage(long id, String lower){
		pages.add(new Page(id,lower));
	}

	public void emit(String key, JsonObject value){
		for(int i=0;i<pages.size();i++){
			if(i == pages.size()-1){
				pages.get(i).addKeyValue(key,value);
				//System.out.println(pages.get(i).lowerBound + " <= "+key);
			}else if(inBounds(pages.get(i).lowerBound,key,pages.get(i+1).lowerBound)){
				//System.out.println(pages.get(i).lowerBound + " <= "+key+" < "+pages.get(i+1).lowerBound);
				pages.get(i).addKeyValue(key,value);
				return;
			}
		}
	}

	/* Check if the key is in bound */
	private boolean inBounds(String lower,String key,String upper){
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

	public void combine(FileMap file){
		for(Page page : file.pages){
			for(Map.Entry<String,List<JsonObject>> entry : page.keyvalue.entrySet()){
				String key = entry.getKey();
				List<JsonObject> temp = entry.getValue();
				for(int i=0;i<temp.size();i++){
					this.emit(key,temp.get(i));
				}
			}
		}
	}

	public Page getNextPage(){
		System.out.println(currentPage);
		return pages.get(currentPage++);
	}

	public class Page implements Serializable{
		String lowerBound;
		long pageId;
		TreeMap<String, List<JsonObject>> keyvalue;

		public Page(long pageId, String lowerBound){
			this.lowerBound = lowerBound;
			this.pageId = pageId;
			keyvalue = new TreeMap<String, List<JsonObject>>();
		}

		public void addKeyValue(String key, JsonObject value){
			if(keyvalue.containsKey(key)){
				keyvalue.get(key).add(value);
			}else{
				List<JsonObject> tempList = new ArrayList<JsonObject>();
				tempList.add(value);
				keyvalue.put(key,tempList);
			}
		}

		public JsonArray getValues(){
			JsonArray array = new JsonArray();
			for(Map.Entry<String,List<JsonObject>> entry : keyvalue.entrySet()){
				List<JsonObject> temp = entry.getValue();
				for(JsonObject ele : temp){
					array.add(ele);
				}
			}
			return array;
		}
	}
}
