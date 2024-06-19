import React from "react";

const Documentation = () => {
  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            EduMap Chemnitz Documentation
          </h1>

          <img
            src="https://media.istockphoto.com/id/1202917067/photo/chemnitz-germany.jpg?s=612x612&w=0&k=20&c=HLZ37csLJKkltnKTECwo9fi1uPOxsC1leaTzMQEERYg="
            alt="Documentation"
            className="w-full h-64 object-cover mb-6 rounded-lg"
          />

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Account Creation
            </h2>
            <ol className="list-decimal ml-6 text-gray-600">
              <li>Visit the Edumap Chemnitz sign-up page.</li>
              <li>Fill in your name, email, and password.</li>
              <li>Log in with your new account.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              System Requirements
            </h2>
            <ul className="list-disc ml-6 text-gray-600">
              <li>
                Browser: Latest versions of Chrome, Firefox, Safari, or Edge.
              </li>
              <li>OS: Windows 10+, macOS 10.13+, iOS 12+, Android 9+.</li>
              <li>Internet Connection: Stable broadband connection.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">FAQs</h2>
            <div className="text-gray-600">
              <p>
                <strong>Q: How do I reset my password?</strong>
              </p>
              <p>
                A: Go to the password reset page and enter your email address.
                Follow the instructions sent to your email to reset your
                password.
              </p>
            </div>
            <div className="text-gray-600 mt-4">
              <p>
                <strong>Q: Can I use Edumap Chemnitz offline?</strong>
              </p>
              <p>
                A: Currently, Edumap Chemnitz requires an internet connection to
                access all features. However, you can export your itineraries
                for offline use.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Troubleshooting
            </h2>
            <div className="text-gray-600">
              <p>
                <strong>Issue: Map is not loading.</strong>
              </p>
              <p>Solution:</p>
              <ul className="list-disc ml-6">
                <li>Ensure you have a stable internet connection.</li>
                <li>Clear your browser cache and cookies.</li>
                <li>Try accessing the map on a different browser or device.</li>
              </ul>
            </div>
            <div className="text-gray-600 mt-4">
              <p>
                <strong>Issue: Unable to create an account.</strong>
              </p>
              <p>Solution:</p>
              <ul className="list-disc ml-6">
                <li>Ensure all required fields are filled out correctly.</li>
                <li>Check your email for the verification link.</li>
                <li>Contact support if the issue persists.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Contact Support
            </h2>
            <div className="text-gray-600">
              <p>
                <strong>Email:</strong> support@edumapchemnitz.com
              </p>
              <p>
                <strong>Phone:</strong> +49 15752932755
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
