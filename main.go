package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

type User struct {
	ID int
	UserType string
	UserRole string
	FirstName string
	LastName string
	PhoneNumber int
	EmailID string
	Password string
	ConfirmPassword string
	UserCurrency string
	NumberFormat string
	MeasurementSystem string
	DecimalPlaces int
	UserStatus bool
	UserTeam string
}

func main() {
	fmt.Println("Hello World")

	app := fiber.New()
	users := []User{}

	app.Post("/api/create", func(c *fiber.Ctx) error {
		user := &User{}

		if err := c.BodyParser(user); err != nil {
			return err;
		}

		user.ID = len(users) + 1
		users = append(users, *user)

		return c.Status(201).JSON(fiber.Map{
			"msg": "User created successfully!!",
			"user": user,
		})

	})

	log.Fatal(app.Listen(":5000"))
}