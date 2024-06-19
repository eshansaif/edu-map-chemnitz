import React from "react";

const LinkToSources = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div
            className="bg-cover bg-center h-56"
            style={{
              backgroundImage:
                "url('https://www.theater-chemnitz.de/fileadmin/_processed_/5/7/csm_Opernhaus-Chemnitz_2020_PR06__c_Nasser_Hashemi_6a7aa552e2.jpg')",
            }}
          ></div>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Open Data Portal Chemnitz
            </h2>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Website:</span>{" "}
              <a
                href="https://portal-chemnitz.opendata.arcgis.com"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://portal-chemnitz.opendata.arcgis.com
              </a>
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Description:</span> Open Data
              Portal Chemnitz is a website where we can find all the data about
              administration, landing, education etc. The data is provided by a
              community of Chemnitz who contribute and maintain data about
              roads, houses, schools, kindergarten, parks, and much more.
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Usage:</span> We use four types of
              data for our base map data and whole website, including road
              networks, geographical features, and points of interest.
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">License:</span> Open Database
              License (ODbL)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkToSources;
