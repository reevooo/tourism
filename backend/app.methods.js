import morgan from "morgan";
import dotenv from "dotenv";
import userRouter from "./src/modules/user/user.router.js";
import destinationRoutes from './src/modules/destination/destination.router.js'; 
import cors from "cors";
import itineraryRoutes from './src/modules/Itinerary/Itinerary.router.js';
import accommodationRoutes from "./src/modules/Accommodation/accommodation.router.js";
import touristAccommodationRouter from './src/modules/touristAccommodation/touristAccommodation.router.js';
import transportationRouter from './src/modules/transport/transport.router.js';
import touristRoutes from './src/modules/Touristtransport/Touristtransport.router.js';
import reviewRoutes from './src/modules/reviews/reviews.router.js';
dotenv.config();

export const appMethods = (app, express) => {
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(cors());
     app.use("/apis/user", userRouter);
     app.use('/api/destinations', destinationRoutes); 
     app.use('/api/itineraries', itineraryRoutes);
     app.use('/api/accommodation', accommodationRoutes);
     app.use('/api/tourist-accommodation', touristAccommodationRouter);
     app.use('/api/transportation', transportationRouter);
     app.use('/api/touriststransportation', touristRoutes);
     app.use('/api/reviwews', reviewRoutes);

    app.get("/", (req, res, next) => {
        const temp = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Saudi Arabia Tourist Guide</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f0f8ff;
                    text-align: center;
                }
    
                .welcome-message {
                    margin-top: 100px;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
    
                h1 {
                    font-size: 48px;
                    color: #2c3e50;
                }
    
                p {
                    color: #34495e;
                    font-size: 24px;
                    margin: 20px 0;
                }
    
                .tourism-icons {
                    margin-top: 40px;
                }
    
                .tourism-icons i {
                    font-size: 64px;
                    margin: 0 20px;
                    color: #e74c3c;
                    border-radius: 50%;
                    padding: 20px;
                    background-color: #eaf4f4;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }
    
                .tourism-icons i:hover {
                    transform: scale(1.1);
                }
            </style>
        </head>
        <body>
            <div class="welcome-message">
                <h1>Welcome to Saudi Arabia Tourist Guide!</h1>
                <p>Explore the beauty of Saudi Arabia, from ancient history to modern wonders.</p>
                <div class="tourism-icons">
                    <i class="fas fa-kaaba"></i> <!-- أيقونة تعبر عن الكعبة -->
                    <i class="fas fa-mountain"></i> <!-- أيقونة تعبر عن الطبيعة والجبال -->
                    <i class="fas fa-umbrella-beach"></i> <!-- أيقونة تعبر عن الشواطئ -->
                </div>
                
            </div>

        </body>

        </html>
        `;
        res.status(200).header('Content-Type', 'text/html').send(temp);
    });
    
    
    app.use((err, req, res, next) => {
        const status = err.status || 500;
        res.status(status).json({
            status: status,
            success: false,
            message: err.message || "Internal Server Error"
        });
    });

    app.all("*", (req, res, next) => {
        return next(new Error("Not Found Page!", { cause: 404 }));
    });

    const Port = process.env.PORT
    app.listen(Port, () => {
        console.log(`Server Is Running On Port ${Port}  `);
    });
}