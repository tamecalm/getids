import Admin from "../models/adminModel.js";

export const login = async (req, res) => {
  const { id } = req.body;
  try {
    const admin = await Admin.findOne({ id });
    if (admin) {
      res.send(`Admin with ID ${id} logged in`);
    } else {
      res.status(404).send("Admin not found");
    }
  } catch {
    res.status(500).send("Server error");
  }
};

export const logout = async (req, res) => {
  const { id } = req.body;
  try {
    const admin = await Admin.findOne({ id });
    if (admin) {
      res.send(`Admin with ID ${id} logged out`);
    } else {
      res.status(404).send("Admin not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const create = async (req, res) => {
  const { id, name } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ id });
    if (existingAdmin) {
      res.status(400).send("Admin already exists");
    } else {
      const newAdmin = new Admin({ id, name });
      await newAdmin.save();
      res.send(`Admin with ID ${id} created`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const deleteAdmin = async (req, res) => {
  const { id } = req.body;
  try {
    const admin = await Admin.findOneAndDelete({ id });
    if (admin) {
      res.send(`Admin with ID ${id} deleted`);
    } else {
      res.status(404).send("Admin not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const update = async (req, res) => {
  const { id, name } = req.body;
  try {
    const admin = await Admin.findOneAndUpdate({ id }, { name }, { new: true });
    if (admin) {
      res.send(`Admin with ID ${id} updated`);
    } else {
      res.status(404).send("Admin not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const read = async (res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
