import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import MangerDashboard from "./pages/Manager/ManagerDashboard";
import StaffDashboard from "./pages/Staff/StaffDashboard";
import CreateCategory from "./pages/Manager/CreateCategory";
import Profile from "./pages/user/Profile";
import Search from "./pages/Search";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import ManagerRoute from "./components/Routes/ManagerRoute";
import StaffRoute from "./components/Routes/StaffRoute";
import CreateFood from "./pages/Manager/CreateFood";
import UpdateFood from "./pages/Manager/UpdateFood";
import Menu from "./components/Layout/Menu";
import Orders from "./pages/Orders";
import CreateBranch from "./pages/Admin/CreateBranch";
import AllInvoice from "./pages/Manager/AllInvoice";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/menu" element={<Menu />} />

        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-branch" element={<CreateBranch />} />
        </Route>
        <Route path="/dashboard" element={<ManagerRoute />}>
          <Route path="manager" element={<MangerDashboard />} />
          <Route path="manager/create-category" element={<CreateCategory />} />
          <Route path="manager/create-food" element={<CreateFood />} />
          <Route path="manager/food/:slug" element={<UpdateFood />} />
          <Route path="manager/allInvoice" element={<AllInvoice />} />
        </Route>
        <Route path="/dashboard" element={<StaffRoute />}>
          <Route path="staff" element={<StaffDashboard />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
