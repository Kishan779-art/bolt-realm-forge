import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RealmProvider } from "@/contexts/RealmContext";
import { RealmHeader } from "@/components/layout/RealmHeader";
import RealmMap from "./pages/RealmMap";
import MindZone from "./pages/zones/MindZone";
import TaskZone from "./pages/zones/TaskZone";
import FocusZone from "./pages/zones/FocusZone";
import TimeZone from "./pages/zones/TimeZone";
import ZenZone from "./pages/zones/ZenZone";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RealmProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <RealmHeader />
            <Routes>
              <Route path="/" element={<RealmMap />} />
              <Route path="/zone/mind" element={<MindZone />} />
              <Route path="/zone/task" element={<TaskZone />} />
              <Route path="/zone/focus" element={<FocusZone />} />
              <Route path="/zone/time" element={<TimeZone />} />
              <Route path="/zone/zen" element={<ZenZone />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </RealmProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
