package com.example.crisisapp;

import android.media.AudioAttributes;
import android.media.MediaMetadata;
import android.media.session.PlaybackState;
import android.os.Bundle;
import android.media.session.MediaSession.QueueItem;
import android.util.Log;
import android.os.Bundle;

import java.util.List;

public class MediaController extends android.media.MediaMetadata{

    MediaController(Bundle bundle) {
        super(bundle);
    }

    public MediaController() {
        super();
    }

    public void getMediaMetadata(){
        Log.i("myTag", "inside getMediaMetadata()");
        MediaMetadata mc = new MediaMetadata();
        //String title = mc.getString("METADATA_KEY_TITLE");
        //Log.i("myTag", "METADATA_KEY_TITLE = "+title);
    }

}
