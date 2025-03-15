import express, { Request, Response, RequestHandler } from "express";
import path from "path";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const app = express();

// Middleware'ler
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Statik dosyaları sun (public klasörü)
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// CSRF ve Rate Limiting
const csrfProtection = csrf({ cookie: true }) as unknown as RequestHandler;
app.use(csrfProtection);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // 100 istek
});
app.use(limiter);

// Helmet ile CSP ayarlarını gevşet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'", // Inline script'lere izin ver
          "https://cdn.jsdelivr.net", // Popper.js ve Bootstrap JS için
          "https://code.jquery.com", // jQuery için
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'", // Inline stil'lere izin ver
          "https://cdn.jsdelivr.net", // Bootstrap CSS için
          "https://cdnjs.cloudflare.com", // Font Awesome için
        ],
        connectSrc: [
          "'self'",
          "http://localhost:3000", // json-server için
        ],
        imgSrc: ["'self'"],
        fontSrc: ["'self'", "https://cdnjs.cloudflare.com"], // Font Awesome için
      },
    },
  })
);

// Rotalar
app.get("/", (req: Request, res: Response) => res.render("index", { csrfToken: req.csrfToken() }));
app.get("/blog", (req: Request, res: Response) => res.render("blog", { csrfToken: req.csrfToken() }));
app.get("/blog/:id", (req: Request, res: Response) => res.render("blog_detail", { csrfToken: req.csrfToken() }));
app.get("/register", (req: Request, res: Response) => res.render("register", { csrfToken: req.csrfToken() }));
app.get("/login", (req: Request, res: Response) => res.render("login", { csrfToken: req.csrfToken() }));
app.get("/todo", (req: Request, res: Response) => res.render("todo", { csrfToken: req.csrfToken() }));

// Sunucuyu başlat
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});