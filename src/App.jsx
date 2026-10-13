import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { WhatsAppButton } from './components/layout/WhatsAppButton';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Eyeglasses } from './pages/Eyeglasses';
import { Sunglasses } from './pages/Sunglasses';
import { ContactLenses } from './pages/ContactLenses';
import { Accessories } from './pages/Accessories';
import { ProductDetail } from './pages/ProductDetail';
import { Wishlist } from './pages/Wishlist';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Account } from './pages/Account';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { VerifyEmail } from './pages/VerifyEmail';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { TrackOrder } from './pages/TrackOrder';
import { FAQs } from './pages/FAQs';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { ReturnsPolicy } from './pages/ReturnsPolicy';
import { NotFound } from './pages/NotFound';

// Automatically scroll to top on route change
function ScrollToTop() {
  const {
    pathname
  } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);
  return null;
}
export default function App() {
  return <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <ScrollToTop />
              <div className="flex flex-col min-h-screen bg-white text-[#2B2F33] selection:bg-[#E4232C]/10 selection:text-[#E4232C]">
                {/* Global Navigation Header */}
                <Header />

              {/* Page Route Router */}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/eyeglasses" element={<Eyeglasses />} />
                  <Route path="/sunglasses" element={<Sunglasses />} />
                  <Route path="/contact-lenses" element={<ContactLenses />} />
                  <Route path="/accessories" element={<Accessories />} />
                  <Route path="/product/:productSlug" element={<ProductDetail />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  
                  {/* Authentication & User Account */}
                  <Route path="/account" element={<ProtectedRoute>
                        <Account />
                      </ProtectedRoute>} />
                  <Route path="/orders" element={<Account />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/create-account" element={<SignUp />} />
                  <Route path="/register" element={<SignUp />} />
                  <Route path="/verify-email" element={<VerifyEmail />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />

                  {/* Informational & Support Pages */}
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/track-order" element={<TrackOrder />} />
                  <Route path="/order/:orderId" element={<TrackOrder />} />
                  <Route path="/orders/:orderId" element={<TrackOrder />} />
                  <Route path="/faqs" element={<FAQs />} />

                  {/* Legal & Policies */}
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy-policy" element={<Privacy />} />
                  <Route path="/returns-policy" element={<ReturnsPolicy />} />

                  {/* Catch-all 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              {/* Global Slide-Over Cart Drawer */}
              <CartDrawer />

              {/* Floating Quick WhatsApp Optical Consultation */}
              <WhatsAppButton />

              {/* Global Footer */}
              <Footer />
            </div>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </NotificationProvider>
  </BrowserRouter>;
}