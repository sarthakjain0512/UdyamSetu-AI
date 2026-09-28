from typing import List, Optional, Dict, Any
from app.data.sectors_db import SECTORS_DATA
from app.data.districts_db import DISTRICTS_DATA
from app.data.schemes_db import SCHEMES_DATA
from app.models.schemas import SectorItem, DistrictItem

class DataService:
    """
    Abstracted Data Access Service.
    In the prototype phase, this queries local JSON-like python data modules.
    In production, this service can easily be swapped with SQL/NoSQL ORM DB calls
    or external microservice APIs without changing business logic engines.
    """

    @staticmethod
    def get_all_sectors() -> List[SectorItem]:
        return [SectorItem(**item) for item in SECTORS_DATA]

    @staticmethod
    def get_sector_by_id(sector_id: str) -> Optional[SectorItem]:
        for item in SECTORS_DATA:
            if item["id"] == sector_id:
                return SectorItem(**item)
        return None

    @staticmethod
    def get_all_districts() -> List[DistrictItem]:
        return [DistrictItem(**item) for item in DISTRICTS_DATA]

    @staticmethod
    def get_district_by_id(district_id: str) -> Optional[DistrictItem]:
        for item in DISTRICTS_DATA:
            if item["id"] == district_id:
                return DistrictItem(**item)
        return None

    @staticmethod
    def get_raw_schemes() -> List[Dict[str, Any]]:
        return SCHEMES_DATA
