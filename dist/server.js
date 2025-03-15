"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const csurf_1 = __importDefault(require("csurf"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
// Middleware'ler
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Statik dosyaları sun (public klasörü)
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
// CSRF ve Rate Limiting
const csrfProtection = (0, csurf_1.default)({ cookie: true });
app.use(csrfProtection);
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100, // 100 istek
});
app.use(limiter);
// Helmet ile CSP ayarlarını gevşet
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: [
                "'self'",
                "'unsafe-inline'",
                "https://cdn.jsdelivr.net",
                "https://code.jquery.com", // jQuery için
            ],
            styleSrc: [
                "'self'",
                "'unsafe-inline'",
                "https://cdn.jsdelivr.net",
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
}));
// Rotalar
app.get("/", (req, res) => res.render("index", { csrfToken: req.csrfToken() }));
app.get("/blog", (req, res) => res.render("blog", { csrfToken: req.csrfToken() }));
app.get("/blog/:id", (req, res) => res.render("blog_detail", { csrfToken: req.csrfToken() }));
app.get("/register", (req, res) => res.render("register", { csrfToken: req.csrfToken() }));
app.get("/login", (req, res) => res.render("login", { csrfToken: req.csrfToken() }));
app.get("/todo", (req, res) => res.render("todo", { csrfToken: req.csrfToken() }));
// Sunucuyu başlat
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});
