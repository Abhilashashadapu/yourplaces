import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const userId = useParams().userId;
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places?uid=${userId}`
        );
        if (!responseData || !responseData.places) {
          setLoadedPlaces([]);
        } else {
          setLoadedPlaces(responseData.places);
        }
      } catch (err) {
        console.error(err);
        setLoadedPlaces([]);
      }
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) => {
      const updatedPlaces = prevPlaces.filter(
        (place) => place.id !== deletedPlaceId
      );

      if (updatedPlaces.length === 0) {
        setTimeout(() => {
          navigate("/" + userId + "/places");
        }, 100); // Delay helps ensure state settles
      }

      return updatedPlaces;
    });
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedPlaces.length > 0 && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
      )}
      {!isLoading && loadedPlaces.length === 0 && (
        <div className="center">
          <h2>No places found for this user.</h2>
        </div>
      )}
    </>
  );
};

export default UserPlaces;

