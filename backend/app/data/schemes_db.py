SCHEMES_DATA = [
    {
        "scheme_code": "PMEGP-2026",
        "scheme_name": "Prime Minister's Employment Generation Programme (PMEGP)",
        "nodal_ministry": "Ministry of MSME",
        "base_subsidy_rate_rural": 35.0, # Special category / rural
        "base_subsidy_rate_urban": 25.0,
        "max_loan_limit_manufacturing": 5000000.0, # 50 Lakhs
        "max_loan_limit_service": 2000000.0, # 20 Lakhs
        "eligibility_categories": ["general", "obc", "sc", "st", "women", "ex-servicemen", "differently-abled"],
        "applicable_sectors": ["dairy-processing", "spices-food-processing", "organic-bio-inputs", "handloom-jute-crafts", "solar-pump-services"],
        "key_benefits": [
            "Up to 35% Capital Subsidy for Rural / Women / Special Category applicants",
            "Bank financing up to 90-95% of project cost",
            "No collateral required for loans up to ₹10 Lakhs under CGTMSE guarantee"
        ],
        "required_documents": [
            "Aadhaar Card & PAN Card",
            "Project Report / Business Blueprint",
            "Educational Qualification Certificate (8th Pass for projects > ₹10L)",
            "Rural Area Certificate / Gram Panchayat NOC",
            "Caste / Category Certificate (if applicable)"
        ],
        "application_portal_url": "https://www.kviconline.gov.in/pmegpeportal/"
    },
    {
        "scheme_code": "PM-FME-2026",
        "scheme_name": "PM Formalisation of Micro Food Processing Enterprises (PMFME)",
        "nodal_ministry": "Ministry of Food Processing Industries (MoFPI)",
        "base_subsidy_rate_rural": 35.0,
        "base_subsidy_rate_urban": 35.0,
        "max_loan_limit_manufacturing": 1000000.0, # 10 Lakhs max subsidy cap
        "max_loan_limit_service": 1000000.0,
        "eligibility_categories": ["general", "obc", "sc", "st", "women", "shg"],
        "applicable_sectors": ["dairy-processing", "spices-food-processing", "organic-bio-inputs", "micro-cold-chilling"],
        "key_benefits": [
            "35% Credit-linked Capital Subsidy max up to ₹10 Lakhs",
            "Seed capital assistance of ₹40,000 per SHG member for working capital",
            "Branding and marketing support for One District One Product (ODOP)"
        ],
        "required_documents": [
            "Food Safety (FSSAI) Basic Registration / Application",
            "Proof of Ownership / Rent agreement for unit location",
            "Bank statement for last 6 months",
            "Identity and Address Proof"
        ],
        "application_portal_url": "https://pmfme.mofpi.gov.in/"
    },
    {
        "scheme_code": "MUDRA-KISHORE-2026",
        "scheme_name": "Pradhan Mantri MUDRA Yojana (Kishore / Tarun Category)",
        "nodal_ministry": "Ministry of Finance",
        "base_subsidy_rate_rural": 0.0, # Interest subvention / Collateral free loan
        "base_subsidy_rate_urban": 0.0,
        "max_loan_limit_manufacturing": 1000000.0,
        "max_loan_limit_service": 1000000.0,
        "eligibility_categories": ["general", "obc", "sc", "st", "women"],
        "applicable_sectors": ["dairy-processing", "spices-food-processing", "organic-bio-inputs", "solar-pump-services", "handloom-jute-crafts", "micro-cold-chilling"],
        "key_benefits": [
            "100% Collateral-free bank loan up to ₹10 Lakhs (Kishore: ₹50k-5L, Tarun: ₹5L-10L)",
            "Mudra Card for hassle-free working capital drawal",
            "Competitive interest rates with zero processing fee for micro enterprises"
        ],
        "required_documents": [
            "Mudra Application Form",
            "Business Plan / Quotation of Machinery",
            "KYC Documents (Aadhaar, Voter ID, PAN)",
            "Bank Account details"
        ],
        "application_portal_url": "https://www.mudra.org.in/"
    },
    {
        "scheme_code": "LAKHPATI-DIDI-2026",
        "scheme_name": "Lakhpati Didi SHG Micro-Enterprise Initiative (DAY-NRLM)",
        "nodal_ministry": "Ministry of Rural Development",
        "base_subsidy_rate_rural": 25.0,
        "base_subsidy_rate_urban": 0.0,
        "max_loan_limit_manufacturing": 500000.0,
        "max_loan_limit_service": 300000.0,
        "eligibility_categories": ["women", "shg"],
        "applicable_sectors": ["dairy-processing", "spices-food-processing", "organic-bio-inputs", "handloom-jute-crafts"],
        "key_benefits": [
            "Interest Subvention bringing effective interest rate down to 4%",
            "Dedicated mentorship & Community Resource Person (CRP) guidance",
            "Access to Saras Aajeevika exhibitions & e-commerce onboarding"
        ],
        "required_documents": [
            "SHG Membership ID & Savings Book",
            "Gram Sangathan Recommendation",
            "Micro Investment Plan (MIP) document",
            "Aadhaar & Bank Passbook"
        ],
        "application_portal_url": "https://nrlm.gov.in/"
    },
    {
        "scheme_code": "STAND-UP-INDIA-2026",
        "scheme_name": "Stand-Up India Scheme for Women & SC/ST Entrepreneurs",
        "nodal_ministry": "Ministry of Finance",
        "base_subsidy_rate_rural": 15.0,
        "base_subsidy_rate_urban": 15.0,
        "max_loan_limit_manufacturing": 10000000.0, # 1 Crore
        "max_loan_limit_service": 10000000.0,
        "eligibility_categories": ["women", "sc", "st"],
        "applicable_sectors": ["dairy-processing", "spices-food-processing", "solar-pump-services", "handloom-jute-crafts", "micro-cold-chilling"],
        "key_benefits": [
            "Bank loans between ₹10 Lakhs and ₹1 Crore for greenfield projects",
            "Handholding support from SIDBI Stand-Up Connect Portal",
            "Credit Guarantee Scheme support (CGSUS)"
        ],
        "required_documents": [
            "Category Certificate (SC/ST) or Proof of Female Entrepreneurship (>51% share)",
            "Detailed Project Report (DPR)",
            "Proof of Business premises & License documents",
            "3 years Income Tax Returns (if existing entity)"
        ],
        "application_portal_url": "https://www.standupmitra.in/"
    }
]
