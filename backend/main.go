package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/sudarshan233/freightify-user-module/config"
	"github.com/sudarshan233/freightify-user-module/controllers"
)

func main() {
	fmt.Println("Hello World")

	app := fiber.New()
	port := os.Getenv("PORT")
	if(port == "") {
		port = "5000"
	}

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:4200/", 
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowCredentials: true,
	}))

	err := config.ConnectDB()
	if(err != nil) {
		log.Fatal(err)
	} 

	fmt.Println("MongoDB Connected Successfully")

	app.Get("/api/users", controllers.GetUsers)

	app.Post("/api/create", controllers.UserModal)

	app.Put("/api/users/:id", controllers.EditUser)

	app.Delete("/api/users/:id", controllers.RemoveUser)

	log.Fatal(app.Listen("0.0.0.0:" + port))
}

