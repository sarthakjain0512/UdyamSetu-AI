/**
 * UdyamSetu AI — Fallback Feasibility Dataset & Scoring Engine
 * Deterministic, sector-specific operational and feasibility benchmarks for rural micro-enterprises.
 *
 * NOTE: PROTOTYPE / DEMO DATA
 * Indicators are illustrative assessments based on standard rural MSME parameters.
 * They do not constitute guaranteed commercial success or bank loan sanction.
 */

export const FALLBACK_FEASIBILITY_DATA = {
  "dairy-processing": {
    operationalReadiness: {
      rawMaterialAccess: { rating: "High", detail: "Abundant farm-gate raw milk availability from smallholder cattle owners within 3-5 km." },
      equipmentRequirement: { rating: "Moderate", detail: "Cream separator, milk analyzer (fat/SNF tester), stainless steel boiling vat, and deep freezer." },
      skillRequirement: { rating: "Moderate", detail: "Basic hygiene, lactometer testing, temperature control for curd/paneer coagulation, and vacuum packing." },
      infrastructureRequirement: { rating: "High", detail: "Clean washable floor, food-grade water connection, and 3-phase reliable power or solar backup." },
      supplyChainComplexity: { rating: "Moderate", detail: "Morning/evening perishable collection window requires strict cold chain discipline." },
      distributionComplexity: { rating: "Low", detail: "Direct delivery to neighborhood halwais, sweet shops, and village kirana retail counters." }
    },
    resourceRequirements: [
      { category: "Capital", item: "Own Margin + Working Capital", status: "Required", description: "Minimum ₹1.5L - ₹3.0L own equity to sustain 30-day milk collection cash cycles." },
      { category: "Equipment", item: "Milk Processing Units", status: "Required", description: "Stainless steel cream separator, milk cans, deep freezer, and electronic weighing scale." },
      { category: "Raw Materials", item: "Raw Buffalo / Cow Milk", status: "Required", description: "Direct daily collection agreements with 15-25 local cattle-owning households." },
      { category: "Workforce", item: "Semi-Skilled Helpers", status: "Recommended", description: "1-2 local workers for collection, vat heating, packaging, and cleaning." },
      { category: "Infrastructure", item: "Washable Concrete Workspace", status: "Required", description: "200-400 sq.ft covered hygienic room with drainage, pest netting, and water source." },
      { category: "Licensing", item: "FSSAI Basic Registration", status: "Required", description: "Mandatory food safety registration for micro food units (annual fee ~₹100)." },
      { category: "Compliance", item: "Udyam & Trade License", status: "Recommended", description: "Verify applicable local Gram Panchayat NOC and Udyam MSME registration for subsidies." }
    ],
    breakevenAssumptions: {
      monthlyFixedCost: 28000, // rent, electricity, maintenance, basic labor allowance
      unitContributionMargin: 35, // per kg average margin across paneer/ghee
      indicativeBreakEvenMonths: 6,
      breakEvenVolumeNote: "Break-even achieved at ~800 kg monthly value-added dairy product sales (~27 kg daily)."
    },
    keyGaps: [
      "Perishable inventory creates high dependency on backup power during rural summer outages.",
      "Informal credit demand from local sweet shop buyers can strain initial revolving cash flow.",
      "Need for formal milk testing protocols (fat/SNF) to maintain consistent product quality."
    ],
    recommendations: [
      "Finalize milk collection commitments with at least 15 local dairy farmers before procuring machinery.",
      "Obtain basic FSSAI registration and Udyam certificate to qualify for 35% PMFME/PMEGP capital subsidy.",
      "Install solar power or dual-fuel generator backup to safeguard refrigeration during power cuts.",
      "Secure advance purchase agreements with 3-5 high-volume sweet shops with 50% weekly settlement.",
      "Adopt tamper-evident sealed packaging to command 10-15% price premium over unbranded loose milk.",
      "Maintain a 45-day working capital cash reserve for uninterrupted daily farmer payments."
    ]
  },

  "spices-food-processing": {
    operationalReadiness: {
      rawMaterialAccess: { rating: "High", detail: "Dry whole spices (turmeric, chili, coriander) sourced from regional mandis with 6-12 months shelf stability." },
      equipmentRequirement: { rating: "Moderate", detail: "Heavy-duty commercial pulverizer (grinder), vibratory sieve, batch mixer, and nitrogen-flush sealer." },
      skillRequirement: { rating: "Low to Moderate", detail: "Grinder operation, mesh sieving, proportioned spice blending, and heat sealing." },
      infrastructureRequirement: { rating: "Moderate", detail: "Dry enclosed room with exhaust dust extraction, pest barrier, and standard commercial power." },
      supplyChainComplexity: { rating: "Low", detail: "Non-perishable bulk procurement 2-3 times per year during post-harvest price dips." },
      distributionComplexity: { rating: "Low to Moderate", detail: "Supplying local kirana stores, weekly haats, and wholesale village retail merchants." }
    },
    resourceRequirements: [
      { category: "Capital", item: "Machinery + Raw Inventory", status: "Required", description: "Minimum ₹1.0L - ₹2.5L to procure bulk whole spices at harvest rates and pulverizer." },
      { category: "Equipment", item: "Pulverizer & Packaging Sealer", status: "Required", description: "Commercial hammer mill grinder, multi-mesh sieves, and continuous band heat sealer." },
      { category: "Raw Materials", item: "Whole Dry Spices", status: "Required", description: "Grade-sorted whole turmeric, dry red chili, coriander seeds, and whole cumin." },
      { category: "Workforce", item: "Grinding & Packing Staff", status: "Recommended", description: "1 operator for pulverizer and 1-2 workers for weighing, pouching, and boxing." },
      { category: "Infrastructure", item: "Moisture-Free Storage", status: "Required", description: "150-300 sq.ft dry warehouse with wooden pallets and ventilation exhaust fan." },
      { category: "Licensing", item: "FSSAI Basic Registration", status: "Required", description: "Mandatory food hygiene and packaging labeling registration." },
      { category: "Compliance", item: "Weights & Measures Clearance", status: "Verify local rules", description: "Verify stamping of electronic digital weighing scales with Legal Metrology department." }
    ],
    breakevenAssumptions: {
      monthlyFixedCost: 22000,
      unitContributionMargin: 45, // per kg blended spice margin
      indicativeBreakEvenMonths: 5,
      breakEvenVolumeNote: "Break-even achieved at ~500 kg monthly spice powder distribution (~17 kg daily across 20 retail shops)."
    },
    keyGaps: [
      "Established brand loyalty among homemakers for legacy regional corporate spice brands.",
      "Dust and strong pungent aroma requires dedicated exhaust ventilation to protect workers.",
      "Seasonal price volatility in raw whole spices requires seasonal bulk buying capital."
    ],
    recommendations: [
      "Test small-batch regional masala blends with 20 neighborhood families for taste and aroma feedback.",
      "Procure raw whole spices directly during peak harvest months (Feb–April) for 20-30% price advantage.",
      "Design clear, attractive 3-ply foil pouches highlighting '100% Pure & Unadulterated Stone-Ground Spices'.",
      "Offer local kirana retailers a 20% trade margin (vs 10-12% offered by national brands) to gain shelf space.",
      "Obtain FSSAI certification and Udyam registration to access credit-linked PMEGP subsidies.",
      "Provide free 50g trial sampling sachets with prominent phone/WhatsApp order contact."
    ]
  },

  "organic-bio-inputs": {
    operationalReadiness: {
      rawMaterialAccess: { rating: "High", detail: "Cow dung, agricultural crop residues, and biomass sourced locally at near-zero raw material cost." },
      equipmentRequirement: { rating: "Low", detail: "HDPE vermicompost beds, shade netting, water sprinkler hose, and rotary hand sieve." },
      skillRequirement: { rating: "Low to Moderate", detail: "Maintaining 60% bed moisture, temperature monitoring below 35°C, and earthworm feeding cycles." },
      infrastructureRequirement: { rating: "Moderate", detail: "Open rural land (500-1000 sq.ft) with water borehole and 75% agricultural shade canopy." },
      supplyChainComplexity: { rating: "Low", detail: "Local biomass collection using tractor trolleys or bullock carts within village." },
      distributionComplexity: { rating: "Low", detail: "Bulk bag delivery directly to neighboring farmers during pre-sowing soil prep months." }
    },
    resourceRequirements: [
      { category: "Capital", item: "Bed Setup + Earthworms Stock", status: "Required", description: "Modest ₹50,000 - ₹1.5L investment for 10-20 HDPE beds, shade net, and breeding worms." },
      { category: "Equipment", item: "HDPE Vermi-Beds & Sieves", status: "Required", description: "UV-stabilized HDPE beds with drainage nozzles, manual drum sieve, and water hose." },
      { category: "Raw Materials", item: "Cow Dung & Eisenia fetida Worms", status: "Required", description: "Decomposed cattle dung, dry organic biomass, and 10-20 kg active earthworm culture." },
      { category: "Workforce", item: "Field Labor", status: "Recommended", description: "1-2 farm hands for turning beds, watering every 3 days, and sieving finished castings." },
      { category: "Infrastructure", item: "Shaded Rural Plot", status: "Required", description: "Fenced land plot with water access, shielded from direct sunlight and stray animals." },
      { category: "Licensing", item: "Fertilizer Control Order (FCO)", status: "Verify local rules", description: "Verify state agriculture department guidelines for commercial organic fertilizer sale." },
      { category: "Compliance", item: "Udyam MSME Registration", status: "Recommended", description: "Priority registration for rural agriculture allied enterprise subsidies." }
    ],
    breakevenAssumptions: {
      monthlyFixedCost: 15000,
      unitContributionMargin: 4, // per kg compost margin
      indicativeBreakEvenMonths: 4,
      breakEvenVolumeNote: "Break-even achieved at ~3,750 kg monthly compost sales (~75 bags of 50kg each during planting seasons)."
    },
    keyGaps: [
      "45-60 day biological decomposition cycle means delayed initial harvest and revenue.",
      "High sensitivity of earthworms to summer temperatures above 38°C without proper misting.",
      "Farmer habit of relying on heavily subsidized chemical fertilizers requires field demonstrations."
    ],
    recommendations: [
      "Set up 3 demonstration plots on prominent local farms to showcase root depth and water retention improvements.",
      "Install agro-shade netting and micro-sprinklers to prevent worm mortality during peak summer heat.",
      "Collect and bottle liquid vermiwash to sell as an organic pest-repellent foliar spray for bonus income.",
      "Partner with local Farmer Producer Organizations (FPOs) and Krishi Vigyan Kendras (KVK) for bulk purchase orders.",
      "Package premium 5kg and 10kg bags with screen-printed branding for urban nurseries and terrace gardeners.",
      "Apply for Paramparagat Krishi Vikas Yojana (PKVY) and PMEGP rural credit assistance."
    ]
  },

  "solar-pump-services": {
    operationalReadiness: {
      rawMaterialAccess: { rating: "Moderate", detail: "Spares and replacement components (inverters, DC cables, sensors) ordered from regional distributors." },
      equipmentRequirement: { rating: "Moderate to High", detail: "Digital multimeter, insulation resistance tester, pipe clamp tools, crimping sets, and mobile service kit." },
      skillRequirement: { rating: "High", detail: "Solar DC wiring, VFD inverter programming, earthing resistance testing, and submersible pump motor repair." },
      infrastructureRequirement: { rating: "Low", detail: "Mobile technician setup (two-wheeler or e-rickshaw) with a small 100 sq.ft tool storage room." },
      supplyChainComplexity: { rating: "Moderate", detail: "Maintaining buffer inventory of common wear-and-tear replacement parts and cables." },
      distributionComplexity: { rating: "Low", detail: "On-demand mobile technician response directly at farmers' agricultural borewell sites." }
    },
    resourceRequirements: [
      { category: "Capital", item: "Diagnostic Tools + Spares Inventory", status: "Required", description: "₹1.5L - ₹3.0L for specialized diagnostic tools, spare inverters, cables, and mobile transport." },
      { category: "Equipment", item: "Diagnostic & Repair Toolset", status: "Required", description: "Megger insulation tester, solar solarimeter, multimeter, pipe wrenches, and crimpers." },
      { category: "Raw Materials", item: "Solar Electrical Components", status: "Required", description: "MC4 connectors, DC surge protection devices (SPDs), DC fuses, and copper earthing rods." },
      { category: "Workforce", item: "Certified Solar Electricians", status: "Required", description: "1-2 ITI or Surya Mitra certified technicians with electrical safety credentials." },
      { category: "Infrastructure", item: "Mobile Service Vehicle", status: "Required", description: "Equipped motorcycle or e-loader for rapid farm-gate breakdown dispatch." },
      { category: "Licensing", item: "Electrical Contractor License", status: "Verify local rules", description: "State electrical inspectorate registration recommended for commercial HT/LT installations." },
      { category: "Compliance", item: "OEM Service Authorization", status: "Recommended", description: "Tie-up as authorized local service partner for solar pump manufacturers under PM-KUSUM." }
    ],
    breakevenAssumptions: {
      monthlyFixedCost: 24000,
      unitContributionMargin: 1200, // average service call margin
      indicativeBreakEvenMonths: 5,
      breakEvenVolumeNote: "Break-even achieved at ~20-25 paid service interventions or 30 annual maintenance contracts (AMC)."
    },
    keyGaps: [
      "Need for technical training (Surya Mitra certification) to troubleshoot modern hybrid inverters.",
      "Seasonal dependence on irrigation months, requiring off-season diversification into home rooftop solar.",
      "Farmers often expect delayed settlement until agricultural harvest proceeds arrive."
    ],
    recommendations: [
      "Enroll technicians in government-sponsored Surya Mitra skill development programs for formal certification.",
      "Sign Annual Maintenance Contracts (AMCs) with 40-50 local solar pump owners for predictable recurring revenue.",
      "Offer emergency 4-hour breakdown response guarantee to build immense goodwill against distant town technicians.",
      "Stock essential fast-moving spare parts (MC4 connectors, DC fuses, lightning arresters) in mobile kit.",
      "Expand services to solar rooftop installations and solar battery maintenance during non-irrigation seasons.",
      "Register on Udyam portal to access Stand-Up India or PMEGP financial structuring incentives."
    ]
  },

  "handloom-jute-crafts": {
    operationalReadiness: {
      rawMaterialAccess: { rating: "High", detail: "Raw woven jute fabric rolls, cotton fabrics, and sewing threads sourced from regional textile mandis." },
      equipmentRequirement: { rating: "Moderate", detail: "Heavy-duty industrial sewing machines, fabric cutting tables, manual screen printing tables, and iron presses." },
      skillRequirement: { rating: "Moderate", detail: "Pattern cutting, stitching, handle reinforcement, and screen printing / embroidery application." },
      infrastructureRequirement: { rating: "Low to Moderate", detail: "200-350 sq.ft common workshop room or decentralized home-based stitching model with village women." },
      supplyChainComplexity: { rating: "Low", detail: "Raw fabric rolls and inks have indefinite shelf-life and can be ordered in bulk quarterly." },
      distributionComplexity: { rating: "Low to Moderate", detail: "Supplying local retail stores, regional tourism centers, exhibition bazaars, and institutional clients." }
    },
    resourceRequirements: [
      { category: "Capital", item: "Sewing Machines + Fabric Rolls", status: "Required", description: "₹1.0L - ₹2.0L for 3-5 industrial stitchers, initial fabric rolls, and printing supplies." },
      { category: "Equipment", item: "Industrial Sewing Machines", status: "Required", description: "Heavy-duty lockstitch sewing machines, cutting shears, screen printing frames, and grommet punchers." },
      { category: "Raw Materials", item: "Jute & Cotton Hessian Fabric", status: "Required", description: "Laminated/unlaminated jute rolls, cotton tape handles, non-toxic water-based screen printing inks." },
      { category: "Workforce", item: "Artisans & Stitching Tailors", status: "Required", description: "3-6 trained local women stitchers operating on piece-rate remuneration." },
      { category: "Infrastructure", item: "Cutting & Stitching Center", status: "Recommended", description: "Well-lit room with large cutting table, storage racks for fabric rolls, and power points." },
      { category: "Licensing", item: "Udyam & Trade License", status: "Recommended", description: "Udyam registration facilitates PM Vishwakarma and PMEGP 35% women subsidies." },
      { category: "Compliance", item: "GeM Portal Onboarding", status: "Verify local rules", description: "Verify registration on Government e-Marketplace (GeM) for government office bag tenders." }
    ],
    breakevenAssumptions: {
      monthlyFixedCost: 20000,
      unitContributionMargin: 25, // per bag average contribution margin
      indicativeBreakEvenMonths: 5,
      breakEvenVolumeNote: "Break-even achieved at ~800 printed tote/shopping bags per month (~30 bags daily across 4 artisans)."
    },
    keyGaps: [
      "Stitching productivity is lower initially while training rural women artisans on uniform pattern finishing.",
      "Competition from ultra-cheap illegal non-woven synthetic plastic bags in deep village markets.",
      "Artisans often balance domestic commitments, requiring flexible piece-rate working arrangements."
    ],
    recommendations: [
      "Train a core cohort of 4-6 local women on standardized bag patterns, reinforced stitching, and handle bar-tacking.",
      "Target institutional orders: conference kit bags for local universities, banks, hospitals, and temple trusts.",
      "Create samples of bags with regional folk art motifs (Madhubani / Warli) for premium city exhibition sales.",
      "Avail PM Vishwakarma and PMEGP special 35% capital subsidy tailored for rural women micro-enterprises.",
      "Promote environmental compliance (Single-Use Plastic Ban) to convince neighborhood grocers to switch.",
      "Maintain active presence at district craft fairs and weekly rural haats for direct consumer feedback."
    ]
  },

  "micro-cold-chilling": {
    operationalReadiness: {
      rawMaterialAccess: { rating: "High", detail: "Heavy seasonal surplus of perishable tomatoes, chilies, fruits, and greens from surrounding farms." },
      equipmentRequirement: { rating: "High", detail: "5-10 MT modular cold room, thermal insulated PUF panels, solar DC compressor, and PCM thermal storage." },
      skillRequirement: { rating: "Moderate", detail: "Temperature/humidity controller management, intake crate inspection, and refrigeration maintenance." },
      infrastructureRequirement: { rating: "High", detail: "300-500 sq.ft covered space, all-weather road access for pickup trucks, and solar panel rooftop area." },
      supplyChainComplexity: { rating: "Moderate", detail: "Daily morning/evening crate check-in and checkout during harvest harvesting cycles." },
      distributionComplexity: { rating: "Low", detail: "Farmers and local vegetable aggregators directly deliver and retrieve produce at the facility." }
    },
    resourceRequirements: [
      { category: "Capital", item: "Solar Cold Room Investment", status: "Required", description: "₹8.0L - ₹18.0L total project outlay (heavily subsidizable under AIF/MIDH by 35-50%)." },
      { category: "Equipment", item: "Modular Solar Cold Room (5-10 MT)", status: "Required", description: "Pre-fabricated PUF insulated cold chamber, solar PV array, compressor, and PCM cooling plates." },
      { category: "Raw Materials", item: "Food-Grade Plastic Crates", status: "Required", description: "200-500 stackable ventilated plastic crates for sorting and storing produce." },
      { category: "Workforce", item: "Facility Supervisor", status: "Required", description: "1 full-time manager for crate weigh-in, receipt issuance, and temperature logging." },
      { category: "Infrastructure", item: "Roadside Packhouse Shed", status: "Required", description: "Solid foundation shed with loading ramp and rooftop space for 5-8 kW solar PV installation." },
      { category: "Licensing", item: "Warehousing & Local NOC", status: "Verify local rules", description: "Verify local Gram Panchayat trade NOC and agricultural warehousing guidelines." },
      { category: "Compliance", item: "Agriculture Infrastructure Fund (AIF)", status: "Recommended", description: "Apply for 3% interest subvention and credit guarantee under central AIF portal." }
    ],
    breakevenAssumptions: {
      monthlyFixedCost: 35000,
      unitContributionMargin: 180, // per crate monthly storage fee
      indicativeBreakEvenMonths: 8,
      breakEvenVolumeNote: "Break-even achieved at ~200 crates sustained monthly rental capacity (approx. 40% chamber capacity)."
    },
    keyGaps: [
      "Higher initial capital expenditure requiring structured term loan under Agriculture Infrastructure Fund (AIF).",
      "Need for farmer education regarding proper crate packing to avoid storing damaged/infected produce.",
      "Off-season utilization dips between major vegetable harvest transitions."
    ],
    recommendations: [
      "Form formal storage partnerships with 20-30 local tomato and chili growers before commissioning.",
      "Apply immediately for Agriculture Infrastructure Fund (AIF) for 3% interest rebate and credit guarantee.",
      "Implement a digital receipt system with digital weighing scale to build complete trust with farmers.",
      "Offer daily micro-rental options (₹5-8 per crate/day) to make storage accessible to smallest marginal farmers.",
      "Diversify off-season storage by accommodating milk collection cans, eggs, and local nursery saplings.",
      "Contract an annual maintenance SLA with the turnkey solar refrigeration vendor for 24-hour repair guarantee."
    ]
  },

  "custom-default": {
    operationalReadiness: {
      rawMaterialAccess: { rating: "Moderate", detail: "Locally obtainable inputs from nearby agricultural mandis, rural artisans, or town wholesale markets." },
      equipmentRequirement: { rating: "Moderate", detail: "Standard commercial trade tools, localized machinery, and basic digital processing equipment." },
      skillRequirement: { rating: "Moderate", detail: "Practical vocational trade experience, customer service agility, and basic bookkeeping." },
      infrastructureRequirement: { rating: "Moderate", detail: "Dedicated retail or workshop space with water access, ventilation, and grid/solar electricity." },
      supplyChainComplexity: { rating: "Low to Moderate", detail: "Weekly procurement cycles from regional wholesale centers with predictable re-ordering." },
      distributionComplexity: { rating: "Low", detail: "Direct localized sales within the immediate gram panchayat and neighboring weekly haats." }
    },
    resourceRequirements: [
      { category: "Capital", item: "Own Margin + Working Capital", status: "Required", description: "Initial capital sized to cover setup expenses and 60 days of revolving operational costs." },
      { category: "Equipment", item: "Core Trade Tools & Fixtures", status: "Required", description: "Dedicated enterprise machinery, display counters, and digital billing scale." },
      { category: "Raw Materials", item: "Initial Production Inventory", status: "Required", description: "Standardized raw inputs and consumable packaging supplies." },
      { category: "Workforce", item: "Founder + 1 Helper", status: "Recommended", description: "Owner-operated with part-time support from family or local semi-skilled apprentice." },
      { category: "Infrastructure", item: "Operational Workspace", status: "Required", description: "Secure, weatherproof room (150-300 sq.ft) with road accessibility and electricity." },
      { category: "Licensing", item: "Udyam MSME Registration", status: "Required", description: "Free government registration online for bank priority lending status." },
      { category: "Compliance", item: "Gram Panchayat Trade NOC", status: "Verify local rules", description: "Verify local rural trade authorization and state tax thresholds." }
    ],
    breakevenAssumptions: {
      monthlyFixedCost: 20000,
      unitContributionMargin: 30, // average percentage margin
      indicativeBreakEvenMonths: 6,
      breakEvenVolumeNote: "Break-even achieved when monthly gross margin covers estimated fixed operational expenses."
    },
    keyGaps: [
      "Early customer awareness requires active local door-to-door sampling and trusted word-of-mouth.",
      "Maintaining a disciplined cash reserve to prevent working capital exhaustion during initial months.",
      "Establishing clear supplier trade credit terms to avoid paying retail spot prices for inputs."
    ],
    recommendations: [
      "Conduct informal customer validation with 25-30 local residents to refine pricing and service features.",
      "Register on the Udyam portal to access Mudra or PMEGP priority micro-enterprise loan subsidies.",
      "Keep fixed overhead expenses low during the first 90 days by leveraging existing community assets.",
      "Maintain a daily digital khata (ledger) to monitor cash inflows, outflows, and customer balances.",
      "Explore bulk procurement partnerships with neighboring shopkeepers to reduce freight overhead.",
      "Plan for a 6-month ramp-up phase before expecting significant personal profit withdrawals."
    ]
  }
};

/**
 * Deterministic Feasibility Scoring Engine
 * Computes 5 dimension scores (0-100) and an overall status based on:
 * - Sector operational benchmarks
 * - Capital adequacy ratio (Margin Capital vs Sector Minimum Investment)
 * - District geographic tier
 *
 * NOTE: 100% deterministic — no Math.random() is used.
 */
export function computeFeasibilityAssessment({ sectorId, districtTier, marginCapital, businessIdea, isCustom }) {
  const normalizedSectorId = (sectorId && FALLBACK_FEASIBILITY_DATA[sectorId]) 
    ? sectorId 
    : "custom-default";

  const rawCapital = Number(marginCapital);
  if (!marginCapital || isNaN(rawCapital) || rawCapital <= 0) {
    throw new Error("Margin capital is required to evaluate financial readiness and feasibility.");
  }
  const capital = rawCapital;
  const sectorData = FALLBACK_FEASIBILITY_DATA[normalizedSectorId];

  // Sizing framework from SIH: Project Cost = Margin / 0.10
  const estimatedProjectCost = Math.round(capital / 0.10);
  const estimatedLoan = Math.round(estimatedProjectCost * 0.90);

  // Capital adequacy benchmark
  const minRequiredCapital = normalizedSectorId === "micro-cold-chilling" 
    ? 500000 
    : (normalizedSectorId === "dairy-processing" ? 200000 : 100000);

  const capitalRatio = capital / minRequiredCapital;

  // Dimension 1: Market Fit Score (0-100)
  // Derived from non-discretionary rural demand stability
  const marketFitScore = normalizedSectorId === "dairy-processing" 
    ? 88 
    : (normalizedSectorId === "spices-food-processing" ? 86 : 82);

  // Dimension 2: Financial Readiness Score (0-100)
  // Derived deterministically from capital ratio
  let financialScore = 75;
  if (capitalRatio >= 1.5) financialScore = 92;
  else if (capitalRatio >= 1.0) financialScore = 85;
  else if (capitalRatio >= 0.75) financialScore = 74;
  else financialScore = 62;

  // Dimension 3: Operational Readiness Score (0-100)
  // Tier-2 / Peri-Urban has higher infrastructure score than deep rural
  const isTier2 = districtTier?.toLowerCase().includes("tier-2");
  const operationalScore = isTier2 ? 86 : 79;

  // Dimension 4: Resource Feasibility Score (0-100)
  const resourceScore = capital >= 150000 ? 84 : 72;

  // Dimension 5: Risk Exposure Score (0-100) (Higher means well-managed / lower risk)
  const riskManagementScore = normalizedSectorId === "spices-food-processing" ? 85 : 78;

  // Weighted Overall Feasibility Score
  const overallScore = Math.round(
    (marketFitScore * 0.25) +
    (financialScore * 0.30) +
    (operationalScore * 0.20) +
    (resourceScore * 0.15) +
    (riskManagementScore * 0.10)
  );

  // A) Feasibility Status (Strictly Deterministic Thresholds)
  // 75–100 → Potentially Feasible
  // 60–74  → Needs Validation
  // 45–59  → Needs Significant Preparation
  // 0–44   → High Risk
  let status = "High Risk";
  let statusColor = "rose";

  if (overallScore >= 75) {
    status = "Potentially Feasible";
    statusColor = "emerald";
  } else if (overallScore >= 60) {
    status = "Needs Validation";
    statusColor = "amber";
  } else if (overallScore >= 45) {
    status = "Needs Significant Preparation";
    statusColor = "orange";
  } else {
    status = "High Risk";
    statusColor = "rose";
  }

  // B) Letter Grade (Strictly Deterministic Thresholds)
  // 90–100 → A+
  // 75–89  → A
  // 60–74  → B
  // 45–59  → C
  // 0–44   → D
  let grade = "D";
  if (overallScore >= 90) {
    grade = "A+";
  } else if (overallScore >= 75) {
    grade = "A";
  } else if (overallScore >= 60) {
    grade = "B";
  } else if (overallScore >= 45) {
    grade = "C";
  } else {
    grade = "D";
  }

  // Step 11: 6 Mandatory Risk Dimensions
  const risks = [
    {
      category: "Market Risk",
      title: "Local Retail Price Competition",
      level: normalizedSectorId === "poultry-broiler" ? "High" : "Moderate",
      impact: "Discounting by established regional distributors can compress wholesale product margins.",
      mitigation: "Differentiate on freshness, hyper-local village delivery, and customized smaller packaging sizes."
    },
    {
      category: "Financial Risk",
      title: "Working Capital & Credit Cycle Strain",
      level: capitalRatio < 1.0 ? "High" : (capitalRatio < 1.5 ? "Moderate" : "Low"),
      impact: "Delays in trade receivables from local retailers can restrict daily raw material procurement.",
      mitigation: "Negotiate 15-day supplier credit and utilize Mudra revolving overdraft for inventory buffers."
    },
    {
      category: "Operational Risk",
      title: "Equipment Downtime & Maintenance Gaps",
      level: "Moderate",
      impact: "Machinery breakdown in rural blocks without local technicians halts daily production.",
      mitigation: "Maintain spare seals and belts locally; secure annual maintenance tie-up with equipment vendor."
    },
    {
      category: "Supply Risk",
      title: "Raw Material Input Availability",
      level: normalizedSectorId === "dairy-processing" ? "Moderate" : "Low",
      impact: "Fluctuations in farm-gate yield or local supplier diversion can lower capacity utilization.",
      mitigation: "Form informal procurement contracts with 15–20 localized cluster producers with weekly settlement."
    },
    {
      category: "Customer Acquisition Risk",
      title: "Initial Consumer Inertia & Trust",
      level: "Moderate",
      impact: "Rural households may hesitate switching from established brand staples to a new local venture.",
      mitigation: "Offer initial 50g sampling sachets and partner with reputable village kirana shopkeepers."
    },
    {
      category: "Seasonal Risk",
      title: "Monsoon & Festival Demand Swings",
      level: normalizedSectorId === "organic-bio-inputs" ? "High" : "Moderate",
      impact: "Off-season months create revenue dips while recurring space and loan costs continue.",
      mitigation: "Plan dynamic working capital; introduce multi-product counter-cyclical offerings."
    }
  ];

  return {
    overallScore,
    status,
    grade,
    statusColor,
    dimensions: [
      {
        name: "Market Fit",
        score: marketFitScore,
        level: marketFitScore >= 80 ? "Strong" : "Moderate",
        summary: "High customer relevance and non-discretionary rural demand profile."
      },
      {
        name: "Financial Readiness",
        score: financialScore,
        level: financialScore >= 80 ? "Strong" : (financialScore >= 70 ? "Moderate" : "Needs Attention"),
        summary: `Available margin (₹${(capital/100000).toFixed(2)}L) against benchmark minimum requirement.`
      },
      {
        name: "Operational Readiness",
        score: operationalScore,
        level: operationalScore >= 80 ? "Strong" : "Moderate",
        summary: "Evaluates raw input proximity, site access, and utility connections."
      },
      {
        name: "Resource Feasibility",
        score: resourceScore,
        level: resourceScore >= 80 ? "Strong" : "Moderate",
        summary: "Checklist readiness across machinery, workforce, and regulatory filings."
      },
      {
        name: "Risk Exposure & Control",
        score: riskManagementScore,
        level: riskManagementScore >= 80 ? "Controlled" : "Moderate",
        summary: "Vulnerability to seasonal price shifts and equipment downtime."
      }
    ],
    operationalReadiness: sectorData.operationalReadiness,
    resourceRequirements: sectorData.resourceRequirements,
    breakevenAssumptions: sectorData.breakevenAssumptions,
    keyGaps: sectorData.keyGaps,
    recommendations: sectorData.recommendations,
    risks,
    financialSummary: {
      marginCapital: capital,
      estimatedProjectCost,
      estimatedLoan,
      financingTrack: estimatedProjectCost <= 140000 ? "Micro Finance (Up to ₹1.40L)" : "Term Loan (Up to ₹50L)"
    }
  };
}
