import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customer_page from "./Pages/Customer";
import Products from "./Pages/Product"
import Add_Product from "./Pages/Add_Product";
import Sidebar from "./components/Navigation_com/sidebar";
import Add_Customer from "./Pages/Add_Customer";
import Income from "./Pages/Income";
import Layout from "./layout";
import Add_Income from "./Pages/Add_Income";
import Login_Register from "./Pages/Login_Register";
import ProtectedRoute from "./ProtectedRoute"

const App = () => {
    
    return (    
    
    <Router>
        <Layout>
            <Routes>

                <Route path="/" element={<Login_Register />} />

                <Route
                    path="/customer"
                    element={
                    <ProtectedRoute>
                        <Customer_page />
                    </ProtectedRoute>
                    }
                />
                <Route
                    path="/products"
                    element={
                    <ProtectedRoute>
                        <Products />
                    </ProtectedRoute>
                    }
                />
                <Route
                    path="/addProduct"
                    element={
                    <ProtectedRoute>
                        <Add_Product />
                    </ProtectedRoute>
                    }
                />
                <Route
                    path="/Income"
                    element={
                    <ProtectedRoute>
                        <Income />
                    </ProtectedRoute>
                    }
                />
                <Route
                    path="/addIncome"
                    element={
                    <ProtectedRoute>
                        <Add_Income />
                    </ProtectedRoute>
                    }
                />

                <Route
                    path="/addCustomer"
                    element={
                    <ProtectedRoute>
                        <Add_Customer/>
                    </ProtectedRoute>
                    }
                />
                
            </Routes>
        </Layout>       
    </Router>
        
    )
}

export default App;