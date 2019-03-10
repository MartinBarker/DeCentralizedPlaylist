package com.example.crisisapp;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.os.Environment;
import android.util.Log;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class saveLogcatToPhone extends Activity {

    /**
     * Called when the application is starting, before any activity, service, or receiver objects (excluding content providers) have been created.
     */
    public void onCreate() throws IOException {
        Log.i("myTag", "on create start");
        Process process = null;
        try {
            //need to have logcat command set MyAppTAG:V for verbose
            //process = Runtime.getRuntime().exec("logcat -d");
            process = Runtime.getRuntime().exec("logcat *:V -d");


        } catch (IOException e) {
            e.printStackTrace();
            Log.i("myTag", "err1 ioexception");
        }
        Log.i("myTag", "check1");
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        Log.i("myTag", "check2");
        StringBuilder log=new StringBuilder();
        String line = "";

        while ((line = bufferedReader.readLine()) != null) {
            log.append(line);
            Log.i("myTag", "line = "+line);
        }
        //Log.i("myTag", "line = "+line);
        //Log.i("myTag", "log = "+log);
        //Log.i("myTag", "on create end");
    }

    /* Checks if external storage is available for read and write */
    public boolean isExternalStorageWritable() {
        String state = Environment.getExternalStorageState();
        if ( Environment.MEDIA_MOUNTED.equals( state ) ) {
            return true;
        }
        return false;
    }

    /* Checks if external storage is available to at least read */
    public boolean isExternalStorageReadable() {
        String state = Environment.getExternalStorageState();
        if ( Environment.MEDIA_MOUNTED.equals( state ) ||
                Environment.MEDIA_MOUNTED_READ_ONLY.equals( state ) ) {
            return true;
        }
        return false;
    }

    private String readFromFile(Context context, String filepath) {

        String ret = "";

        try {
            InputStream inputStream = context.openFileInput("config.txt");

            if ( inputStream != null ) {
                InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
                BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
                String receiveString = "";
                StringBuilder stringBuilder = new StringBuilder();

                while ( (receiveString = bufferedReader.readLine()) != null ) {
                    stringBuilder.append(receiveString);
                }

                inputStream.close();
                ret = stringBuilder.toString();
                Log.i("myTag", "read from file: "+ret);
            }
        }
        catch (FileNotFoundException e) {
            Log.e("login activity", "File not found: " + e.toString());
        } catch (IOException e) {
            Log.e("login activity", "Can not read file: " + e.toString());
        }

        return ret;
    }
}
