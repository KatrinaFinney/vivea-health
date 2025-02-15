// src/components/SplashPage.js
import { useRouter } from "next/router";

export default function SplashPage({ onShowForm }) {
  const router = useRouter();

  const navigateToInput = () => {
    router.push("/patient/input");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-white"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="border-4 border-gray-300 rounded-3xl p-4 w-[360px] min-h-[640px] flex flex-col justify-center mx-auto bg-[#F7F3EC]">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold font-['Pacifico'] text-gray-900">
            Welcome
          </h1>
          <p className="mt-2 text-3xl font-normal font-sans text-gray-800">
            to Vivea Health
          </p>
          <p className="mt-4 text-sm text-gray-800">
            Your AI health guide
          </p>
        </div>
        <div className="flex flex-col items-center gap-6">
          <button
            disabled
            className="bg-gray-400 opacity-50 cursor-not-allowed text-white py-3 px-6 rounded w-4/5"
          >
            Connect Your MyChart
          </button>
          <div className="text-center text-gray-800">or</div>
          <button
            onClick={onShowForm ? onShowForm : navigateToInput}
            className="bg-teal-700 text-white py-3 px-6 rounded w-4/5 glowing-button"
          >
            Tell Us About You
          </button>
        </div>
      </div>
    </div>
  );
}
