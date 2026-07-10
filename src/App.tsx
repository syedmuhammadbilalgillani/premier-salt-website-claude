import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

import Home from "@/routes/Home";
import About from "@/routes/About";
import Manufacturing from "@/routes/Manufacturing";
import QualityCertifications from "@/routes/QualityCertifications";
import ExportCapabilities from "@/routes/ExportCapabilities";
import Sustainability from "@/routes/Sustainability";
import Products from "@/routes/Products";
import PrivateLabeling from "@/routes/PrivateLabeling";
import AboutHimalayanSalt from "@/routes/AboutHimalayanSalt";
import CategoryPage from "@/routes/CategoryPage";
import Brands from "@/routes/Brands";
import BrandDetail from "@/routes/BrandDetail";
import Shop from "@/routes/Shop";
import ProductDetail from "@/routes/ProductDetail";
import Cart from "@/routes/Cart";
import Checkout from "@/routes/Checkout";
import OrderConfirmation from "@/routes/OrderConfirmation";
import OrderTracking from "@/routes/OrderTracking";
import Wishlist from "@/routes/Wishlist";
import MyAccount from "@/routes/MyAccount";
import MyAccountOrders from "@/routes/MyAccountOrders";
import FAQ from "@/routes/FAQ";
import Blog from "@/routes/Blog";
import BlogPost from "@/routes/BlogPost";
import Downloads from "@/routes/Downloads";
import NewsEvents from "@/routes/NewsEvents";
import Contact from "@/routes/Contact";
import RequestQuote from "@/routes/RequestQuote";
import Wholesale from "@/routes/Wholesale";
import Search from "@/routes/Search";
import PolicyPage from "@/routes/PolicyPage";
import NotFound from "@/routes/NotFound";

const b2bRoutes = [
  "edible-gourmet-salts",
  "salt-lamps-decorative-salt-products",
  "natural-salt-lamps",
  "crafted-salt-lamps",
  "salt-basket-lamps",
  "usb-salt-lamps",
  "night-lights",
  "candle-holders",
  "oil-burners",
  "foot-detox-salt-lamps",
  "grill-plates-slabs",
  "grill-plates-slabs/cooking-plates",
  "grill-plates-slabs/serving-plates",
  "tiles-bricks-blocks",
  "tiles-bricks-blocks/salt-tiles",
  "tiles-bricks-blocks/salt-bricks-blocks",
  "salt-licks-bars",
  "salt-products-for-spa-bath",
  "salt-bars",
  "salt-for-industrial-uses",
];

const policyRoutes = [
  "privacy-policy",
  "terms-conditions",
  "shipping-delivery",
  "returns-refunds",
  "payment-policy",
  "cookie-policy",
  "damaged-products",
];

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="manufacturing" element={<Manufacturing />} />
          <Route path="quality-certifications" element={<QualityCertifications />} />
          <Route path="export-capabilities" element={<ExportCapabilities />} />
          <Route path="sustainability" element={<Sustainability />} />
          <Route path="products" element={<Products />} />
          <Route path="private-labeling" element={<PrivateLabeling />} />
          <Route path="about-himalayan-salt" element={<AboutHimalayanSalt />} />

          {b2bRoutes.map((slug) => (
            <Route key={slug} path={slug} element={<CategoryPage />} />
          ))}

          <Route path="brands" element={<Brands />} />
          <Route path="brands/:brandSlug" element={<BrandDetail />} />

          <Route path="shop" element={<Shop />} />
          <Route path="shop/product/:productSlug" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="order-tracking" element={<OrderTracking />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="my-account" element={<MyAccount />} />
          <Route path="my-account/orders" element={<MyAccountOrders />} />

          <Route path="faq" element={<FAQ />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:postSlug" element={<BlogPost />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="news-events" element={<NewsEvents />} />

          <Route path="contact" element={<Contact />} />
          <Route path="request-a-quote" element={<RequestQuote />} />
          <Route path="wholesale-distributor" element={<Wholesale />} />

          <Route path="search" element={<Search />} />

          {policyRoutes.map((slug) => (
            <Route key={slug} path={slug} element={<PolicyPage />} />
          ))}

          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
