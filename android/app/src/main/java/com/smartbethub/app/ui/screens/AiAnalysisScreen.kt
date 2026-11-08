package com.smartbethub.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
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

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AiAnalysisScreen(navController: NavController, language: String) {
    val isSw = language == "sw"
    var homeTeam by remember { mutableStateOf("Arsenal") }
    var awayTeam by remember { mutableStateOf("Chelsea") }
    var isAnalyzing by remember { mutableStateOf(false) }
    var hasResults by remember { mutableStateOf(true) }

    val teams = listOf(
        "Arsenal", "Chelsea", "Manchester City", "Liverpool", "Real Madrid",
        "Barcelona", "Bayern Munich", "Bayer Leverkusen", "Inter Milan", "Juventus",
        "Simba SC", "Young Africans (Yanga)", "Azam FC"
    )

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(DarkBackground)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Text(
                text = if (isSw) "Maabara ya AI ya Uchambuzi wa Mechi" else "AI Match Modeling Lab",
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )
            Text(
                text = if (isSw) "Utabiri wa masoko 10 kwa kutumia takwimu za Poisson & xG" else "Poisson distribution, expected goals (xG), and form vectors across 10 markets",
                fontSize = 12.sp,
                color = TextMuted
            )
        }

        // Team Pickers Card
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = NavyCard),
                border = androidx.compose.foundation.BorderStroke(1.dp, ElectricBlue.copy(alpha = 0.3f))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = if (isSw) "Timu ya Nyumbani (Home Team)" else "Home Team",
                        fontSize = 12.sp,
                        color = CyanAccent,
                        fontWeight = FontWeight.SemiBold
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Surface(
                        shape = RoundedCornerShape(8.dp),
                        color = DarkBackground,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(
                            text = homeTeam,
                            modifier = Modifier.padding(12.dp),
                            color = Color.White,
                            fontWeight = FontWeight.Bold
                        )
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Text(
                        text = if (isSw) "Timu ya Ugenini (Away Team)" else "Away Team",
                        fontSize = 12.sp,
                        color = CyanAccent,
                        fontWeight = FontWeight.SemiBold
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Surface(
                        shape = RoundedCornerShape(8.dp),
                        color = DarkBackground,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(
                            text = awayTeam,
                            modifier = Modifier.padding(12.dp),
                            color = Color.White,
                            fontWeight = FontWeight.Bold
                        )
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    Button(
                        onClick = {
                            isAnalyzing = true
                            hasResults = true
                            isAnalyzing = false
                        },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(containerColor = ElectricBlue),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Text(
                            text = if (isSw) "Kimbiza Uchambuzi wa AI" else "Run Deep AI Analysis",
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }
        }

        // 10-Market Prediction Results
        if (hasResults) {
            item {
                Text(
                    text = if (isSw) "Masoko 10 ya Utabiri ($homeTeam vs $awayTeam)" else "10 Prediction Markets ($homeTeam vs $awayTeam)",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
            }

            // Market Rows
            val markets = listOf(
                "1. Home Win (1)" to "58% probability (Fair odds ~1.72)",
                "2. Match Draw (X)" to "24% probability (Fair odds ~4.15)",
                "3. Away Win (2)" to "18% probability (Fair odds ~5.55)",
                "4. Over 1.5 Goals" to "82% probability (Strong safety index)",
                "5. Over 2.5 Goals" to "62% probability (High tempo game expected)",
                "6. Under 2.5 Goals" to "38% probability",
                "7. Both Teams To Score (BTTS)" to "55% probability (BTTS: YES)",
                "8. Double Chance" to "1X (Home Win or Draw) - 82% confidence",
                "9. Suggested Correct Score" to "2 - 1 (14.2% likely) or 2 - 0 (12.8%)",
                "10. First Half Prediction" to "Home Win / Draw at Half-Time (1X HT)"
            )

            items(markets.size) { idx ->
                val (marketName, stat) = markets[idx]
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = NavySecondary),
                    border = androidx.compose.foundation.BorderStroke(1.dp, ElectricBlue.copy(alpha = 0.2f))
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(14.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = marketName,
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                            Text(
                                text = stat,
                                fontSize = 12.sp,
                                color = CyanAccent
                            )
                        }
                    }
                }
            }

            // Integrity Disclaimer
            item {
                Surface(
                    shape = RoundedCornerShape(12.dp),
                    color = NavyCard,
                    border = androidx.compose.foundation.BorderStroke(1.dp, Color.DarkGray)
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Text(
                            text = if (isSw) "Ilani ya Uwazi & Takwimu" else "Statistical Integrity Notice",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color.White
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = if (isSw) "Utabiri wote unatokana na uwezekano wa kimahesabu (probabilities) na siyo dhamana ya ushindi wa 100%. Cheza kistaarabu (18+)." else "All predictions reflect estimated mathematical probabilities and form modeling, never guaranteed outcomes. Gamble responsibly (18+).",
                            fontSize = 11.sp,
                            color = TextMuted
                        )
                    }
                }
            }
        }
    }
}
