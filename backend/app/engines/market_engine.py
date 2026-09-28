from app.models.schemas import MarketAnalysisRequest, MarketAnalysisResponse, DemographicInsight, CompetitorInfo, PricingBenchmark
from app.services.data_service import DataService

class MarketIntelligenceEngine:
    """
    Hyper-Local Market Intelligence Engine.
    Analyzes local demand, target demographics, pricing benchmarks, and competition density.
    """

    @staticmethod
    def analyze_market(request: MarketAnalysisRequest) -> MarketAnalysisResponse:
        sector = DataService.get_sector_by_id(request.sector_id)
        district = DataService.get_district_by_id(request.district_id)

        sector_name = sector.name if sector else request.sector_id.title()
        district_name = f"{district.name}, {district.state}" if district else request.district_id.title()

        # Dynamic calculations based on investment amount and sector
        base_demand = 82.0
        if request.investment_amount > 500000:
            base_demand += 5.0

        # Sector-specific customization
        if request.sector_id == "dairy-processing":
            demographics = [
                DemographicInsight(segment="Local Sweet Shops & Bakeries", percentage=45.0, buying_power="High", needs=["Bulk Paneer", "Fresh Ghee", "Butter"]),
                DemographicInsight(segment="Rural & Semi-Urban Households", percentage=35.0, buying_power="Moderate", needs=["Standardized Milk", "Curd Packets"]),
                DemographicInsight(segment="Highway Dhabas & Restaurants", percentage=20.0, buying_power="High", needs=["Daily Fresh Cream", "Paneer Blocks"])
            ]
            competitors = [
                CompetitorInfo(type="Unorganized Local Vendors", threat_level="Moderate", market_share_est="60%", differentiator_opportunity="Hygienic vacuum packaging & quality certification"),
                CompetitorInfo(type="Major Regional Dairy Brand", threat_level="High", market_share_est="30%", differentiator_opportunity="Hyper-local delivery & fresher turnaround time")
            ]
            pricing = [
                PricingBenchmark(item_category="Fresh Paneer", local_avg_price=360.0, unit="kg", margin_pct=28.5),
                PricingBenchmark(item_category="Pure Desi Ghee", local_avg_price=650.0, unit="kg", margin_pct=34.0),
                PricingBenchmark(item_category="Curd (Dahi)", local_avg_price=65.0, unit="kg", margin_pct=22.0)
            ]
            drivers = ["High demand for festival sweets", "Increasing health awareness", "Government push for dairy clusters"]
            challenges = ["Cold chain maintenance during summer", "Daily milk collection consistency"]
            raw_material = "High (Plentiful local cattle population)"
            competition_density = "Moderate"
            trend = "High Demand / Growing"

        elif request.sector_id == "spices-food-processing":
            demographics = [
                DemographicInsight(segment="Village & Town Grocery Stores (Kirana)", percentage=50.0, buying_power="Moderate", needs=["100g/250g Spices Packets", "Pickles"]),
                DemographicInsight(segment="Local Households", percentage=30.0, buying_power="Moderate", needs=["Pure Turmeric", "Chili Powder"]),
                DemographicInsight(segment="Catering & Wedding Organizers", percentage=20.0, buying_power="High", needs=["Bulk Spice Blends"])
            ]
            competitors = [
                CompetitorInfo(type="National Spice Brands", threat_level="Moderate", market_share_est="40%", differentiator_opportunity="Zero-adulteration promise & lower local logistics cost"),
                CompetitorInfo(type="Local Open-Mill Sellers", threat_level="Low", market_share_est="35%", differentiator_opportunity="Sealed sanitary packaging & FSSAI grade certification")
            ]
            pricing = [
                PricingBenchmark(item_category="Turmeric Powder (Haldi)", local_avg_price=220.0, unit="kg", margin_pct=32.0),
                PricingBenchmark(item_category="Red Chili Powder", local_avg_price=310.0, unit="kg", margin_pct=30.0),
                PricingBenchmark(item_category="Garam Masala Blend", local_avg_price=480.0, unit="kg", margin_pct=42.0)
            ]
            drivers = ["Strong preference for fresh local spices", "ODOP scheme promotional backing", "High margin in blended spices"]
            challenges = ["Moisture control in monsoon", "Fluctuation in raw spice mandi prices"]
            raw_material = "Moderate to High"
            competition_density = "Moderate"
            trend = "Growing"

        else:
            demographics = [
                DemographicInsight(segment="Local Agriculture Farmers", percentage=55.0, buying_power="Moderate", needs=["Eco-friendly inputs & services"]),
                DemographicInsight(segment="Rural Enterprise Outlets", percentage=45.0, buying_power="High", needs=["Reliable local supply"])
            ]
            competitors = [
                CompetitorInfo(type="Traditional Suppliers", threat_level="Moderate", market_share_est="50%", differentiator_opportunity="Quality assurance and doorstep delivery")
            ]
            pricing = [
                PricingBenchmark(item_category="Standard Unit Product", local_avg_price=150.0, unit="unit", margin_pct=25.0)
            ]
            drivers = ["State government incentive programs", "Shift towards sustainable solutions"]
            challenges = ["Customer awareness building", "Initial distribution setup"]
            raw_material = "Abundant Local Availability"
            competition_density = "Low to Moderate"
            trend = "High Growth Potential"

        return MarketAnalysisResponse(
            sector_id=request.sector_id,
            sector_name=sector_name,
            district_name=district_name,
            demand_index=min(95.0, base_demand),
            demand_trend=trend,
            raw_material_availability=raw_material,
            competition_density=competition_density,
            target_demographics=demographics,
            competitors=competitors,
            pricing_benchmarks=pricing,
            growth_drivers=drivers,
            challenges=challenges
        )
