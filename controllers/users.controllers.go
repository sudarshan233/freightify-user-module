package controllers

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"github.com/sudarshan233/freightify-user-module/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID                primitive.ObjectID    `json:"id,omitempty" bson:"_id,omitempty"`
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

func GetUsers(c *fiber.Ctx) error {
	var users []User
	
	cursor, err := config.Collection.Find(context.Background(), bson.M{})

	if err != nil {
		return err;
	}

	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var user User

		if err := cursor.Decode(&user); err != nil {
			return err
		}
		users = append(users, user)
	}

	return c.Status(200).JSON(users)
}

func CreateUser(c *fiber.Ctx) error {
	user := new(User)

	if err := c.BodyParser(user); err != nil {
		return err
	}

	insert, err := config.Collection.InsertOne(context.Background(), user)
	
	if err != nil {
		return err
	}

	user.ID = insert.InsertedID.(primitive.ObjectID)

	return c.Status(201).JSON(user)
}

func EditUser(c *fiber.Ctx) error {
	user := new(User)
	if err := c.BodyParser(user); err != nil {
		return err
	}

	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)	
	if err != nil {
		return c.Status(400).JSON(fiber.Map {
			"error": "Invalid User ID",
		})
	}

	filter := bson.M{"_id": objectID}
	update := bson.M{
		"$set": user,
	}
	
	_, e := config.Collection.UpdateOne(context.Background(), filter, update)
	if e != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map {
		"updatedUserData": user,
	})
}

func RemoveUser(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)	
	if err != nil {
		return c.Status(400).JSON(fiber.Map {
			"error": "Invalid User ID",
		})
	}

	filter := bson.M{"_id": objectID}

	_, e := config.Collection.DeleteOne(context.Background(), filter)
	if e != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map {
		"msg": "User data deleted successfully",
	})
}