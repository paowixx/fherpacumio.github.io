import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SearchAndFilterResults from './pages/search-and-filter-results';
import UserProfileAndSettings from './pages/user-profile-and-settings';
import EventCalendarAndActivities from './pages/event-calendar-and-activities';
import DestinationDetailPage from './pages/destination-detail-page';
import InteractiveMapDashboard from './pages/interactive-map-dashboard';
import ReviewsAndRatingsManagement from './pages/reviews-and-ratings-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DestinationDetailPage />} />
        <Route path="/search-and-filter-results" element={<SearchAndFilterResults />} />
        <Route path="/user-profile-and-settings" element={<UserProfileAndSettings />} />
        <Route path="/event-calendar-and-activities" element={<EventCalendarAndActivities />} />
        <Route path="/destination-detail-page" element={<DestinationDetailPage />} />
        <Route path="/interactive-map-dashboard" element={<InteractiveMapDashboard />} />
        <Route path="/reviews-and-ratings-management" element={<ReviewsAndRatingsManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
