import { Switch, Route, Router } from "wouter";
import { useBrowserLocation } from "wouter/use-browser-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import Journeys from "@/pages/Destinations";
import JourneyDetail from "@/pages/DestinationDetail";
import Stories from "@/pages/Blog";
import StoryDetail from "@/pages/PostDetail";
import Mission from "@/pages/About";
import PlanJourney from "@/pages/Contact";
import { useEffect } from "react";
import { useLocation } from "wouter";

const useNormalizedLocation = () => {
  const [location, navigate] = useBrowserLocation();
  const normalized = location.length > 1 ? location.replace(/\/+$/, "") : location;
  return [normalized, navigate] as ReturnType<typeof useBrowserLocation>;
};

function ScrollToTop() {
  const [pathname] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navigation />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/journeys" component={Journeys} />
          <Route path="/journeys/:slug" component={JourneyDetail} />
          <Route path="/stories" component={Stories} />
          <Route path="/stories/:slug" component={StoryDetail} />
          <Route path="/mission" component={Mission} />
          <Route path="/plan" component={PlanJourney} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router hook={useNormalizedLocation}>
          <AppRoutes />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
