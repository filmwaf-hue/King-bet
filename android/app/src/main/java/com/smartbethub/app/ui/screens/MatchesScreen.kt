package com.smartbethub.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.smartbethub.app.ui.theme.*

data class MatchTip(
    val id: String,
    val homeTeam: String,
    val awayTeam: String,
    val league: String,
    val kickoff: String,
    val prediction: String,
    val odds: Double,
    val confidence: Int,
    val isVip: Boolean,
    val homeProb: Int,
    val drawProb: Int,
    val awayProb: Int,
    val bttsProb: Int,
    val over25Prob: Int
)

@Composable
fun MatchesScreen(navController: NavController, language: String) {
    val isSw = language == "sw"
    var selectedCategory by remember { mutableStateOf("ALL") }

    val categories = listOf(
        "ALL" to (if (isSw) "Zote" else "All Fixtures"),
        "FREE" to (if (isSw) "Bure (Free)" else "Free Tips"),
        "VIP" to (if (isSw) "Vip Pekee" else "VIP Premium"),
        "SAFE" to (if (isSw) "Uhakika 90%+" else "Safe Picks"),
        "OVER_UNDER" to (if (isSw) "Magoli (O/U)" else "Over / Under"),
        "BTTS" to (if (isSw) "Kufungana (GG)" else "Both Teams Score")
    )

    val sampleTips = remember {
        listOf(
            MatchTip("1", "Arsenal", "Chelsea", "Premier League", "19:45 EAT", "Arsenal Win & Over 1.5", 1.82, 84, false, 58, 24, 18, 55, 62),
            MatchTip("2", "Real Madrid", "Barcelona", "La Liga (El Clásico)", "22:00 EAT", "Both Teams To Score & Over 2.5", 1.70, 88, false, 45, 25, 30, 78, 71),
            MatchTip("3", "Inter Milan", "Juventus", "Serie A", "21:45 EAT", "Inter Win or Draw (1X) & Under 3.5", 1.55, 91, false, 52, 28, 20, 42, 38),
            MatchTip("4", "Bayern Munich", "Bayer Leverkusen", "Bundesliga", "20:30 EAT", "Over 3.5 Goals Total", 2.15, 82, true, 48, 22, 30, 80, 76),
            MatchTip("5", "Simba SC", "Young Africans (Yanga)", "NBC Premier League", "17:00 EAT", "Under 2.5 Goals / Draw at HT", 1.65, 86, false, 36, 38, 26, 38, 30),
            MatchTip("6", "PSG", "Monaco", "Ligue 1", "22:00 EAT", "PSG Win & BTTS Yes", 2.45, 79, true, 64, 18, 18, 68, 74)
        )
    }

    val filteredTips = sampleTips.filter { tip ->
        when (selectedCategory) {
            "FREE" -> !tip.isVip
            "VIP" -> tip.isVip
            "SAFE" -> tip.confidence >= 85
            "OVER_UNDER" -> tip.prediction.contains("Over") || tip.prediction.contains("Under")
            "BTTS" -> tip.prediction.contains("Both") || tip.prediction.contains("BTTS")
            else -> true
        }
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(DarkBackground)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Text(
                text = if (isSw) "Utabiri wa Mechi za Leo" else "Today's Verified Predictions",
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )
            Text(
                text = if (isSw) "Uchambuzi unaotegemea takwimu za uhakika na mfumo wa AI" else "Mathematical modeling & form analysis engine",
                fontSize = 12.sp,
                color = TextMuted
            )
        }

        // Horizontal Category Tabs
        item {
            LazyRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(categories) { (key, label) ->
                    val isSelected = selectedCategory == key
                    Surface(
                        shape = RoundedCornerShape(20.dp),
                        color = if (isSelected) ElectricBlue else NavySecondary,
                        border = androidx.compose.foundation.BorderStroke(
                            1.dp,
                            if (isSelected) CyanAccent else Color.DarkGray
                        ),
                        modifier = androidx.compose.ui.Modifier.clickable { selectedCategory = key }
                    ) {
                        Text(
                            text = label,
                            modifier = Modifier.padding(horizontal = 14.dp, vertical = 8.dp),
                            fontSize = 12.sp,
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                            color = if (isSelected) Color.White else TextMuted
                        )
                    }
                }
            }
        }

        // Tip Cards List
        items(filteredTips) { tip ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(
                    containerColor = if (tip.isVip) NavySecondary else NavyCard
                ),
                border = androidx.compose.foundation.BorderStroke(
                    1.dp,
                    if (tip.isVip) GoldVip.copy(alpha = 0.5f) else ElectricBlue.copy(alpha = 0.2f)
                )
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = tip.league,
                            fontSize = 12.sp,
                            color = CyanAccent,
                            fontWeight = FontWeight.SemiBold
                        )
                        if (tip.isVip) {
                            Surface(
                                shape = RoundedCornerShape(6.dp),
                                color = GoldVip.copy(alpha = 0.2f)
                            ) {
                                Text(
                                    text = "VIP EXCLUSIVE",
                                    modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp),
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Black,
                                    color = GoldVip
                                )
                            }
                        } else {
                            Text(
                                text = tip.kickoff,
                                fontSize = 11.sp,
                                color = TextMuted
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    Text(
                        text = "${tip.homeTeam} vs ${tip.awayTeam}",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )

                    Spacer(modifier = Modifier.height(10.dp))

                    Surface(
                        shape = RoundedCornerShape(8.dp),
                        color = DarkBackground,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Row(
                            modifier = Modifier.padding(10.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column {
                                Text(
                                    text = if (isSw) "Utabiri wa AI" else "Predicted Outcome",
                                    fontSize = 10.sp,
                                    color = TextMuted
                                )
                                Text(
                                    text = tip.prediction,
                                    fontSize = 13.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = WinGreen
                                )
                            }
                            Column(horizontalAlignment = Alignment.End) {
                                Text(
                                    text = "@${tip.odds}",
                                    fontSize = 16.sp,
                                    fontWeight = FontWeight.Black,
                                    color = ElectricBlue
                                )
                                Text(
                                    text = "${tip.confidence}% Conf",
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.SemiBold,
                                    color = WinGreen
                                )
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    // Probability Distributions
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = "1: ${tip.homeProb}%", fontSize = 11.sp, color = TextMuted)
                        Text(text = "X: ${tip.drawProb}%", fontSize = 11.sp, color = TextMuted)
                        Text(text = "2: ${tip.awayProb}%", fontSize = 11.sp, color = TextMuted)
                        Text(text = "GG: ${tip.bttsProb}%", fontSize = 11.sp, color = CyanAccent)
                        Text(text = "O2.5: ${tip.over25Prob}%", fontSize = 11.sp, color = WinGreen)
                    }
                }
            }
        }
    }
}
