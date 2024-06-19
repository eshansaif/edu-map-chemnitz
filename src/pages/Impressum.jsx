import React from "react";

const Impressum = () => {
  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Impressum</h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Name and Address
            </h2>
            <div className="mt-4">
              <p className="text-gray-600">
                <strong>Md Abdul Aziz</strong>
                <br />
                Vettersstraße 70
                <br />
                09126 Chemnitz
                <br />
                Country: Germany
              </p>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">
                <strong>Md Nabil Azam</strong>
                <br />
                Vettersstraße 54
                <br />
                09126 Chemnitz
                <br />
                Country: Germany
              </p>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Contact Information
            </h2>
            <div className="mt-4">
              <p className="text-gray-600">
                <strong>Phone:</strong> +49 17684937322
                <br />
                <strong>Phone:</strong> +49 15752932755
                <br />
                <strong>Email:</strong> mdabdulaziz7322@gmail.com
                <br />
                <strong>Website:</strong>{" "}
                <a
                  href="http://www.edumapchemnitz.com"
                  className="text-blue-500"
                >
                  www.edumapchemnitz.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
