package dfs;

import com.google.gson.JsonObject;
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
		int nKey = keyToInt(key.toUpperCase().substring(0,2));
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

		public ArrayList<JsonObject> getValues(){
			ArrayList<JsonObject> result = new ArrayList<JsonObject>();
			System.out.println("Bound: "+lowerBound);
			for(Map.Entry<String,List<JsonObject>> entry : keyvalue.entrySet()){
				System.out.println("inner");
				List<JsonObject> temp = entry.getValue();
				for(JsonObject ele : temp){
					result.add(ele);
					System.out.println(" "+ele.get("title"));
				}
			}
			return result;
		}
	}
}
