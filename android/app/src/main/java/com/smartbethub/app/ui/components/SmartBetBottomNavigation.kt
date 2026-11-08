package com.smartbethub.app.ui.components

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Analytics
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.SportsSoccer
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.navigation.NavController
import androidx.navigation.compose.currentBackStackEntryAsState
import com.smartbethub.app.ui.theme.ElectricBlue
import com.smartbethub.app.ui.theme.NavySecondary
import com.smartbethub.app.ui.theme.TextMuted

sealed class BottomNavItem(val route: String, val title: String, val icon: ImageVector) {
    object Home : BottomNavItem("home", "Home", Icons.Filled.Home)
    object Matches : BottomNavItem("matches", "Tips", Icons.Filled.SportsSoccer)
    object AiLab : BottomNavItem("ai_analysis", "AI Lab", Icons.Filled.Analytics)
    object Vip : BottomNavItem("vip", "VIP Hub", Icons.Filled.Star)
    object Profile : BottomNavItem("profile", "Profile", Icons.Filled.Person)
}

@Composable
fun SmartBetBottomNavigation(navController: NavController) {
    val items = listOf(
        BottomNavItem.Home,
        BottomNavItem.Matches,
        BottomNavItem.AiLab,
        BottomNavItem.Vip,
        BottomNavItem.Profile
    )

    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    NavigationBar(
        containerColor = NavySecondary,
    ) {
        items.forEach { item ->
            val selected = currentRoute == item.route
            NavigationBarItem(
                icon = { Icon(item.icon, contentDescription = item.title) },
                label = { Text(item.title) },
                selected = selected,
                onClick = {
                    if (currentRoute != item.route) {
                        navController.navigate(item.route) {
                            popUpTo("home") { saveState = true }
                            launchSingleTop = true
                            restoreState = true
                        }
                    }
                },
                colors = NavigationBarItemDefaults.colors(
                    selectedIconColor = ElectricBlue,
                    selectedTextColor = ElectricBlue,
                    indicatorColor = ElectricBlue.copy(alpha = 0.15f),
                    unselectedIconColor = TextMuted,
                    unselectedTextColor = TextMuted
                )
            )
        }
    }
}
