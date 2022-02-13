package com.madness.wallz.app;
import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;
import java.util.*;

import com.facebook.react.ReactActivity;

import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.initialization.AdapterStatus;
import com.google.android.gms.ads.initialization.InitializationStatus;
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState){
    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
    MobileAds.initialize(this, new OnInitializationCompleteListener() {
        @Override
        public void onInitializationComplete(InitializationStatus initializationStatus) {
            Map<String, AdapterStatus> statusMap = initializationStatus.getAdapterStatusMap();
            for (String adapterClass : statusMap.keySet()) {
                // Initialise an adapter for mediation
                AdapterStatus status = statusMap.get(adapterClass);
            }
        }
    });
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
