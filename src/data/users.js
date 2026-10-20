// Predefined demo users (no backend).
// Passwords are stored as SHA-256 hashes (encoded), never as plain text.
// The role is detected automatically from the account at login.
export const ROLES = {
  admin: { label: "Admin", path: "/admin" },
  manager: { label: "Incident Manager", path: "/manager" },
  engineer: { label: "Support Engineer", path: "/engineer" },
  viewer: { label: "Business Viewer", path: "/viewer" },
};

export const USERS = [
  { id: 1, name: "Asha Rao", email: "admin@demo.com", passwordHash: "7676aaafb027c825bd9abab78b234070e702752f625b752e55e55b48e607e358", role: "admin" },
  { id: 2, name: "Vikram Shah", email: "manager@demo.com", passwordHash: "324d52ea400e79ae65163f0b369e295c4993d26204c66317ee8e53f31ae003e3", role: "manager" },
  { id: 3, name: "Neha Iyer", email: "engineer@demo.com", passwordHash: "28fc261a9e012a8465fcba0d03f1fa8ccd3089fce9e4687a40c6d3b63c68b5f9", role: "engineer" },
  { id: 4, name: "Rohan Mehta", email: "user@demo.com", passwordHash: "dcb694aa0322f143ed970e275c807bf123bd5db4f73140b94ccc757f42dc8043", role: "viewer" },
];
