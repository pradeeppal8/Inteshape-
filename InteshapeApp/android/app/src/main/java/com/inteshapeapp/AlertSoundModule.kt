package com.inteshapeapp

import android.media.AudioManager
import android.media.ToneGenerator
import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class AlertSoundModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "AlertSound"

  @ReactMethod
  fun playSuccess() {
    val toneGenerator = ToneGenerator(AudioManager.STREAM_NOTIFICATION, 85)
    toneGenerator.startTone(ToneGenerator.TONE_PROP_ACK, 450)
    Handler(Looper.getMainLooper()).postDelayed({ toneGenerator.release() }, 600)
  }
}