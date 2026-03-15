import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GameProvider, useGame } from "./contexts/GameContext";
import MapPage from "./pages/MapPage";
import LessonPage from "./pages/LessonPage";
import LockerPage from "./pages/LockerPage";
import OnboardingPage from "./pages/OnboardingPage";

function AppRouter() {
  const { player, setPlayerName } = useGame();
  const [, navigate] = useLocation();

  // Show onboarding if player hasn't set a name yet (default is 'Explorer')
  const isNewPlayer = player.name === 'Explorer' && player.completedLessons.length === 0 && player.xp === 0;

  if (isNewPlayer) {
    return (
      <OnboardingPage
        onComplete={() => {
          // Navigate to map after onboarding
          navigate('/');
        }}
      />
    );
  }

  return (
    <Switch>
      <Route path="/" component={MapPage} />
      <Route path="/lesson/:id" component={LessonPage} />
      <Route path="/locker" component={LockerPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <GameProvider>
          <TooltipProvider>
            <Toaster />
            <AppRouter />
          </TooltipProvider>
        </GameProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
