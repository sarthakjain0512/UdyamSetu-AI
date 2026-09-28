/**
 * UdyamSetu AI — Fallback Market Intelligence Dataset
 * Deterministic, sector-specific market intelligence for rural micro-enterprises.
 *
 * NOTE: PROTOTYPE / DEMO DATA
 * All metrics, SWOT items, and qualitative scores are representative models
 * designed to simulate production data feeds without fabricating live statistics.
 */

export const FALLBACK_MARKET_INTELLIGENCE = {
  "dairy-processing": {
    snapshot: {
      customerSegment: "Local Sweet Shops, Tea Stalls & Village Households",
      demandLevel: "High",
      competitionIntensity: "Moderate",
      opportunityLevel: "Favorable (High Liquidity)",
      opportunitySignal: "High Daily Cashflow & Value-Add Potential"
    },
    demand: {
      demandLevel: "High",
      customerNeedSignal: "Daily dietary staple with steady consumption across all socio-economic strata.",
      repeatPurchasePotential: "High (Daily to alternate-day purchase frequency)",
      localAccessibility: "High (Direct doorstep delivery, local kirana stores & weekly rural haats)",
      seasonalSensitivity: "Moderate (30-40% surge during festival/wedding months, steady baseline year-round)",
      indicativeRadius5km: "Covers 6-10 contiguous villages and local market hub with direct milk collection.",
      indicativeRadius10km: "Expands coverage to peri-urban commercial sweet shops, bulk caterers, and cold chain points."
    },
    productValue: {
      scoringMethodology: "Qualitative evaluation of rural consumer price sensitivity, purchase frequency, and value-add margin.",
      dimensions: [
        { name: "Customer Relevance", rating: "High", description: "Essential daily food commodity; non-discretionary rural household expenditure." },
        { name: "Local Affordability", rating: "High", description: "Direct processing eliminates middlemen commissions, allowing competitive village pricing." },
        { name: "Repeat Purchase Potential", rating: "High", description: "Daily consumption cycle ensures rapid working capital turnover." },
        { name: "Value-Add Margin Scope", rating: "High", description: "Converting raw milk (₹35-42/L) to Paneer/Ghee yields 25-35% gross operating margins." },
        { name: "Differentiation Scope", rating: "Moderate", description: "Achieved via hygienic vacuum packaging, certified purity, and guaranteed freshness." },
        { name: "Supply Linkage Feasibility", rating: "High", description: "Direct aggregation from local smallholder dairy farmers within a 5-10 km radius." }
      ]
    },
    opportunityFactors: [
      { title: "Raw Material Aggregation", status: "Favorable", description: "Plentiful local cattle population allows direct morning/evening milk collection." },
      { title: "Import Substitution", status: "Strong", description: "Displaces adulterated or long-distance packaged dairy transported from distant cities." },
      { title: "B2B Bulk Offtake", status: "Active", description: "Local halwais, sweet makers, and roadside eateries require reliable fresh paneer/khoya daily." },
      { title: "Government Subsidy Alignment", status: "High", description: "Qualifies for PMFME (35% capital subsidy) and Mudra Shishu/Kishor working capital loans." }
    ],
    swot: {
      strengths: [
        "Hyper-local freshness with same-day processing and distribution",
        "Direct farmer aggregation eliminates 2-3 tiers of middlemen commissions",
        "Low packaging overheads for loose and pouch formats in rural markets",
        "Rapid daily cash generation supporting steady working capital"
      ],
      weaknesses: [
        "Highly perishable raw inventory requiring strict cold storage discipline",
        "Initial capital expenditure for cream separator, deep freezer, and packaging tools",
        "High reliance on uninterrupted electricity or backup solar power",
        "Unbranded early phase requires personal trust-building with local shopkeepers"
      ],
      opportunities: [
        "Expansion into high-margin value products: Desi Ghee, flavored milk, and probiotic curd",
        "Formal tie-ups with women SHG (Self-Help Group) federations for distribution",
        "Access to PMFME 35% credit-linked capital subsidy for micro food processing",
        "Supplying village wedding seasons and religious festival congregations"
      ],
      threats: [
        "Summer spoilage risk during extended grid power outages",
        "Seasonal milk yield drop during dry summer months (April to June)",
        "Price wars by unorganized milkmen adding water/synthetic stabilizers",
        "Fluctuations in fodder prices affecting farmer raw milk pricing"
      ]
    },
    threats: [
      {
        name: "Perishability & Cold Chain Disruption",
        level: "High",
        description: "Raw milk turns sour rapidly without cooling below 4°C within 3 hours of milking.",
        mitigation: "Install solar-powered mini bulk milk chiller or thermal insulated storage tanks."
      },
      {
        name: "Unorganized Competitor Price Under-Cutting",
        level: "Moderate",
        description: "Local unorganized vendors sell untreated milk at discounted rates.",
        mitigation: "Emphasize lactometer-tested purity, hygienic packaging, and FSSAI certification badge."
      },
      {
        name: "Seasonal Supply Fluctuation",
        level: "Moderate",
        description: "Milk yield declines by 20-30% during hot summer months.",
        mitigation: "Diversify supplier base across multiple village hamlets and offer prompt weekly digital payouts."
      },
      {
        name: "Delayed Receivables from B2B Buyers",
        level: "Low to Moderate",
        description: "Sweet shops may demand 15-day credit cycles for paneer supply.",
        mitigation: "Enforce 50% advance for festive orders and cap weekly credit to 2-3 days max."
      }
    ],
    summary: {
      signal: "Strong Favorable Opportunity",
      demandDriver: "High non-discretionary rural demand for pure, unadulterated milk products.",
      competitiveConcern: "Price undercutting by local loose-milk hawkers without quality standards.",
      differentiationSuggestion: "Differentiate on hygienic batch testing, transparent fat/SNF measurement, and tamper-evident sealed pouches.",
      recommendedNextStep: "Proceed to Stage 2: Feasibility Engine to evaluate electrical connection requirements, site water quality, and 3-month break-even period."
    }
  },

  "spices-food-processing": {
    snapshot: {
      customerSegment: "Kirana Stores, Rural Households & Local Catering Services",
      demandLevel: "High",
      competitionIntensity: "Moderate",
      opportunityLevel: "Favorable (High Shelf Life)",
      opportunitySignal: "Low Perishability & Strong Regional Taste Alignment"
    },
    demand: {
      demandLevel: "High",
      customerNeedSignal: "Essential household culinary necessity with long non-perishable shelf-life.",
      repeatPurchasePotential: "Moderate to High (Monthly household replenishment cycle)",
      localAccessibility: "High (Sold through village grocery networks, rural weekly markets, and home delivery)",
      seasonalSensitivity: "Low (Steady year-round consumption; harvest season buying provides raw material price advantages)",
      indicativeRadius5km: "Direct retail reach to 15-25 neighborhood grocery stores and small food kiosks.",
      indicativeRadius10km: "Coverage extends to wholesale mandi distributors and institutional wedding catering contractors."
    },
    productValue: {
      scoringMethodology: "Assesses value margin over raw commodities, storage stability, and local brand loyalty.",
      dimensions: [
        { name: "Customer Relevance", rating: "High", description: "Daily cooking essential used 2-3 times daily in Indian rural kitchens." },
        { name: "Local Affordability", rating: "High", description: "100g, 200g, and 500g pouch options match daily-wage rural spending power." },
        { name: "Repeat Purchase Potential", rating: "High", description: "Regular monthly replenishment ensures predictable inventory turnover." },
        { name: "Value-Add Margin Scope", rating: "High", description: "Raw whole spices transformed to graded, blended powder generate 30-45% margins." },
        { name: "Differentiation Scope", rating: "High", description: "Adulteration-free stone-ground aroma and authentic regional recipe blends." },
        { name: "Supply Linkage Feasibility", rating: "High", description: "Direct procurement from regional agricultural mandis at wholesale rates." }
      ]
    },
    opportunityFactors: [
      { title: "Long Shelf Life", status: "Strong", description: "Dry ground spices have 6-12 months shelf stability, eliminating immediate spoilage risks." },
      { title: "One District One Product (ODOP)", status: "Active", description: "Many rural districts offer dedicated capital subsidies for spice processing units." },
      { title: "Small Batch Customization", status: "Favorable", description: "Formulating local custom masalas for regional cuisine outperforms generic national brands." },
      { title: "Low Working Capital Drag", status: "Strong", description: "Inventory does not require refrigerated storage or expensive transport." }
    ],
    swot: {
      strengths: [
        "Low moisture processing results in long shelf-life with minimal storage loss",
        "Flexible batch production for turmeric, coriander, chili, and customized spice mixes",
        "Strong consumer skepticism toward adulterated open spices creates ready market for sealed packs",
        "Modest machine setup cost allowing high return on invested capital"
      ],
      weaknesses: [
        "Intense brand loyalty among rural homemakers requiring aggressive initial sampling",
        "Vulnerability to raw spice commodity price spikes during lean harvest months",
        "Airborne dust and odor management requires dedicated partitioned workspace",
        "Initial working capital needed to purchase bulk harvest stock when prices are lowest"
      ],
      opportunities: [
        "Supplying 5kg/10kg bulk packs to local roadside dhabas and wedding caterers",
        "Introduction of local specialty pickles, chutneys, and roasted spice masalas",
        "Listing with local Gram Panchayat and SHG retail kiosks",
        "Leveraging PMEGP / PMFME credit subsidies with 25-35% capital back-ended benefit"
      ],
      threats: [
        "Heavy advertising and retail margin dumping by large national corporate brands",
        "Moisture and pest infestation during monsoons if packaging seal is compromised",
        "Regulatory inspection fines if FSSAI food hygiene parameters are neglected",
        "Raw spice price inflation eroding consumer-facing profit margins"
      ]
    },
    threats: [
      {
        name: "National Brand Retail Dominance",
        level: "Moderate",
        description: "Large conglomerates offer attractive credit margins to small kirana shopkeepers.",
        mitigation: "Compete on freshness, higher retail margin (20% vs corporate 10%), and cash-on-delivery returns."
      },
      {
        name: "Monsoon Moisture & Clumping",
        level: "Moderate",
        description: "High humidity causes spice caking and fungal growth if pouches are porous.",
        mitigation: "Use 3-ply aluminum foil pouches or food-grade multi-layer LDPE packaging with heat sealer."
      },
      {
        name: "Raw Material Price Volatility",
        level: "Moderate",
        description: "Chili and turmeric mandi rates fluctuate widely based on annual crop yields.",
        mitigation: "Procure raw stock during peak harvesting months (February to April) when mandi prices bottom out."
      },
      {
        name: "FSSAI & Weights/Measures Compliance",
        level: "Low",
        description: "Failure to print batch number, MRP, and FSSAI license creates regulatory penalties.",
        mitigation: "Register basic FSSAI certification and obtain standardized pre-printed packaging pouches."
      }
    ],
    summary: {
      signal: "Strong Favorable Opportunity",
      demandDriver: "Consumer distrust of unhygienic open-market spices driving demand for sealed local brands.",
      competitiveConcern: "Brand stickiness of legacy corporate spices in suburban grocery outlets.",
      differentiationSuggestion: "Promote 100% pure stone-ground aroma, regional taste profile, and unadulterated purity guarantee.",
      recommendedNextStep: "Proceed to Stage 2: Feasibility Engine to evaluate grinder horsepower, power phase requirements, and FSSAI licensing steps."
    }
  },

  "organic-bio-inputs": {
    snapshot: {
      customerSegment: "Smallholder Farmers, Horticulture Growers & Nursery Owners",
      demandLevel: "Moderate to High",
      competitionIntensity: "Low",
      opportunityLevel: "High Growth Potential",
      opportunitySignal: "Low Input Costs & Government Organic Farming Push"
    },
    demand: {
      demandLevel: "Moderate to High",
      customerNeedSignal: "Rising input costs of chemical fertilizers driving farmers toward affordable organic alternatives.",
      repeatPurchasePotential: "Moderate (Seasonal crop sowing windows twice a year)",
      localAccessibility: "High (Direct farm-gate sales and delivery via local tractor trolleys)",
      seasonalSensitivity: "High (Demand peaks during Kharif and Rabi pre-sowing soil preparation cycles)",
      indicativeRadius5km: "Direct supply to 40-70 farming households and vegetable growers in immediate village cluster.",
      indicativeRadius10km: "Broad reach across block-level farmer producer organizations (FPOs) and horticultural nurseries."
    },
    productValue: {
      scoringMethodology: "Assesses cost savings for farmers, soil regeneration impact, and organic certification potential.",
      dimensions: [
        { name: "Customer Relevance", rating: "High", description: "Essential soil nourishment for chemical fertilizer reduction and moisture retention." },
        { name: "Local Affordability", rating: "High", description: "Produced from local cattle dung and agri-waste at a fraction of chemical DAP/urea costs." },
        { name: "Repeat Purchase Potential", rating: "Moderate", description: "Bulk seasonal purchases aligned with Kharif (June) and Rabi (October) sowing cycles." },
        { name: "Value-Add Margin Scope", rating: "High", description: "Raw bio-waste converted into vermicompost commands 40-55% profit margin." },
        { name: "Differentiation Scope", rating: "High", description: "Enriched with beneficial microbes (Trichoderma, Azotobacter) and nutrient-rich worm castings." },
        { name: "Supply Linkage Feasibility", rating: "High", description: "Cattle dung, dry crop residue, and green waste are readily available in rural villages." }
      ]
    },
    opportunityFactors: [
      { title: "Low Raw Material Cost", status: "Strong", description: "Abundant farmyard manure and biomass can be sourced locally for minimal cost." },
      { title: "Paramparagat Krishi Vikas (PKVY)", status: "Active", description: "Central and state schemes offer farmer subsidies for utilizing organic compost." },
      { title: "High Margin on Packaged Manure", status: "Favorable", description: "Retailing 5kg/10kg bags to urban home gardeners generates premium unit pricing." },
      { title: "Zero Hazardous Emissions", status: "Strong", description: "Eco-friendly natural conversion process requiring zero industrial chemicals." }
    ],
    swot: {
      strengths: [
        "Negligible raw material cost utilizing local cattle dung and crop residues",
        "Simple biological process with low recurring energy or machinery maintenance",
        "Immediate visible improvements in soil water retention and crop root strength",
        "Dual market: bulk agricultural supply plus retail bagged compost for town nurseries"
      ],
      weaknesses: [
        "45-60 day biological incubation period required before vermicompost is ready for harvest",
        "Bulk product requires shaded land area and water source to maintain optimal bedding moisture",
        "Seasonal cash flow peaks concentrated around pre-sowing planting periods",
        "Labor-intensive manual sieving, bagging, and transportation"
      ],
      opportunities: [
        "Tie-ups with local Farmer Producer Organizations (FPOs) for guaranteed bulk contracts",
        "Production of liquid vermiwash as an organic foliar spray against common crop pests",
        "Supplying district horticulture departments and government afforestation nurseries",
        "Availing Stand-Up India or PMEGP credit-linked financial subsidies"
      ],
      threats: [
        "Extreme heatwaves (temperatures exceeding 44°C) causing worm mortality without shade",
        "Subsidized chemical fertilizers temporarily dampening farmer willingness to transition",
        "Worm bed infestation by red ants, toads, or birds if netting protection is absent",
        "Transportation logistics cost for low-density bulk manure over long distances"
      ]
    },
    threats: [
      {
        name: "Worm Mortality during Extreme Heat",
        level: "High",
        description: "Earthworms (Eisenia fetida) perish if bed temperatures rise above 38°C in summer.",
        mitigation: "Erect 75% agro-shade net canopy, install micro-sprinklers, and apply daily straw mulching."
      },
      {
        name: "Chemical Fertilizer Mindset",
        level: "Moderate",
        description: "Traditional farmers often seek immediate chemical growth surges rather than long-term soil health.",
        mitigation: "Conduct side-by-side demo plots on influential village farms to showcase yield improvements."
      },
      {
        name: "Ant & Pest Infestation in Compost Beds",
        level: "Low to Moderate",
        description: "Red ants and predators attack earthworm eggs and mature breeding stock.",
        mitigation: "Surround vermicompost beds with water-filled barrier trenches and apply neem oil borders."
      },
      {
        name: "Seasonal Demand Lag",
        level: "Moderate",
        description: "Sales drop significantly during standing crop maturation months.",
        mitigation: "Stockpile dried, sieved compost in bags during off-season to immediately meet pre-sowing demand."
      }
    ],
    summary: {
      signal: "High Growth Potential",
      demandDriver: "Rising soil degradation and high chemical fertilizer prices urging farmers to embrace organic manure.",
      competitiveConcern: "Availability of cheap, unfermented raw farmyard manure in villages.",
      differentiationSuggestion: "Promote certified Eisenia fetida vermicompost with high NPK content, moisture testing, and weed-seed-free guarantee.",
      recommendedNextStep: "Proceed to Stage 2: Feasibility Engine to evaluate shaded plot dimensions, water source availability, and pit construction costs."
    }
  },

  "solar-pump-services": {
    snapshot: {
      customerSegment: "Agricultural Farmers, Farmhouses & Rural Irrigation Cooperatives",
      demandLevel: "High",
      competitionIntensity: "Low to Moderate",
      opportunityLevel: "Favorable (High Tech Adoption)",
      opportunitySignal: "PM-KUSUM Scheme Momentum & High Diesel Cost Replacement"
    },
    demand: {
      demandLevel: "High",
      customerNeedSignal: "Rising diesel pump operating costs and erratic rural grid electricity driving solar irrigation adoption.",
      repeatPurchasePotential: "Moderate (Annual servicing, replacement parts, and expanding pump capacity)",
      localAccessibility: "High (Mobile technician van providing doorstep repair within 2-4 hours)",
      seasonalSensitivity: "High (Irrigation demand surges during dry pre-monsoon and post-monsoon crop cycles)",
      indicativeRadius5km: "Direct servicing for 30-50 agricultural solar installations in immediate gram panchayats.",
      indicativeRadius10km: "Block-level coverage for commercial orchards, poultry sheds, and deep borewell operators."
    },
    productValue: {
      scoringMethodology: "Assesses electricity cost savings, diesel substitution payback, and uptime value for crops.",
      dimensions: [
        { name: "Customer Relevance", rating: "High", description: "Critical crop survival utility; uninterrupted irrigation prevents drought yield collapse." },
        { name: "Local Affordability", rating: "Moderate", description: "Initial setup assisted by 60% PM-KUSUM subsidy; maintenance services priced affordably." },
        { name: "Repeat Purchase Potential", rating: "Moderate", description: "Annual maintenance contracts (AMC), cleaning tools, and pump overhaul services." },
        { name: "Value-Add Margin Scope", rating: "High", description: "Service labor, inverter troubleshooting, and component replacement yield 35-50% margins." },
        { name: "Differentiation Scope", rating: "High", description: "Rapid local breakdown repair turnaround vs distant city technicians taking 4-7 days." },
        { name: "Supply Linkage Feasibility", rating: "Moderate", description: "Direct partnership with authorized solar inverter and submersible pump manufacturers." }
      ]
    },
    opportunityFactors: [
      { title: "PM-KUSUM Scheme Alignment", status: "Strong", description: "Massive government rollout providing up to 60% capital subsidy for solar agricultural pumps." },
      { title: "Diesel Cost Replacement", status: "Strong", description: "Saves farmers ₹25,000-₹45,000 annually per acre on diesel fuel expenses." },
      { title: "Service Monopoly in Rural Pockets", status: "Active", description: "Severe lack of skilled technicians in remote villages creates captive customer demand." },
      { title: "Future Expansion to Home Solar", status: "Favorable", description: "Existing customer relationships enable upselling rooftop solar systems and battery backup." }
    ],
    swot: {
      strengths: [
        "Zero fuel cost for the farmer after initial setup delivers instant economic relief",
        "Doorstep mobile technical support solves the biggest rural solar bottleneck",
        "High barrier to entry due to technical skill requirements shields against unskilled hawkers",
        "Reliable recurring revenue through Annual Maintenance Contracts (AMC)"
      ],
      weaknesses: [
        "Higher technical skill requirement and training curve compared to conventional trade",
        "Spare parts inventory (inverters, solar DC cables, controllers) requires working capital",
        "Farmers expect credit payment terms until harvest proceeds are realized",
        "Need for reliable field transportation (motorcycle / e-rickshaw equipped with tools)"
      ],
      opportunities: [
        "Becoming authorized service franchise for leading solar pump OEMs (Shakti, Tata Power, Waaree)",
        "Installing automated GSM/IoT water-level controllers for remote mobile-based pump switching",
        "Expanding to solar flour mills (atta chakki) and solar oil expellers in village centers",
        "Benefiting from Stand-Up India or PMEGP tech enterprise credit subsidies"
      ],
      threats: [
        "Slow government subsidy clearance under PM-KUSUM delaying customer purchase decisions",
        "Lightning strikes and power surge damages if earthing protection is improperly installed",
        "Solar panel theft or vandalism in remote unguarded agricultural fields",
        "Unskilled local electricians attempting improper wire splicing and causing short circuits"
      ]
    },
    threats: [
      {
        name: "Component Failure from Inadequate Earthing",
        level: "High",
        description: "Rural power surges and lightning damage sensitive DC inverter drives.",
        mitigation: "Include dual copper lightning arresters and chemical earthing pits as standard in every install."
      },
      {
        name: "Subsidy Disbursal Delays",
        level: "Moderate",
        description: "State nodal agency paper clearances can stall customer project starts by 2-3 months.",
        mitigation: "Focus on commercial farmers and private micro-irrigation setups while state subsidies process."
      },
      {
        name: "Field Theft of Solar PV Modules",
        level: "Moderate",
        description: "Isolated panels in open agricultural fields are vulnerable to nighttime theft.",
        mitigation: "Install anti-theft one-way security bolts and advise farmers on perimeter wire alarms."
      },
      {
        name: "Customer Payment Delay Until Harvest",
        level: "Moderate",
        description: "Farmers frequently tie maintenance bill settlements to their biannual crop sales.",
        mitigation: "Offer structured seasonal AMC plans with 40% upfront deposit and post-dated cheques."
      }
    ],
    summary: {
      signal: "High Tech Growth Opportunity",
      demandDriver: "High diesel pump running costs and government focus on rural solar water pumps (PM-KUSUM).",
      competitiveConcern: "Lack of immediate spare parts availability leading to farmer dissatisfaction.",
      differentiationSuggestion: "Guarantee a 4-hour on-site response time, carry essential replacement DC fuses/inverters in mobile kit, and provide solar panel cleaning services.",
      recommendedNextStep: "Proceed to Stage 2: Feasibility Engine to evaluate technician certification needs, tool kit investment, and initial spare parts inventory budget."
    }
  },

  "handloom-jute-crafts": {
    snapshot: {
      customerSegment: "Local Retailers, Tourism Kiosks, Urban Exhibitions & Eco-conscious Shoppers",
      demandLevel: "Moderate",
      competitionIntensity: "Low",
      opportunityLevel: "Favorable (High Artisan Value)",
      opportunitySignal: "Plastic Ban Enforcement & Surge in Eco-Friendly Lifestyle Goods"
    },
    demand: {
      demandLevel: "Moderate",
      customerNeedSignal: "Rising enforcement of single-use plastic bans driving strong demand for reusable jute and cotton carry bags.",
      repeatPurchasePotential: "Moderate (Seasonal festive shopping, corporate gifting, and school events)",
      localAccessibility: "Moderate to High (Sold via village craft clusters, weekly bazaars, and regional exhibition fairs)",
      seasonalSensitivity: "High (Surge during Diwali, wedding seasons, school reopening, and pilgrimage fairs)",
      indicativeRadius5km: "Local artisan cluster coordination and supply to village grocery and textile outlets.",
      indicativeRadius10km: "Direct retail presence in sub-district tourist centers, temple towns, and weekly commercial mandis."
    },
    productValue: {
      scoringMethodology: "Assesses eco-compliance value, aesthetic appeal, artisan margin, and plastic-replacement durability.",
      dimensions: [
        { name: "Customer Relevance", rating: "Moderate", description: "Strong daily utility for grocery shopping plus aesthetic appeal for festive gifts." },
        { name: "Local Affordability", rating: "High", description: "Entry-level plain jute tote bags (₹25-50) directly compete with non-woven bags." },
        { name: "Repeat Purchase Potential", rating: "Moderate", description: "Bags have 1-2 year lifespan; institutional orders repeat annually." },
        { name: "Value-Add Margin Scope", rating: "High", description: "Screen printing, embroidery, and stylish handles increase gross margins to 35-45%." },
        { name: "Differentiation Scope", rating: "High", description: "Traditional folk motifs (e.g. Madhubani, Warli, Kantha) command premium city pricing." },
        { name: "Supply Linkage Feasibility", rating: "High", description: "Raw jute rolls, woven cotton fabric, and sewing threads are readily obtainable." }
      ]
    },
    opportunityFactors: [
      { title: "Single-Use Plastic Ban", status: "Strong", description: "Strict municipal bans on plastic carry bags force retailers to adopt eco-jute alternatives." },
      { title: "Women SHG Empowerment", status: "Active", description: "Ideal enterprise for women self-help groups with flexible work-from-home stitching models." },
      { title: "High Export & Urban Demand", status: "Favorable", description: "City boutique stores, exhibitions, and corporate gift suppliers pay premium rates." },
      { title: "PM Vishwakarma / PMEGP Support", status: "Strong", description: "Offers collateral-free credit and toolkit incentives for traditional artisans and tailors." }
    ],
    swot: {
      strengths: [
        "100% biodegradable, sustainable, and eco-friendly product proposition",
        "Flexible, home-based production leveraging skilled local women stitchers",
        "Minimal machinery requirements: heavy-duty sewing machines and manual screen printing",
        "Rich regional aesthetic appeal that cannot be replicated by synthetic industrial bags"
      ],
      weaknesses: [
        "Lower initial production speed compared to fully automated plastic bag factories",
        "Consumer reluctance to pay premium prices in deep rural grocery markets",
        "Quality consistency depends on individual artisan sewing discipline",
        "Working capital tied up in holding colored jute rolls and finished stocks"
      ],
      opportunities: [
        "Supplying customized branded conference bags to local colleges, banks, and government offices",
        "Tie-up with temple trusts and pilgrimage centers for prasadam carry bags",
        "Selling premium embroidered tote bags and file folders on government e-Marketplace (GeM)",
        "Availing PM Vishwakarma and PMEGP special 35% women entrepreneur subsidies"
      ],
      threats: [
        "Inflow of cheap non-woven polypropylene plastic bags masquerading as eco-fabric",
        "Fluctuations in raw jute yarn and Hessian fabric prices at source mills",
        "Seasonal drop in craft sales during heavy agricultural harvest periods when artisans farm",
        "Delayed settlement of corporate and government bulk supply invoices"
      ]
    },
    threats: [
      {
        name: "Cheap Synthetic Non-Woven Bag Competition",
        level: "High",
        description: "Retailers often buy illegal ultra-cheap plastic-blend bags at ₹4-8 per piece.",
        mitigation: "Focus on superior weight capacity (holding 10-15 kg), water-resistant lining, and washable durability."
      },
      {
        name: "Artisan Absenteeism during Harvest",
        level: "Moderate",
        description: "Village women workers prioritize agricultural harvesting for 3-4 weeks twice a year.",
        mitigation: "Build finished goods buffer inventory in advance and offer performance-linked stitching incentives."
      },
      {
        name: "Raw Material Price Spikes",
        level: "Moderate",
        description: "Raw jute fabric costs fluctuate based on West Bengal / Bihar mill output.",
        mitigation: "Establish direct relationships with wholesale fabric dealers in regional textile hubs."
      },
      {
        name: "Design Stagnation",
        level: "Low to Moderate",
        description: "Producing plain unappealing bags leads to rapid margin erosion.",
        mitigation: "Introduce contemporary color-blocking, wooden button fasteners, and modern screen-printed slogans."
      }
    ],
    summary: {
      signal: "Favorable Niche Opportunity",
      demandDriver: "Stricter enforcement of single-use plastic bans and growing demand for eco-lifestyle goods.",
      competitiveConcern: "Price pressure from cheap synthetic non-woven imitation bags in local shops.",
      differentiationSuggestion: "Focus on high-load carrying strength, attractive screen-printed local motifs, and institutional bulk supply contracts (schools, banks, temples).",
      recommendedNextStep: "Proceed to Stage 2: Feasibility Engine to evaluate sewing machine power requirements, artisan training schedules, and initial fabric roll procurement."
    }
  },

  "micro-cold-chilling": {
    snapshot: {
      customerSegment: "Perishable Vegetable/Fruit Farmers, Dairy Unions & Flower Growers",
      demandLevel: "High",
      competitionIntensity: "Low",
      opportunityLevel: "High Infrastructure Impact",
      opportunitySignal: "Eliminating Distress Harvest Sales & Extending Shelf Life"
    },
    demand: {
      demandLevel: "High",
      customerNeedSignal: "Severe post-harvest losses (25-35% in tomatoes, greens, fruits) forcing farmers into distress sales.",
      repeatPurchasePotential: "High (Recurring rental payments during harvest cycles across multiple crops)",
      localAccessibility: "High (Strategically situated within 2 km of village vegetable aggregation mandis)",
      seasonalSensitivity: "Moderate to High (Rotates across vegetables, dairy, and seasonal fruits year-round)",
      indicativeRadius5km: "Covers 100-150 vegetable and fruit cultivating smallholders in direct farm cluster.",
      indicativeRadius10km: "Serves as central farm-gate pre-cooling hub for surrounding gram panchayats before city transport."
    },
    productValue: {
      scoringMethodology: "Assesses prevented spoilage value, farm-gate price realization improvement, and energy efficiency.",
      dimensions: [
        { name: "Customer Relevance", rating: "High", description: "Prevents immediate crop rotting; allows farmers to wait 5-10 days for better market prices." },
        { name: "Local Affordability", rating: "High", description: "Per-crate daily storage fee (₹5-10/crate/day) is a fraction of distress sale losses." },
        { name: "Repeat Purchase Potential", rating: "High", description: "Farmers store produce continuously across tomato, chili, cabbage, and seasonal cycles." },
        { name: "Value-Add Margin Scope", rating: "High", description: "Solar power keeps operating costs minimal while rental revenue generates 45-60% margins." },
        { name: "Differentiation Scope", rating: "High", description: "Zero nearby decentralized micro-chilling units; large commercial cold storages ignore small crates." },
        { name: "Supply Linkage Feasibility", rating: "High", description: "Turnkey modular solar cold room kits (5 MT to 10 MT capacity) readily available from certified vendors." }
      ]
    },
    opportunityFactors: [
      { title: "Distress Sale Prevention", status: "Strong", description: "Increases farmer price realization by 20-35% during market gluts." },
      { title: "Solar Thermal Storage", status: "Active", description: "Advanced phase change material (PCM) maintains 4-8°C cooling for up to 30 hours without grid power." },
      { title: "Multi-Commodity Utilization", status: "Favorable", description: "Flexible temperature control allows storing vegetables, fruits, flowers, and milk cans." },
      { title: "Agriculture Infrastructure Fund (AIF)", status: "Strong", description: "Offers 3% interest subvention and credit guarantee for farm-gate cold storage projects." }
    ],
    swot: {
      strengths: [
        "Directly addresses massive 25-35% rural post-harvest economic loss",
        "Solar + Thermal Storage (PCM) slashes recurring electricity and diesel generator expenses",
        "High barrier to entry creates a natural regional monopoly within 5-10 km radius",
        "Multiple revenue streams: crate-based rental, trading arbitrage, and pre-cooling transit fees"
      ],
      weaknesses: [
        "Higher initial capital expenditure (₹12-25 Lakhs for a 5-10 metric ton solar cold room)",
        "Requires secure, road-accessible land parcel near active vegetable farming clusters",
        "Initial farmer hesitation to trust produce inside cold storage before learning crate protocols",
        "Technical maintenance of refrigerant compressors requires trained refrigeration mechanics"
      ],
      opportunities: [
        "Securing 35% capital subsidy under Mission for Integrated Development of Horticulture (MIDH)",
        "Availing Agriculture Infrastructure Fund (AIF) with 3% interest subvention on term loans",
        "Partnership with quick-commerce and urban supermarket aggregators for farm-gate sourcing",
        "Adding value-add washing, grading, and sorting tables in the packhouse ante-room"
      ],
      threats: [
        "Refrigerant gas leakage or compressor burnout during peak harvest season",
        "Prolonged overcast monsoon weather reducing solar generation efficiency",
        "Disputes over pre-existing produce rot if intake quality inspection is not strictly enforced",
        "Delayed loan approval from commercial banks unfamiliar with decentralized solar cold storage"
      ]
    },
    threats: [
      {
        name: "Technical Compressor & Refrigerant Failure",
        level: "High",
        description: "Equipment breakdown during peak harvest leads to complete produce spoilage within 48 hours.",
        mitigation: "Contract 24-hour emergency SLA with turnkey vendor and utilize Phase Change Material (PCM) thermal backup."
      },
      {
        name: "Disputes on Produce Ingress Quality",
        level: "Moderate",
        description: "Farmers may claim storage caused rotting when produce was already diseased at intake.",
        mitigation: "Implement digital weighing scale, visual grading check, and receipt acknowledging crop condition upon intake."
      },
      {
        name: "Seasonal Utilization Dip",
        level: "Moderate",
        description: "Storage occupancy drops during brief transition periods between harvest seasons.",
        mitigation: "Diversify client base to include milk collection cans, poultry eggs, and local horticulture nurseries."
      },
      {
        name: "Power Grid Instability",
        level: "Low to Moderate",
        description: "Rural grid power is frequently erratic with low voltage surges.",
        mitigation: "Operate on dedicated off-grid rooftop solar PV with automatic voltage stabilization."
      }
    ],
    summary: {
      signal: "High Impact Infrastructure Opportunity",
      demandDriver: "Farmers suffering severe post-harvest losses and seeking farm-gate storage to avoid distress market sales.",
      competitiveConcern: "High capital setup cost and lack of localized refrigeration maintenance technicians.",
      differentiationSuggestion: "Offer flexible pay-per-crate daily billing (₹5-8/crate/day), transparent intake inspection receipts, and solar-backed 24/7 cooling reliability.",
      recommendedNextStep: "Proceed to Stage 2: Feasibility Engine to calculate land footprint, solar panel rooftop area, and 3-year debt amortization under AIF subsidy."
    }
  },

  "custom-default": {
    snapshot: {
      customerSegment: "Local Rural Community, Neighborhood Kiranas & Micro Enterprisers",
      demandLevel: "Moderate to High",
      competitionIntensity: "Moderate",
      opportunityLevel: "Favorable (Local Focus)",
      opportunitySignal: "Hyper-Local Convenience & Relationship-Driven Loyalty"
    },
    demand: {
      demandLevel: "Moderate to High",
      customerNeedSignal: "Addressing underserved village consumption needs with direct community access.",
      repeatPurchasePotential: "Moderate to High (Depends on consumable vs durable enterprise focus)",
      localAccessibility: "High (Direct village presence and localized word-of-mouth customer acquisition)",
      seasonalSensitivity: "Moderate (Aligned with regional agricultural liquidity and festival cycles)",
      indicativeRadius5km: "Primary serviceable market encompassing immediate village and adjoining settlements.",
      indicativeRadius10km: "Extended serviceable catchment area including nearby weekly mandis and transit stops."
    },
    productValue: {
      scoringMethodology: "Assesses value proposition strength, price-point affordability, and local convenience.",
      dimensions: [
        { name: "Customer Relevance", rating: "High", description: "Directly solves a tangible product or service gap in the rural locality." },
        { name: "Local Affordability", rating: "High", description: "Tailored to daily and weekly cashflow patterns of local rural residents." },
        { name: "Repeat Purchase Potential", rating: "Moderate", description: "Steady repeat transactions driven by trustworthy personal customer relationships." },
        { name: "Value-Add Margin Scope", rating: "Moderate to High", description: "Gross operating margins estimated between 25% and 35% with controlled overhead." },
        { name: "Differentiation Scope", rating: "Moderate", description: "Customer intimacy, flexible localized credit, and personalized service delivery." },
        { name: "Supply Linkage Feasibility", rating: "Moderate", description: "Sourced through nearby wholesale hubs, agricultural mandis, or local artisans." }
      ]
    },
    opportunityFactors: [
      { title: "Direct Community Trust", status: "Strong", description: "Personal goodwill and local residence foster immediate customer stickiness." },
      { title: "Agile Operating Model", status: "Active", description: "Low fixed overheads allow adapting inventory and services quickly to customer feedback." },
      { title: "Rural Market Expansion", status: "Favorable", description: "Increasing rural disposable income and smartphone-enabled payments driving demand." },
      { title: "Government MSME Schemes", status: "High", description: "Eligible for PMEGP, Mudra, and state rural livelihood enterprise credit subsidies." }
    ],
    swot: {
      strengths: [
        "Deep familiarity with local community language, customs, and buying habits",
        "Minimal administrative overhead and agile decision-making",
        "Flexible operational hours tailored to when farmers and rural workers are free",
        "Low logistics costs for within-village delivery and customer consultations"
      ],
      weaknesses: [
        "Constrained initial working capital limiting bulk raw material purchasing discounts",
        "Dependency on a single founder's continuous physical presence",
        "Lack of formal credit history or collateral when approaching commercial banks",
        "Informal bookkeeping and inventory tracking in the initial startup stage"
      ],
      opportunities: [
        "Unlocking 25-35% government capital subsidies through PMEGP and Mudra loans",
        "Gradually introducing complementary product lines based on direct customer requests",
        "Digitizing transactions with UPI QR codes to build transparent digital turnover records",
        "Forming supply cooperatives with neighboring micro-entrepreneurs to reduce procurement costs"
      ],
      threats: [
        "Aggressive price competition from well-capitalized wholesale suppliers in nearby towns",
        "Prolonged credit demands from village acquaintances causing working capital crunches",
        "Unanticipated local power outages or weather disruptions affecting business operations",
        "Erosion of consumer purchasing power during regional drought or crop failure seasons"
      ]
    },
    threats: [
      {
        name: "Working Capital Trapped in Informal Credit",
        level: "High",
        description: "Village customers often request informal credit, stalling inventory replenishment.",
        mitigation: "Set strict credit ceilings, offer cash discounts (2-3%), and record transactions on digital khata apps."
      },
      {
        name: "Competition from Town Wholesalers",
        level: "Moderate",
        description: "Nearby urban markets offer broader variety and bulk purchase discounts.",
        mitigation: "Compete on doorstep delivery convenience, instant availability, and post-sales personal service."
      },
      {
        name: "Agricultural Income Seasonality",
        level: "Moderate",
        description: "Customer purchasing power dips between sowing and post-harvest liquidation.",
        mitigation: "Maintain lean operating expenses during lean months and build cash reserves during harvest peaks."
      },
      {
        name: "Unplanned Overhead Costs",
        level: "Low to Moderate",
        description: "Unexpected equipment repairs or transport fuel price increases reduce margins.",
        mitigation: "Earmark a 10% operational contingency buffer in the monthly working capital budget."
      }
    ],
    summary: {
      signal: "Favorable Local Niche",
      demandDriver: "Convenience, trusted local relationships, and localized adaptation to community requirements.",
      competitiveConcern: "Credit trap and potential competition from established town retail centers.",
      differentiationSuggestion: "Deliver high-touch personalized customer service, transparent fair pricing, and maintain reliable daily inventory availability.",
      recommendedNextStep: "Proceed to Stage 2: Feasibility Engine to assess operational readiness, regulatory licensing, and required working capital reserve."
    }
  }
};

/**
 * Helper to fetch structured market intelligence for a sector.
 * Deterministic: returns the exact same intelligence for the same sector/category.
 */
export function getSectorMarketIntelligence(sectorId) {
  if (sectorId && FALLBACK_MARKET_INTELLIGENCE[sectorId]) {
    return FALLBACK_MARKET_INTELLIGENCE[sectorId];
  }
  return FALLBACK_MARKET_INTELLIGENCE["custom-default"];
}
