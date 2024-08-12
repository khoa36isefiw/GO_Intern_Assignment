export default function getCityFromCoordinates(latitude, longitude) {
    const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAqiQwkEyNnVkYgOI5RK5H-X_ad2n6cDFc`;
  
    return fetch(geocodingApiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const result = data.results[0];
          const cityComponent = result.address_components.find(
            (component) =>
              component.types.includes("locality") ||
              component.types.includes("administrative_area_level_1")
          );
          const cityName = cityComponent ? cityComponent.long_name : "";
          return cityName;
        } else {
          return "";
        }
      })
      .catch((error) => {
        console.log("Error occurred while fetching city:", error);
        return "";
      });
  }
  