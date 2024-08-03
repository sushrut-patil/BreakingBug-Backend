const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware.js");

// const {
//     sellerRegister,
//     sellerLogIn
// } = require('../controllers/orderController.js');
// here the file name is wrong for seller controllers
const {
  sellerRegister,
  sellerLogIn,
} = require("../controllers/sellerController.js");

const {
  productCreate,
  getProducts,
  getProductDetail,
  searchProduct, //Added searchProduct 
  searchProductbySubCategory, //Added searchProductbySubCategory 
  searchProductbyCategory,
  getSellerProducts,
  updateProduct,
  deleteProduct,
  deleteProducts,
  deleteProductReview,
  deleteAllProductReviews,
  addReview,
  getInterestedCustomers,
  getAddedToCartProducts,
} = require("../controllers/productController.js");

const {
  customerRegister,
  customerLogIn,
  getCartDetail,
  // Changed the method name to more accurate one
  shippingDataUpdate,
} = require("../controllers/customerController.js");

const {
  newOrder,
  getOrderedProductsBySeller,
  getOrderedProductsByCustomer,
} = require("../controllers/orderController.js");

// Seller
router.post("/SellerRegister", sellerRegister);
router.post("/SellerLogin", sellerLogIn);

// Product
router.post("/ProductCreate", productCreate);
router.get("/getSellerProducts/:id", getSellerProducts);
router.get("/getProducts", getProducts);
router.get("/getProductDetail/:id", getProductDetail);
router.get("/getInterestedCustomers/:id", getInterestedCustomers);
router.get("/getAddedToCartProducts/:id", getAddedToCartProducts);

router.put("/ProductUpdate/:id", updateProduct);
router.put("/addReview/:id", addReview);

router.get("/searchProduct/:key", searchProduct); //Fixed Proper Method call
router.get("/searchProductbyCategory/:key", searchProductbyCategory);
router.get("/searchProductbySubCategory/:key", searchProductbySubCategory); //Fixed Proper Method call

router.delete("/DeleteProduct/:id", deleteProduct);
router.delete("/DeleteProducts/:id", deleteProducts);
router.put("/deleteProductReview/:id", deleteProductReview); //Changed method to put from delete
router.delete("/deleteAllProductReviews/:id", deleteAllProductReviews); //changed method to delete

// Customer
router.post("/CustomerRegister", customerRegister);
router.post("/CustomerLogin", customerLogIn);
router.get("/getCartDetail/:id", getCartDetail);
// matched the method here
router.put("/CustomerUpdate/:id", shippingDataUpdate);

// Order
router.post("/newOrder", newOrder);
router.get("/getOrderedProductsByCustomer/:id", getOrderedProductsByCustomer);
router.get("/getOrderedProductsBySeller/:id", getOrderedProductsBySeller);

// there was no export of router
module.exports = router;
