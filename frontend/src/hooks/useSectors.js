import { useState, useEffect } from 'react';
import { fetchSectors, fetchDistricts } from '../services/sectorService';

export function useSectors() {
  const [sectors, setSectors] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        const [secData, distData] = await Promise.all([
          fetchSectors(),
          fetchDistricts()
        ]);
        if (isMounted) {
          setSectors(secData);
          setDistricts(distData);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, []);

  return { sectors, districts, loading, error };
}
