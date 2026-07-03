import { PHASES } from '../data/constants.js';
import { Card } from '../components/ui.jsx';
import { CollectionScreen, DisplaySetupScreen, LocationScreen, RouteConfirmScreen, VanLoadoutScreen, WeatherScreen, WholesalerScreen } from './SetupScreens.jsx';
import TradingScreen from './TradingScreen.jsx';
import DailySummary from './DailySummary.jsx';
import WeeklySummary from './WeeklySummary.jsx';

export default function PhaseRenderer({ state, dispatch }) {
  switch (state.phase) {
    case PHASES.DAY0_ORDER:
    case PHASES.EVENING_ORDER:
      return <WholesalerScreen state={state} dispatch={dispatch} />;
    case PHASES.MORNING_COLLECTION:
      return <CollectionScreen state={state} dispatch={dispatch} />;
    case PHASES.WEATHER:
      return <WeatherScreen state={state} dispatch={dispatch} />;
    case PHASES.LOCATION_SELECTION:
      return <LocationScreen state={state} dispatch={dispatch} />;
    case PHASES.VAN_LOADOUT:
      return <VanLoadoutScreen state={state} dispatch={dispatch} />;
    case PHASES.ROUTE_CONFIRMATION:
      return <RouteConfirmScreen state={state} dispatch={dispatch} />;
    case PHASES.DISPLAY_SETUP:
      return <DisplaySetupScreen state={state} dispatch={dispatch} />;
    case PHASES.TRADING:
      return <TradingScreen state={state} dispatch={dispatch} />;
    case PHASES.DAILY_SUMMARY:
      return <DailySummary state={state} dispatch={dispatch} />;
    case PHASES.WEEKLY_SUMMARY:
      return <WeeklySummary state={state} dispatch={dispatch} />;
    default:
      return <Card><h2>Unknown phase</h2><p>{state.phase}</p></Card>;
  }
}
