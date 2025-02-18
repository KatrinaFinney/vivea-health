// src/app/page.js
import SplashPage from "../components/SplashPage";

export default function Page() {
  return <SplashPage onLoginClick={() => console.log("Log In clicked")} onCreateAccountClick={() => console.log("Create Account clicked")} />;
}
