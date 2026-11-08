package com.smartbethub.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.smartbethub.app.ui.theme.*

@Composable
fun HomeScreen(navController: NavController, language: String) {
    val isSw = language == "sw"

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(DarkBackground)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // App Header
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "SMART BET HUB",
                        fontSize = 22.sp,
                        fontWeight = FontWeight.Black,
                        color = ElectricBlue
                    )
                    Text(
                        text = if (isSw) "Utabiri wa Mechi & Uchambuzi wa AI" else "AI Football Engine & Sports Analytics",
                        fontSize = 12.sp,
                        color = TextMuted
                    )
                }
                Surface(
                    shape = RoundedCornerShape(20.dp),
                    color = WinGreen.copy(alpha = 0.15f),
                    border = androidx.compose.foundation.BorderStroke(1.dp, WinGreen.copy(alpha = 0.5f))
                ) {
                    Row(
                        modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "78.4% " + (if (isSw) "Ushindi" else "Win Rate"),
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            color = WinGreen
                        )
                    }
                }
            }
        }

        // Banker of the Day Card
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(16.dp))
                    .clickable { navController.navigate("matches") },
                colors = CardDefaults.cardColors(containerColor = NavySecondary),
                border = androidx.compose.foundation.BorderStroke(1.dp, ElectricBlue.copy(alpha = 0.4f))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Surface(
                            shape = RoundedCornerShape(6.dp),
                            color = ElectricBlue.copy(alpha = 0.2f)
                        ) {
                            Text(
                                text = if (isSw) "MKWANJA WA LEO (BANKER)" else "BANKER OF THE DAY",
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                                fontSize = 11.sp,
                                fontWeight = FontWeight.ExtraBold,
                                color = CyanAccent
                            )
                        }
                        Text(
                            text = "19:45 EAT",
                            fontSize = 12.sp,
                            color = TextMuted
                        )
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(
                                text = "Arsenal vs Chelsea",
                                fontSize = 18.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                            Text(
                                text = "English Premier League",
                                fontSize = 12.sp,
                                color = TextMuted
                            )
                        }
                        Text(
                            text = "@1.82",
                            fontSize = 18.sp,
                            fontWeight = FontWeight.Black,
                            color = CyanAccent
                        )
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(
                                text = if (isSw) "Utabiri: Arsenal Kushinda & Zaidi ya 1.5" else "Tip: Arsenal Win & Over 1.5 Goals",
                                fontSize = 14.sp,
                                fontWeight = FontWeight.SemiBold,
                                color = WinGreen
                            )
                            Text(
                                text = if (isSw) "Uhakika wa AI: 84%" else "AI Confidence: 84%",
                                fontSize = 12.sp,
                                color = TextMuted
                            )
                        }
                        Button(
                            onClick = { navController.navigate("matches") },
                            colors = ButtonDefaults.buttonColors(containerColor = ElectricBlue)
                        ) {
                            Text(if (isSw) "Tazama" else "View")
                        }
                    }
                }
            }
        }

        // Quick AI Lab Launcher
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(16.dp))
                    .clickable { navController.navigate("ai_analysis") },
                colors = CardDefaults.cardColors(containerColor = NavyCard),
                border = androidx.compose.foundation.BorderStroke(1.dp, CyanAccent.copy(alpha = 0.3f))
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        Icons.Filled.Analytics,
                        contentDescription = "AI Match Engine",
                        tint = CyanAccent,
                        modifier = Modifier.size(36.dp)
                    )
                    Spacer(modifier = Modifier.width(16.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = if (isSw) "Uchambuzi Maalum wa AI" else "Custom Match AI Modeler",
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color.White
                        )
                        Text(
                            text = if (isSw) "Chagua timu 2 za EPL, La Liga, au NBC Ligi Kuu" else "Select any 2 clubs for 10-market probability analysis",
                            fontSize = 12.sp,
                            color = TextMuted
                        )
                    }
                    Icon(
                        Icons.Filled.ChevronRight,
                        contentDescription = "Navigate",
                        tint = TextMuted
                    )
                }
            }
        }

        // VIP Pass Banner
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(16.dp))
                    .clickable { navController.navigate("vip") },
                colors = CardDefaults.cardColors(containerColor = NavySecondary),
                border = androidx.compose.foundation.BorderStroke(1.dp, GoldVip.copy(alpha = 0.5f))
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        Icons.Filled.Star,
                        contentDescription = "VIP",
                        tint = GoldVip,
                        modifier = Modifier.size(36.dp)
                    )
                    Spacer(modifier = Modifier.width(16.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = if (isSw) "Jiunge na VIP Hub (M-Pesa / Tigo)" else "Join VIP Hub (M-Pesa / Tigo)",
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Bold,
                            color = GoldVip
                        )
                        Text(
                            text = if (isSw) "Tiketi za uhakika za odds 10+, Matokeo Sahihi & Acca" else "Odds 10+ Safe Tickets, Correct Score, and Daily Accas",
                            fontSize = 12.sp,
                            color = TextMuted
                        )
                    }
                }
            }
        }
    }
}
