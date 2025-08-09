// MongoDB initialization script
db = db.getSiblingDB('{{name}}');

// Create collections
db.createCollection('users');
db.createCollection('posts');

// Create indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.posts.createIndex({ "authorId": 1 });

// Insert sample data
db.users.insertOne({
  email: "admin@{{name}}.com",
  name: "Admin User",
  role: "admin",
  createdAt: new Date()
});

db.posts.insertOne({
  title: "Welcome to {{name}}",
  content: "This is your first post!",
  authorId: db.users.findOne()._id,
  createdAt: new Date()
});

print("MongoDB initialized successfully!");
