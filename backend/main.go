package main

import (
	"fmt"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sudarshan233/freightify-user-module/config"
	"github.com/sudarshan233/freightify-user-module/controllers"
)

func init() {
	config.LoadEnvVar()
	err := config.ConnectDB()
	if(err != nil) {
		log.Fatal(err)
	} 
}

func main() {
	fmt.Println("Hello World")

	app := gin.Default()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:4200"}, 
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	}))

	fmt.Println("MongoDB Connected Successfully")

	app.GET("/api/users", controllers.GetUsers)

	app.POST("/api/create", controllers.CreateUser)

	app.PUT("/api/users/:id", controllers.EditUser)

	app.DELETE("/api/users/:id", controllers.RemoveUser)

	app.GET("/api/users/filter", controllers.FilterUsers)


	app.Run()
}

