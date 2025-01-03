import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

export let DataContext = createContext();

export default function DataContextFunction({ children }) {
  const [user, setUser] = useState(null); // User data
  const [destinations, setDestinations] = useState([]); // List of destinations
  const [accommodationPlaces, setAccommodationPlaces] = useState([]); // Places options
  const [accommodationTypes, setAccommodationTypes] = useState([]); // Types options
  const [selectedAccommodation, setSelectedAccommodation] = useState(null); // Selected accommodation
  const [transportationTypes, setTransportationTypes] = useState([]); // List of transportation types
  const [selectedTransportation, setSelectedTransportation] = useState(null); // Selected transportation details
  const [loading, setLoading] = useState(false); // Loading indicator
  const token = localStorage.getItem("token"); // Get the token from localStorage

  // Fetch user data, destinations, accommodation places, types, and transportation types
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken?.id;
          const response = await axios.get(`https://explore-ksa-backend.vercel.app/apis/user/userdata/${userId}`);
          console.log("User data", response.data);
          setUser(response.data.user);
        } catch (error) {
          console.error("Error fetching user data", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    const fetchDestinations = async () => {
      try {
        const response = await axios.get("https://explore-ksa-backend.vercel.app/api/destinations");
        setDestinations(response.data);
      } catch (error) {
        console.error("Error fetching destinations", error);
        setDestinations([]);
      }
    };

    const fetchAccommodationOptions = async () => {
      try {
        const [placesResponse, typesResponse] = await Promise.all([
          axios.get("https://explore-ksa-backend.vercel.app/api/accommodation/accommodations/names"),
          axios.get("https://explore-ksa-backend.vercel.app/api/accommodation/accommodations/types")
        ]);
        setAccommodationPlaces(placesResponse.data);
        setAccommodationTypes(typesResponse.data);
      } catch (error) {
        console.error("Error fetching accommodation options", error);
        setAccommodationPlaces([]);
        setAccommodationTypes([]);
      }
    };

    const fetchTransportationTypes = async () => {
      try {
        const response = await axios.get("https://explore-ksa-backend.vercel.app/api/transportation/types");
        setTransportationTypes(response.data);
      } catch (error) {
        console.error("Error fetching transportation types", error);
        setTransportationTypes([]);
      }
    };

    setUser(null);
    setDestinations([]);
    fetchUserData();
    fetchDestinations();
    fetchAccommodationOptions();
    fetchTransportationTypes();
  }, [token]);

  // Fetch selected accommodation details
  const fetchAccommodationData = async (place, type) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://explore-ksa-backend.vercel.app/api/accommodation/getdata?name=${place}&type=${type}`);
      setSelectedAccommodation(response.data[0]);
    } catch (error) {
      console.error("Error fetching accommodation data", error);
      setSelectedAccommodation(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch selected transportation details
  const fetchTransportationData = async (type) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://explore-ksa-backend.vercel.app/api/transportation/type/${type}`);
      setSelectedTransportation(response.data[0]);
    } catch (error) {
      console.error("Error fetching transportation data", error);
      setSelectedTransportation(null);
    } finally {
      setLoading(false);
    }
  };
  const postReview = async (reviewData) => {
    try {
      setLoading(true);
      const response = await axios.post("https://explore-ksa-backend.vercel.app/api/reviwews", reviewData);
      return response.data;
    } catch (error) {
      console.error("Error posting review", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        user,
        destinations,
        accommodationPlaces,
        accommodationTypes,
        selectedAccommodation,
        fetchAccommodationData,
        loading,
        transportationTypes,
        selectedTransportation,
        fetchTransportationData,
        postReview
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
