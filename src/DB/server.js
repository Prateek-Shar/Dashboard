import Connect from "./Connect/db.js"
import express from "express"
import Customer from "../DB/schema/customers.js"
import Product from "./schema/products.js"
import Income from "./schema/income.js"
import User from "./schema/users.js"
import cors from "cors"
import { setUser } from "../MiddleWare/sessions.js"
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';
import getSessionInfo from "../MiddleWare/auth.js"
import Session from "./schema/session.js"

const app = express()
const port = 8080;

app.use(express.json());
app.use(cors({
  origin : "http://localhost:5173",
  credentials : true,
}));
app.use(cookieParser());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// app.use(express.static(path.join(__dirname, '../Pages')));


// app.listen(port , () => {
//     Connect();
//     console.log(`Localhost is running at http://localhost:${port}`)
// })




// const customers = [ 
//   {
//     UserID : 101,
//     Name : "Harsh",
//     Company_name : "Meta",
//     Contact_no : 1256936832,
//     Email : "ghi@gmail.com",
//     Country : "India",
//     Status : "Active",
//     Date_created : new Date()
//   },

//   {
//     UserID : 102,
//     Name : "Prateek",
//     Company_name : "Google",
//     Contact_no : 9087123658,
//     Email : "hji@gmail.com",
//     Country : "India",
//     Status : "Active",
//     Date_created : new Date()
//   }, 

//   {
//     UserID: 103,
//     Name: "Suyash",
//     Company_name: "Accemture",
//     Contact_no: 9876574325,
//     Email: "slk@gmail.com",
//     Country: "India",
//     Status: "Inactive",
//     Date_created : new Date()
//   },

//   {
//     UserID: 104,
//     Name: "Tejas",
//     Company_name: "Delloite",
//     Contact_no: 9875789011,
//     Email: "lio@gmail.com",
//     Country: "India",
//     Status: "Inactive",
//     Date_created : new Date()
//   },

//   {
//     UserID: 105,
//     Name: "Rishabh",
//     Company_name: "Applus",
//     Contact_no: 9876521432,
//     Email: "ajl@gmail.com",
//     Country: "India",
//     Status: "Inactive",
//     Date_created : new Date()
//   }, 

//   {
//     UserID : 106,
//     Name : "Pawan",
//     Company_name : "Wipro",
//     Contact_no : 9087542310,
//     Email : "iop@gmail.com",
//     Country : "Swedan",
//     Status : "Active",
//     Date_Created : new Date()
//   }, 

//   {
//     UserID : 107,
//     Name : "Jayesh",
//     Company_name : "Capgemini",
//     Contact_no : 9845672351,
//     Email : "wop@ghmail.com",
//     Country : "India",
//     Status : "Inactive",
//     Date_Created : new Date()
//   },

//   {
//     UserID : 108,
//     Name : "Ayshman",
//     Company_name : "De-Shaw",
//     Contact_no : 8097652415,
//     Email : "tyu@gmail.com",
//     Country : "India",
//     Status : "Active",
//     Date_Created : new Date()
//   },

// ];

const Income_dummy = [
  {
    Created_at: new Date("2025-07-20"),
    Source: "Online Sales",
    Amount: 3000,
    Catagory: "Grocery",
    Date : new Date()
  },
  {
    Created_at: new Date("2025-07-10"),
    Source: "COD",
    Amount: 1500,
    Catagory: "Subscription",
    Date : new Date()
  },

  {
    Created_at: new Date(),
    Source: "Online Sales",
    Amount: 5000,
    Catagory: "Games",
    Date : new Date()
  },
  {
    Created_at: new Date(),
    Source: "COD",
    Amount: 50000,
    Catagory: "Gaming Console",
    Date : new Date()
  },
  {
    Created_at: new Date(),
    Source: "COD",
    Amount: 2800,
    Catagory: "Salary",
    Date : new Date()
  }
]


// const Products = [
  
//   {
//     P_id : 101,
//     Product_name : "Colgate",
//     Product_price : 200,
//     Product_catagory :  "Daily Use",
//     Product_quantity : 10
//   },

//   {
//     P_id : 102,
//     Product_name : "Monoply",
//     Product_price : 500,
//     Product_catagory : "Toys",
//     Product_quantity : 5
//   }, 

//   {
//     P_id : 103,
//     Product_name : "Taps",
//     Product_price : 1200,
//     Product_catagory : "Sanitary",
//     Product_quantity : 100
//   },

//   {
//     P_id : 104,
//     Product_name : "GTA VI",
//     Product_price : 10000,
//     Product_catagory : "Video Game",
//     Product_quantity : 2
//   },

//   {
//     P_id : 105,
//     Product_name : "Cyberpunk",
//     Product_price : 2000,
//     Product_catagory : "Video Game",
//     Product_quantity : 0
//   }


// ]




// Server Set Up Route - 
app.listen(port, async () => {
  await Connect();
  console.log(`Server running at http://localhost:${port}`);

  // try {
  //   const alreadyExists = await Income.countDocuments();
  //   if (alreadyExists === 0) {
  //     const inserted = await Income.insertMany(Income_dummy);
  //   } else {
  //     console.log("Customers already exist in DB.");
  //   }
  // } catch (err) {
  //   console.error("Insertion error:", err.message);
  // }
});




// Product Routes - 
app.get("/get_products" , getSessionInfo , async(req , res) => {

  const UID = req.user;

  try { 
    const response = await Product.find({ UID }).select("-_id -__v") 
    res.status(200).json({product_det : response})
  }

 catch(error) {
  console.log("Error : " , error);
  res.status(500).json({ message: "Internal Server Error" });
  }
})


app.get("/product_stats" ,  getSessionInfo , async(req , res) => {

  const UID = req.userID;

  try {
    const response1 = await Product.countDocuments({"Product_quantity" : {$gt : 0} , UID})
    const response2 = await Product.countDocuments({"Product_quantity" : 0 , UID})
    const response3 = await Product.countDocuments({UID})
    res.status(200).json({product_stats1 : response1 , product_stats2 : response2 , product_stats3 : response3})
  }

  catch(error) {
    console.log("Error : " , error)
  }
})



app.post("/send_products", getSessionInfo , async (req, res) => {
  const { Product_name, Product_catagory, Product_price, Product_quantity, P_id } = req.body;
  console.log("Received Data:", req.body);

  const UID = req.userID;
  console.log(UID)

  try {
    // Check if product with the same name exists
    const existingProduct = await Product.findOne({ Product_name , UID});

    if (existingProduct) {
      // If exists, update its quantity (increase it)
      existingProduct.Product_quantity = 
        (Number(existingProduct.Product_quantity) || 0) + Number(Product_quantity);

      await existingProduct.save();

      return res.status(200).json({
        message: "Product exists. Quantity updated.",
        updated_product: existingProduct
      });
    }

    // Else create a new product
    const newProduct = await Product.create({
      Product_name,
      Product_price,
      Product_catagory,
      Product_quantity,
      P_id,
      UID
    });

    res.status(200).json({ message: "New product created.", new_entry: newProduct });

  } catch (error) {
    console.error("Error while adding/updating product:", error);
    res.status(500).json({ message: "Server error. Could not process product." });
  }
});


app.delete("/delete_product", async (req, res) => {
    try {
        const { P_id } = req.query;
        const result = await Product.deleteOne({ P_id: Number(P_id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
});


app.get("/get_product_statistics", getSessionInfo , async (req, res) => {
    const { page } = req.query;  // Correct way to get ?page=2
    const pageNumber = parseInt(page) || 1; // Default to 1 if undefined
    const pageSize = 5; // 5 items per page

    const skip = (pageNumber - 1) * pageSize;

    const UID = req.userID;

    try {
        const response = await Product.find({ UID })
            .select("-_id -__v")
            .skip(skip)
            .limit(pageSize); // limit the data to pageSize

        res.status(200).json({ stats: response });
    } catch (error) {
        console.error("Error fetching product statistics:", error);
        res.status(500).json({ error: "Failed to fetch product statistics" });
    }
});






// Customer Routes -
// app.get("/get_customers"  , async(req , res) => {

//   try { 
//     const cus_details = await Customer.find({}).limit(5)
//     res.status(200).json({details : cus_details});
//   }

//   catch (error) {
//     console.log("Error : " , error);
//     res.status(500)
//     res.json({error : "Internal server error"})
//   }
// })


// app.get("/get_customer_name_page", getSessionInfo ,async (req, res) => {
//     const { page = 1 } = req.query; // default to page 1 if not provided
//     const limit = 6; // Number of records per page

//     const UID = req.user

//     try {
//         const customers = await Customer.find({ UID })
//             .skip((page - 1) * limit) // skip previous pages
//             .limit(limit);            // limit to "limit" documents

//         const total = await Customer.countDocuments(); // total number of documents

//         res.json({
//             customers,
//             total,
//             page: Number(page),
//             totalPages: Math.ceil(total / limit)
//         });
//     } catch (error) {
//         console.error("Error fetching paginated data:", error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


app.get('/search_customer' , getSessionInfo , async (req, res) => {
    const { name } = req.query;
    console.log("Searching for customer:", name);
    const UID = req.userID
    console.log("Searching for UID number :", UID);

    try {
        const customer = await Customer.find({ Customer_name : name , UID : UID }).select("-Date_created -_id -UserID -__v"); // Case-sensitive Exact Match
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });  
    }
});


app.post("/send_customer", getSessionInfo , async (req, res) => {

  const UID = req.userID; // Ensure UID is a number
  console.log(UID)
  // const UID = 100

  const {
    Customer_name,
    Company_name,
    Contact_no,
    Country,
    Email,
    Status,
    Created_at
  } = req.body;

  // Validate after extracting
  if (!Customer_name || !Email || !Contact_no || !UID) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  console.log("UID:", UID);
  console.log("Body:", req.body);

  try {
    const result = await Customer.create({      
      UID,
      Customer_name,
      Company_name,
      Contact_no,
      Country,
      Email,
      Status,
      Created_at,
    });

    return res.status(200).json({ New_Entry: result });

    
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }
    console.error("Error while creating customer:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/get_customers" , getSessionInfo , async(req , res) => {
  const { page } = req.query;  // Correct way to get ?page=2
  const pageNumber = parseInt(page) || 1; // Default to 1 if undefined
  const pageSize = 5; // 5 items per page

  const skip = (pageNumber - 1) * pageSize;

  const UID = Number(req.userID); // <- convert to number!
  console.log("UID:", UID);

  try {
      const response = await Customer.find({ "UID" : UID })
          .select("-_id -__v -UserID -Date_created")
          .skip(skip)
          .limit(pageSize); // limit the data to pageSize

      res.status(200).json({ customer_stats: response });
  } catch (error) {
      console.error("Error fetching product statistics:", error);
      res.status(500).json({ error: "Failed to fetch product statistics" });
  }
})


// app.get("/get_customer_count", getSessionInfo , async(req , res) => {

//   const UID = req.user;

//   try {
//     const count = await Customer.countDocuments({ Name: { $exists: true } , UID});
//     res.status(200).json( {customer_count : count} )
//   }

//   catch(error) {
//     res.status(500).json({error : "Internal Server Error"})
//   }

// })


// app.get("/get_active_count" , getSessionInfo , async(req , res) => {

//   const UID = req.user;

//   try {
//     const count_active_users = await Customer.countDocuments({Status : "Active"} , UID)
//     res.status(200).json({active_count : count_active_users})
//   }

//   catch(error) {
//     res.status(500).json({error : "Internal Server Error"})
//   }
// })


app.get("/get_customer_stats" , getSessionInfo , async(req , res) => {

  const UID = Number(req.userID)
  console.log("Unique ID is : ", UID)

  const response1 = await Customer.countDocuments({"Status" : "Active" , UID})
  const response2 = await Customer.countDocuments({ UID });

  res.status(200).json({active_member : response1 , total_customer : response2 })

})




// Income Routes -
app.post("/send_income" , getSessionInfo ,  async(req , res) => {
  const UID = Number(req.userID)
  console.log(UID)

  const { Source , Amount , Catagory , Created_at } = req.body
  console.log(req.body)

  // const storeDate = new Date(Created_at).toDateString();

  try {
    const IncomeEntry = await Income.create({Created_at , Source , Amount , Catagory , UID})
    res.status(200).json({message : "Income Inserted Succesfully"})
  }

  catch(error) {
    console.log(error)
  }
})


app.get("/get_income_detail" , getSessionInfo , async(req , res) => {
  const { page } = req.query;  // Correct way to get ?page=2
  const pageNumber = parseInt(page) || 1; // Default to 1 if undefined
  const pageSize = 5; // 5 items per page

  const skip = (pageNumber - 1) * pageSize;

  const UID = Number(req.userID); // <- convert to number!
  console.log("UID:", UID);

  try {
      const response = await Income.find({UID})
        .select("-_id -__v -UserID -Date_created")
        .skip(skip)
        .limit(pageSize); // limit the data to pageSize

      res.status(200).json({ Income_stats: response });
  } catch (error) {
      console.error("Error fetching product statistics:", error);
      res.status(500).json({ error: "Failed to fetch product statistics" });
  }
})

// app.get("/getIncomeDetail", getSessionInfo , async (req, res) => {

//   const UID = Number(req.userID)
//   console.log(UID)

//   try {
//     const detail = await Income.find({ UID }).select("-_id -__v"); // cleaner, no need for `{}`
//     res.status(200).json({ Income_details: detail });

//   } catch (error) {
//     console.error("Error fetching income detail:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


app.get("/get_data_by_month", getSessionInfo, async (req, res) => {
  const UID = Number(req.userID);
  console.log("UID:", UID);

  // Start of current month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  // Start of next month
  const startOfNextMonth = new Date(startOfMonth);
  startOfNextMonth.setMonth(startOfMonth.getMonth() + 30);

  // console.log("Month Data From:", startOfMonth);
  // console.log("To:", startOfNextMonth);

  try {
    const response = await Income.find({
      Created_at: { $gte: startOfMonth, $lt: startOfNextMonth },
      UID
    }).select("-_id -__v -Created_at -Source -Date");

    res.status(200).json({ detail: response });
  } catch (error) {
    console.error("Error fetching monthly data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.get("/get_data_daily", getSessionInfo, async (req, res) => {
  const UID = Number(req.userID);
  console.log("UID:", UID);

  // Get start of today
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  // Get end of today
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  console.log("Fetching daily data from:", startOfToday, "to", endOfToday);

  try {
    const response = await Income.find({
      Created_at: { $gte: startOfToday, $lt: endOfToday },
      UID
    }).select("-_id -__v -Source -Date");

    res.status(200).json({ detail: response });
    console.log(response);
  } catch (error) {
    console.error("Error fetching daily data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




app.get("/get_data_by_year", getSessionInfo, async (req, res) => {
  const UID = Number(req.userID);
  console.log("UID:", UID);

  // Start of current month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  // Start of next month
  const startOfNextMonth = new Date(startOfMonth);
  startOfNextMonth.setMonth(startOfMonth.getMonth() + 365);

  // console.log("Month Data From:", startOfMonth);
  // console.log("To:", startOfNextMonth);

  try {
    const response = await Income.find({
      Created_at: { $gte: startOfMonth, $lt: startOfNextMonth },
      UID
    }).select("-_id -__v -Created_at -Source -Date");

    res.status(200).json({ detail: response });
  } catch (error) {
    console.error("Error fetching monthly data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.get("/getIncomeStats", async (req, res) => {
  try {
    const now = new Date();

    // ----------- TOTAL TRANSACTIONS -----------
    const totalTransactions = await Income.countDocuments();

    // ----------- TOTAL INCOME -----------
    const totalIncomeAgg = await Income.aggregate([
      { $group: { _id: null, total: { $sum: "$Amount" } } },
    ]);
    const totalIncome = totalIncomeAgg[0]?.total || 0;

    // ----------- MONTHLY GROWTH -----------
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfPreviousMonth = startOfCurrentMonth;

    const currentMonthIncomeAgg = await Income.aggregate([
      {
        $match: {
          Created_at: {
            $gte: startOfCurrentMonth,
            $lt: endOfCurrentMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$Amount" },
        },
      },
    ]);
    const currentIncome = currentMonthIncomeAgg[0]?.total || 0;

    const previousMonthIncomeAgg = await Income.aggregate([
      {
        $match: {
          Created_at: {
            $gte: startOfPreviousMonth,
            $lt: endOfPreviousMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$Amount" },
        },
      },
    ]);
    const previousIncome = previousMonthIncomeAgg[0]?.total || 0;

    let growth = 0;
    if (previousIncome !== 0) {
      growth = ((currentIncome - previousIncome) / previousIncome) * 100;
    } else if (currentIncome > 0) {
      growth = 100;
    }

    // ----------- TOP CATEGORY -----------
    const topCategoryAgg = await Income.aggregate([
      {
        $group: {
          _id: "$Catagory",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);
    const topCategory = topCategoryAgg[0]?._id || "N/A";

    // ----------- FINAL RESPONSE -----------
    res.status(200).json({
      Total_Income: totalIncome,
      Monthly_Growth: `${growth.toFixed(2)}%`,
      Total_Transaction: totalTransactions,
      Top_Category: topCategory,
    });
  } catch (error) {
    console.error("Error getting income stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Signup Routes -
app.post("/newUser", async (req, res) => {
  const { Username, Email, Password, Profession } = req.body;
  console.log("Received Data:", req.body);

  try {
    const existing_user = await User.find({ Username });

    if (existing_user.length > 0) {
      return res.status(400).json({
        existing_error: "Same User Found. Try creating acc. with different username"
      });
    }

    const newUser = await User.create({
      Username,
      Email,
      Password,
      Profession,
      Date_created: new Date()
    });

    console.log("New user created:", newUser);
    return res.status(201).json({ user: newUser , login_success : "User created successfully"});

  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }

});



// Login Routes
app.post("/UserCheck", async (req, res) => {
  try {
    const { Username, Password } = req.body;
    console.log("Login attempt with:", req.body);

    const userDoc = await User.findOne({ Username, Password });

    if (!userDoc) {
      console.log("User not found or invalid credentials");
      return res.status(404).json({ message: "Invalid username or password" });
    }

    console.log("User authenticated:", userDoc.Username);

    const SessionID = uuidv4();
    console.log(userDoc.UID)
    console.log("Generated UUID:", SessionID);
    

    // Insert the session
    await Session.insertOne({
      UID: userDoc.UID,
      SessionID: SessionID
    });

    // Set session cookie
    res.cookie("SessionID", SessionID, {
      maxAge: 10 * 60 * 1000, // 10 minutes
      sameSite: "Lax"
    });

    // Store in in-memory session if needed
    setUser(SessionID, userDoc.UID);  

    return res.status(200).json({
      message: "Login successful",
      login_det: {
        Username: userDoc.Username,
        Profession: userDoc.Profession,
        UID: userDoc.UID
      }
    });

  } catch (err) {
    console.error("Error in login:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});




app.get("/getUserInfo", async (req, res) => {
  const sessionId = req.cookies.SessionID;

  if (!sessionId) {
    return res.status(401).json({ error: "No session cookie found" });
  }

  try {
    const session = await Session.findOne({ SessionID: sessionId });

    if (!session) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }

    const user = await User.findOne({ UID: session.UID }).select("Username Profession UID -_id");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ login_det: user });

  } catch (err) {
    console.error("Error validating session:", err);
    return res.status(500).json({ error: "Server error" });
  }
});



// Logout Route -
app.get("/logout", (req, res) => {
  res.clearCookie("SessionID");
  return res.status(200).json({ message: "Logged out" });
});






// Extra Route -
app.get("/edit_product" , async(req , res) => {
  const { keyno } = req.query;

  const response = await Product.find({ "P_id" : keyno}).select("-_id -__v")
  res.status(200).json({edit_product : response})
  res.sendFile(__dirname , "../Pages" , "NewProduct.tsx")
})










