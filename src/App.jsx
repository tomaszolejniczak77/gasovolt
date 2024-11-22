import "./App.css";
import Gas from "./components/main/Gas/Gas";
import Nav from "./components/layout/Nav";
import GasForm from "./components/ui/GasForm";
import GasChart from "./components/ui/GasChart";
import PowerForm from "./components/ui/PowerForm";
import PowerChart from "./components/ui/PowerChart";
import Electricity from "./components/main/Electricity/Electricity";
import Footer from "./components/layout/Footer";
import { useContext } from "react";
import { NavContext } from "./context/NavContext";

function App() {
  const { isGasFormOpen, isPowerFormOpen } = useContext(NavContext);

  return (
    <>
      <div className="container">
        <div className="header">
          <Nav />
        </div>

        <div className="main">
          <div className="main1">
            <div className="div1">
              {isGasFormOpen ? <GasForm /> : <GasChart />}
            </div>
            <div className="div1">
              {isPowerFormOpen ? <PowerForm /> : <PowerChart />}
            </div>
          </div>

          <div className="main2">
            <div className="div2">
              <Gas />
            </div>
            <div className="div2">
              <Electricity />
            </div>
          </div>
        </div>

        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
