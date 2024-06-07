// // src/App.js
// import React, { useState, useEffect } from "react";
// import MapContainer from "./components/MapContainer";
// import Schools from "./components/Schools/Schools";

// const App = () => {
//   const [locations, setLocations] = useState([]);

//   // console.log(locations);

//   useEffect(() => {
//     fetch(
//       "https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulen_OpenData/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         setLocations(data.features);
//       })
//       .catch((error) => {
//         console.error("Error fetching JSON data:", error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>All Schools</h1>
//       {/* <MapContainer locations={locations} /> */}
//       <Schools locations={locations} />
//     </div>
//   );
// };

// export default App;
