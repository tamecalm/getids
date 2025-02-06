import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;