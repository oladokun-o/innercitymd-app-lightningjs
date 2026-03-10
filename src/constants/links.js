import Doctors from "../pages/Doctors";
import Home from "../pages/Home";
import LiveTv from "../pages/Livetv";
import Ondemand from "../pages/Ondemand";
import Telemedicine from "../pages/Telemedicine";

export const MENU_ITEMS = [
  { path: "home", component: Home, ref: "Item0", label: "Home" },
  { path: "doctors", component: Doctors, ref: "Item1", label: "Doctors" },
  { path: "livetv", component: LiveTv, ref: "Item2", label: "Live TV" },
  { path: "ondemand", component: Ondemand, ref: "Item3", label: "On Demand" },
  { path: "telemedicine", component: Telemedicine, ref: "Item4", label: "Telemedicine" }
];
