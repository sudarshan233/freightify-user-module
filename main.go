package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
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

	err := config.ConnectDB()
	if(err != nil) {
		log.Fatal(err)
	} 

	fmt.Println("MongoDB Connected Successfully")

	app.Get("/api/users", controllers.GetUsers)

	app.Post("/api/create", controllers.CreateUser)

	app.Put("/api/users/:id", controllers.EditUser)

	app.Delete("/api/users/:id", controllers.RemoveUser)

	log.Fatal(app.Listen("0.0.0.0:" + port))
}

