import Role from "../models/roleModel.js";

export const authorizeRole = (...allowedRoles) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    try {
      // Fetch the user's role from the database using the role ID
      const role = await Role.findById(req.user.role);
      if (!role) {
        return res.status(403).json({ message: "Role not found" });
      }

      // Check if the role name is included in the allowed roles
      if (!allowedRoles.includes(role.name)) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      next();
    } catch (error) {
      console.error("Error in role authorization:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};
