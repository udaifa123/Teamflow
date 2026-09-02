import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || "db",   // 🔥 docker service name
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "teamflow",
});

// retry connection (docker fix)
const connectDB = async () => {
  let retries = 10;

  while (retries) {
    try {
      await pool.query("SELECT 1"); // ✅ better than pool.connect()
      console.log("✅ DB Connected");
      break;
    } catch (err) {
      console.log("⏳ Waiting for DB...");
      retries--;
      await new Promise((res) => setTimeout(res, 3000));
    }
  }

  if (retries === 0) {
    console.error("❌ Could not connect to DB");
    process.exit(1);
  }
};

connectDB();

export default pool;