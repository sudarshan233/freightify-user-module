package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

type User struct {
	ID                int    `json:"id"`
	UserType          string `json:"userType"`
	UserRole          string `json:"userRole"`
	FirstName         string `json:"firstName"`
	LastName          string `json:"lastName"`
	PhoneNumber       int64  `json:"phoneNumber"`
	EmailID           string `json:"email"`
	Password          string `json:"password"`
	ConfirmPassword   string `json:"confirmPassword"`
	UserCurrency      string `json:"userCurrency"`
	NumberFormat      string `json:"numberFormat"`
	MeasurementSystem string `json:"measurementSystem"`
	DecimalPlaces     int    `json:"decimalPlaces"`
	UserStatus        bool   `json:"userStatus"`
	UserTeam          string `json:"userTeam"`
}

func main() {
	fmt.Println("Hello World")

	app := fiber.New()
	users := []User{}

	app.Post("/api/create", func(c *fiber.Ctx) error {
		user := &User{}

		if err := c.BodyParser(user); err != nil {
			return err
		}

		user.ID = len(users) + 1
		users = append(users, *user)

		return c.Status(201).JSON(fiber.Map{
			"msg":  "User created successfully!!",
			"user": user,
		})

	})

	log.Fatal(app.Listen(":5000"))
}

