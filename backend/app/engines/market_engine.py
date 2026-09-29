from typing import List
from app.models.schemas import MarketAnalysisRequest, MarketAnalysisResponse, DemographicInsight, CompetitorInfo, PricingBenchmark
from app.services.data_service import DataService

class MarketIntelligenceEngine:
    """
    Hyper-Local Market Intelligence Engine.
    Analyzes local demand, target demographics, pricing benchmarks, and competition density
    using curated representative rural enterprise archetypes.
    """

    @staticmethod
    def analyze_market(request: MarketAnalysisRequest) -> MarketAnalysisResponse:
        sector_id = request.get_sector_id()
        district_id = request.get_district_id()
        investment = request.get_investment_amount()

        sector = DataService.get_sector_by_id(sector_id)
        district = DataService.get_district_by_id(district_id)

        sector_name = sector.name if sector else sector_id.replace('-', ' ').title()
        district_name = f"{district.name}, {district.state}" if district else district_id.replace('-', ' ').title()

        # Dynamic calculations based on investment amount and sector
        base_demand = 82.0
        if investment > 500000:
            base_demand += 5.0

        if sector_id == "dairy-processing":
            demographics = [
                DemographicInsight(segment="Local Sweet Shops & Bakeries", percentage=45.0, buying_power="High", needs=["Bulk Paneer", "Fresh Ghee", "Butter"]),
                DemographicInsight(segment="Rural & Semi-Urban Households", percentage=35.0, buying_power="Moderate", needs=["Standardized Milk", "Curd Packets"]),
                DemographicInsight(segment="Highway Dhabas & Restaurants", percentage=20.0, buying_power="High", needs=["Daily Fresh Cream", "Paneer Blocks"])
            ]
            competitors = [
                CompetitorInfo(type="Unorganized Local Milk Vendors", threat_level="Moderate", market_share_est="55%", differentiator_opportunity="Hygienic vacuum packaging & quality certification"),
                CompetitorInfo(type="Major Regional Dairy Brand", threat_level="High", market_share_est="35%", differentiator_opportunity="Hyper-local direct delivery & fresher turnaround time")
            ]
            pricing = [
                PricingBenchmark(item_category="Fresh Paneer", local_avg_price=360.0, unit="kg", margin_pct=28.5),
                PricingBenchmark(item_category="Pure Desi Ghee", local_avg_price=650.0, unit="kg", margin_pct=34.0),
                PricingBenchmark(item_category="Curd (Dahi)", local_avg_price=65.0, unit="kg", margin_pct=22.0)
            ]
            drivers = ["High festive and religious occasion demand", "Rising preference for verified unadulterated milk products", "ODOP and Dairy cluster state support"]
            challenges = ["Cold chain maintenance during peak summer", "Daily milk collection consistency"]
            raw_material = "High (Plentiful local cattle population in cluster)"
            competition_density = "Moderate"
            trend = "High Demand / Growing"

        elif sector_id == "spices-food-processing":
            demographics = [
                DemographicInsight(segment="Village & Town Kirana Stores", percentage=50.0, buying_power="Moderate", needs=["100g/250g Spices Packets", "Pickles"]),
                DemographicInsight(segment="Local Rural Households", percentage=30.0, buying_power="Moderate", needs=["Pure Turmeric", "Chili Powder"]),
                DemographicInsight(segment="Catering & Event Organizers", percentage=20.0, buying_power="High", needs=["Bulk Spice Blends"])
            ]
            competitors = [
                CompetitorInfo(type="National Commercial Spice Brands", threat_level="Moderate", market_share_est="40%", differentiator_opportunity="Zero-adulteration promise & lower local logistics cost"),
                CompetitorInfo(type="Local Open-Mill Grinders", threat_level="Low", market_share_est="35%", differentiator_opportunity="Sealed sanitary packaging & FSSAI grade certification")
            ]
            pricing = [
                PricingBenchmark(item_category="Turmeric Powder (Haldi)", local_avg_price=220.0, unit="kg", margin_pct=32.0),
                PricingBenchmark(item_category="Red Chili Powder", local_avg_price=310.0, unit="kg", margin_pct=30.0),
                PricingBenchmark(item_category="Garam Masala Blend", local_avg_price=480.0, unit="kg", margin_pct=42.0)
            ]
            drivers = ["Strong preference for fresh local spices", "ODOP scheme promotional backing", "High margin in blended spices"]
            challenges = ["Moisture control during monsoon", "Price volatility of raw turmeric/chili seeds"]
            raw_material = "High (Direct agricultural supply access)"
            competition_density = "Moderate"
            trend = "High Demand / Growing"

        else:
            demographics = [
                DemographicInsight(segment="Local Commercial & Retail Counters", percentage=50.0, buying_power="Moderate", needs=["Packaged Micro Products", "Custom Orders"]),
                DemographicInsight(segment="Community Households", percentage=35.0, buying_power="Moderate", needs=["Daily Essentials", "Local Artisanal Goods"]),
                DemographicInsight(segment="Institutional Bulk Buyers", percentage=15.0, buying_power="High", needs=["Institutional Supply", "Direct Supply Contracts"])
            ]
            competitors = [
                CompetitorInfo(type="Regional Wholesale Distributors", threat_level="Moderate", market_share_est="50%", differentiator_opportunity="Hyper-local servicing & credit flexibility"),
                CompetitorInfo(type="Local Informal Craftsmen / Producers", threat_level="Low", market_share_est="30%", differentiator_opportunity="Consistent finish & formal branding")
            ]
            pricing = [
                PricingBenchmark(item_category="Primary Value-Added Unit", local_avg_price=280.0, unit="unit", margin_pct=30.0),
                PricingBenchmark(item_category="Secondary Complementary Good", local_avg_price=160.0, unit="unit", margin_pct=25.0)
            ]
            drivers = ["Local sourcing demand", "Subsidized capital financing access", "Import substitution in rural blocks"]
            challenges = ["Working capital cycle length", "Marketing and branding reach outside village"]
            raw_material = "Moderate"
            competition_density = "Moderate"
            trend = "Stable / Steady Demand"

        return MarketAnalysisResponse(
            sector_id=sector_id,
            sector_name=sector_name,
            district_name=district_name,
            demand_index=min(95.0, base_demand),
            demand_trend=trend,
            raw_material_availability=raw_material,
            competition_density=competition_density,
            radius_km=request.radius_km or 5,
            target_demographics=demographics,
            competitors=competitors,
            pricing_benchmarks=pricing,
            growth_drivers=drivers,
            challenges=challenges,
            is_fallback=False,
            source="backend",
            disclaimer="Prototype Demo Data — Not Actual Live Mandi Statistics"
        )
