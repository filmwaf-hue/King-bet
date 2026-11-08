package com.smartbethub.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.smartbethub.app.ui.components.SmartBetBottomNavigation
import com.smartbethub.app.ui.screens.*
import com.smartbethub.app.ui.theme.SmartBetHubTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            SmartBetHubTheme {
                val navController = rememberNavController()
                var currentLanguage by remember { mutableStateOf("en") } // "en" or "sw"

                Scaffold(
                    modifier = Modifier.fillMaxSize(),
                    bottomBar = {
                        SmartBetBottomNavigation(navController = navController)
                    }
                ) { innerPadding ->
                    NavHost(
                        navController = navController,
                        startDestination = "home",
                        modifier = Modifier.padding(innerPadding)
                    ) {
                        composable("home") {
                            HomeScreen(
                                navController = navController,
                                language = currentLanguage
                            )
                        }
                        composable("matches") {
                            MatchesScreen(
                                navController = navController,
                                language = currentLanguage
                            )
                        }
                        composable("ai_analysis") {
                            AiAnalysisScreen(
                                navController = navController,
                                language = currentLanguage
                            )
                        }
                        composable("vip") {
                            VipScreen(
                                navController = navController,
                                language = currentLanguage
                            )
                        }
                        composable("profile") {
                            ProfileScreen(
                                navController = navController,
                                language = currentLanguage,
                                onLanguageChange = { newLang -> currentLanguage = newLang }
                            )
                        }
                        composable("admin") {
                            AdminScreen(navController = navController)
                        }
                    }
                }
            }
        }
    }
}
