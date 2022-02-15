package com.madness.wallz.app;
import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;
import java.util.*;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState){
    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
  }

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
  super.onConfigurationChanged(newConfig);
  Intent intent = new Intent("onConfigurationChanged");
  intent.putExtra("newConfig", newConfig);
  sendBroadcast(intent);
  }

  @Override
  protected String getMainComponentName() {
    return "Elegant";
  }
}
