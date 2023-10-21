import Home from "./components/Home"
import { useEffect, useState } from "react";
import Profile from "./components/Profile";
import BottomBar from "./components/BottomBar";
function App() {
  const [connected, setconnected] = useState(false);
  const [verified, setverified] = useState(false);
  const [contract, setcontract] = useState(null);
  const [provider, setprovider] = useState(null);
  const [account, setaccount] = useState("");
  const [accountDetails, setaccountDetails] = useState(null);
  useEffect(() => { }, [connected, verified]);
  return (
    <div className="bg-black text-white relative justify-start items-start flex flex-col min-h-screen px-4">
      <div className=" flex -mt-4 flex-col p-8 ">
        <Home setaccount={setaccount} setverified={setverified} setaccountDetails={setaccountDetails} connected={connected} contract={contract} account={account} setprovider={setprovider} setcontract={setcontract} setconnected={setconnected} />
      </div>
      <div className="sm:mx-12">
        {verified && <BottomBar accountDetails={accountDetails} contract={contract} />}
      </div>
    </div>
  );
}

export default App;
