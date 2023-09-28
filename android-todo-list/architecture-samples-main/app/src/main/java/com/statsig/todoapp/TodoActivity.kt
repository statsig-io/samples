/*
 * Copyright 2019 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.statsig.todoapp

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.lifecycle.lifecycleScope
import com.google.accompanist.appcompattheme.AppCompatTheme
import com.statsig.androidsdk.InitializationDetails
import com.statsig.androidsdk.Statsig
import com.statsig.androidsdk.StatsigUser
import com.statsig.todoapp.util.StatsigUtil
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

/**
 * Main activity for the todoapp
 */
@AndroidEntryPoint
class TodoActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        lifecycleScope.launch {
            val initializationDetails = initializeStatsigSdk()
            if (initializationDetails != null) {
                initializationDetails.let {
                    if (it.success) {
                        setContent {
                            Statsig.logEvent(StatsigUtil.APP_OPENED)
                            AppCompatTheme {
                                TodoNavGraph()
                            }
                        }
                    } else {
                        showSdkNotInitializedToast()
                        finish()
                    }
                }
            } else {
                showSdkNotInitializedToast()
                finish()
            }
        }
    }

    private suspend fun initializeStatsigSdk(): InitializationDetails? =
        withContext(Dispatchers.IO) {
            Statsig.initialize(
                this@TodoActivity.application,
                BuildConfig.STATSIG_CLIENT_API_KEY,
                StatsigUser(null)
            )
        }

    private fun showSdkNotInitializedToast() {
        Toast.makeText(
            this@TodoActivity,
            getString(R.string.sdk_not_initialized),
            Toast.LENGTH_LONG
        ).show()
    }

    override fun onPause() {
        super.onPause()
        Statsig.logEvent(StatsigUtil.APP_BACKGROUNDED)
    }

}
