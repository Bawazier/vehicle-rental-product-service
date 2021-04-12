const Products = require("../models/products");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const create = await Products.createProduct(req.body);
      console.log(create);
      if (create.affectedRows > 0) {
        const newProduct = await Products.getProductById(create.insertId);

        return res.status(200).json({
          success: true,
          message: "Success create product",
          result: newProduct,
        });
      }

      return res.status(400).json({
        success: false,
        message: "Failed create product",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Server error",
      });
    }
  },

  getProducts: async (req, res) => {
    try {
      const products = await Products.getProducts();
      return res.status(200).json({
        success: true,
        message: "Success get All Products",
        results: products,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Server error",
      });
    }
  },

  getProductById: async (req, res) => {
    try {
      const products = await Products.getProductById(req.params.id);
      return res.status(200).json({
        success: true,
        message: "Success get All Products",
        results: products,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Server error",
      });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const userId = req.user.id;
      const update = await Products.updateProduct(id, userId, req.body);
      console.log(update);
      if (update.affectedRows > 0) {
        if (update.changedRows > 0) {
          const updatedProduct = await Products.getProductById(id);

          return res.json({
            success: true,
            message: "Success updated product",
            result: updatedProduct,
          });
        }

        return res.status(400).json({
          success: false,
          message: "Data yang dikirim sama",
        });
      }

      return res.status(400).json({
        success: false,
        message: "Failed update product",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Server error",
      });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const productById = await Products.getProductById(id);

      if (!productById) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      await Products.deleteProduct(req.params.id);

      return res.json({
        status: true,
        message: "Success delete product",
        result: productById,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Server error",
      });
    }
  },
};