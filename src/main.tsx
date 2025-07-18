import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./app"
import Sidebar from "./components/Navigation_com/sidebar";
import Head from "./components/Navigation_com/head";
import Stats from "./components/Customer_com/Customer_stats";
// import Head_table  from "./components/head_table";
import { UserProvider } from './context/login_context';
import Table_content from "./components/Customer_com/Customer_table";
// import Table_footer from "./components/Customer_com/customer_table_footer";

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <UserProvider>
      <App />
    </UserProvider>

  </StrictMode>,
)
