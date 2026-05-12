import axios from "axios";
const MAP_URL = import.meta.env.VITE_MAPS_API_URL

export const findLocation = async (lat, lng) => {
  try {
    const res = await axios(
      `${MAP_URL}reverse?format=json&lat=${lat}&lon=${lng}`
    );
    return res.data
  } catch (error) {
    throw new Error(
      `Failed to fetch location for coordinates (${lat}, ${lng}): ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

export async function fetchLocationSuggestions(query) {
  try {
    const response = await fetch(
      `${MAP_URL}search?format=json&q=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching location suggestions: ${response.statusText}`);
    }
    const data = await response.json();
    return data.map((item) => ({
      display_name: item.display_name,
      lat: +item.lat,
      lon: +item.lon,
    }));
  } catch (error) {
    console.error("Failed to fetch location suggestions:", error);
    return [];
  }
}
