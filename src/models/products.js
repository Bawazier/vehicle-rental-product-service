const db = require("../config/database");


const CREATE_QUERY = "INSERT INTO Vehicles (userId, categoryId, name, location, price, status, prepayment, capacity, quantity, description)" +
  "VALUES (?,?,?,?,?,?,?,?,?,?)";
const GET_BYID_QUERY = "SELECT * FROM Vehicles WHERE id = ?";
const GET_ALL_QUERY = "SELECT * FROM Vehicles";
const GET_USER_PRODUCTS_QUERY = "SELECT * FROM Vehicles WHERE userId = ?";
const UPDATE_QUERY = "UPDATE Vehicles SET categoryId = ?, name = ?, location = ?, price = ?," +
  "status = ?, prepayment = ?, capacity = ?, quantity = ?, description = ?, updatedAt = ? WHERE id = ? AND userId = ?";
const DELETE_QUERY = "DELETE FROM Vehicles WHERE id = ?";

module.exports = {
  createProduct: async (data) => {
    try{
      const [rows] = await (await db).query(CREATE_QUERY, 
        [data.userId, data.categoryId, data.name, data.location, data.price, data.status,
          data.prepayment, data.capacity, data.quantity, data.description]);
      return rows;
    }catch(error){
      return error;
    }
  },

  updateProduct: async (id, userId, data) => {
    try {
      const [rows] = await (await db).query(
        UPDATE_QUERY,
        [
          data.categoryId,
          data.name,
          data.location,
          data.price,
          data.status,
          data.prepayment,
          data.capacity,
          data.quantity,
          data.description,
          data.updatedAt,
          id,
          userId,
        ]);
      return rows;
    } catch (error) {
      return error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const [rows] = await (await db).query(DELETE_QUERY, [id]);
      return rows;
    } catch (error) {
      return error;
    }
  },

  getProductById: async (id) => {
    try {
      const [rows] = await (await db).query(GET_BYID_QUERY, [id]);
      return rows;
    } catch (error) {
      return error;
    }
  },

  getProducts: async () => {
    try {
      const [rows] = await (await db).query(GET_ALL_QUERY);
      return rows;
    } catch (error) {
      return error;
    }
  },

  getUserProducts: async (userId) => {
    try {
      const [rows] = await (await db).query(
        GET_USER_PRODUCTS_QUERY, [userId]);
      return rows;
    } catch (error) {
      return error;
    }
  },
};
