"use client"; 
import styles from './PricingComponent.module.css';
import { useState, ChangeEvent } from "react";
import Image from "next/image"; 

const PricingComponent: React.FC = () => {
  const [pageViews, setPageViews] = useState<number>(100);
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  
   // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };
  
  // Calculate the price based on billing type
  const getPrice = (): string => {
    const basePrice = 16;
    return isYearly ? (basePrice * 0.75).toFixed(2) : basePrice.toFixed(2);
  };

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPageViews(value);
  };
  
   // Set slider background to reflect page views
  const sliderBackgroundStyle = {
    background: `linear-gradient(to right, var(--primary-color) ${pageViews}%, var(--light-grayish-blue) ${pageViews}%)`,
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex min-h-screen flex-col items-center bg-very-pale-blue p-0 relative" style={{ backgroundColor: "var(--bg-color)" }}>

        {/* Dark Mode Toggle Button */}
        <button
          className="absolute w-24 h-9 top-5 right-5 md:right-16 bg-gray-700 dark:bg-gray-500 rounded-full text-white dark:text-black text-sm font-medium"
          onClick={toggleDarkMode}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        
        <div className={`${darkMode ? styles['dark-background-container'] : styles['background-container']} mt-16`}>
          
          {/* Header */}
          <header className="text-center mb-14 z-30">
            <h1 className="text-xl md:text-3xl font-bold mb-2 text-dark-desaturated-blue dark:text-gray-300">
              Simple, traffic-based pricing
            </h1>
            <p className="text-base w-52 m-auto md:w-full" style={{ color: "var(--text-color)", fontSize: "15px" }}>
              Sign-up for our 30-day trial. No credit card required.
            </p>
          </header>
           
          {/* Pricing Box */}
          <div className={styles['pricing-box']} style={{ backgroundColor: "var(--secondary-bg-color)" }}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 w-full max-w-md mx-auto p-4 rounded-lg mb-6 grid-flow-row-dense">
              <label className="text-gray-400 font-bold text-sm md:text-base col-span-1 md:col-span-2 mb-3 md:mt-3 flex flex-row justify-center md:justify-start items-center">
                {pageViews}K <span className="ml-1">PAGEVIEWS</span>
              </label>

              <input
                type="range"
                min="0"
                max="100"
                value={pageViews}
                onChange={handleSliderChange}
                style={sliderBackgroundStyle}
                className="col-span-1 md:col-span-5 w-full h-2 rounded-lg appearance-none cursor-pointer flex flex-row justify-center items-center"
              />
              
              <h2 className="text-gray-400 col-span-1 md:col-span-3 mb-3 md:mb-3 flex flex-row justify-center items-center md:justify-end mt-4">
                <span className="text-4xl font-bold text-dark-desaturated-blue dark:text-gray-300">${getPrice()}</span> / month
              </h2>
            </div>
            
             {/* Billing Toggle */}
           <div className="billing-toggle flex justify-center gap-2 md:gap-3 md:mt-5">
               <div className="flex items-center space-x-1 md:space-x-2">
                <span className={`${isYearly ? "text-gray-400 dark:text-gray-600" : "text-gray-600 dark:text-gray-400 font-semibold"} text-xs md:text-base`}>
                Monthly Billing
               </span>

               <div
             onClick={() => setIsYearly(!isYearly)}
              className="w-10 h-5 md:w-12 md:h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 bg-light-grayish-blue dark:bg-blue-950"
                 >
             <div className={`bg-white dark:bg-black w-3 h-3 md:w-4 md:h-4 rounded-full shadow-md transform transition-transform duration-300 ${isYearly ? 'translate-x-5 md:translate-x-6' : 'translate-x-0'}`}></div>
             </div>

                 <span className={`${isYearly ? "text-gray-600 dark:text-gray-400 font-semibold" : "text-gray-400 dark:text-gray-600"} text-xs md:text-base`}>
            Yearly Billing 
                 <span className="ml-1 text-[0.6rem] md:text-xs bg-light-grayish-red text-light-red dark:bg-red-950 dark:text-red-300 px-1 py-0.5 rounded-lg">
             -25%
                </span>
             </span>
           </div>
         </div>

            {/* Features List and CTA Button */}
            <div className="flex flex-col md:flex-row justify-center items-center md:justify-between mt-12 text-sm">
            <ul className="features flex flex-col items-center md:items-start space-y-4">
                {["Unlimited websites", "100% data ownership", "Email reports"].map((feature, index) => (
                  <li key={index} style={{ color: "var(--text-color)" }}>
                    <Image src="/images/icon-check.svg" alt="check" width={16} height={12} className="mr-2 inline-block" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="ctaBtn dark:bg-blue-950 mt-9 md:mt-0 px-2">
                Start my trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingComponent;
