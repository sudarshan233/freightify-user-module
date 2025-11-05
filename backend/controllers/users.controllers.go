package controllers

import (
	"context"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sudarshan233/freightify-user-module/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID                primitive.ObjectID    `json:"id,omitempty" bson:"_id,omitempty"`
	UserType          string 				`json:"userType"`
	UserRole          string 				`json:"userRole"`
	FirstName         string 				`json:"firstName"`
	LastName          string 				`json:"lastName"`
	PhoneNumber       int64  				`json:"phoneNumber"`
	EmailID           string 				`json:"email"`
	Password          string 				`json:"password"`
	ConfirmPassword   string 				`json:"confirmPassword"`
	UserCurrency      string 				`json:"userCurrency"`
	NumberFormat      string 				`json:"numberFormat"`
	MeasurementSystem string 				`json:"measurementSystem"`
	DecimalPlaces     int    				`json:"decimalPlaces"`
	UserStatus        bool   				`json:"userStatus"`
	UserTeam          []string 				`json:"userTeam"`
	CreatedAt         time.Time 			`bson:"createdAt" json:"createdAt"`
	UpdatedAt         time.Time 			`bson:"updatedAt" json:"updatedAt"`
}

func GetUsers(c *gin.Context) {
	var users []*User
	cursor, err := config.Collection.Find(context.Background(), bson.M{})

	if err != nil {
		c.JSON(400, gin.H {
			"success": false,
			"message": "No users exist!!",
		})
	}

	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var user User

		if err := cursor.Decode(&user); err != nil {
			c.JSON(500, gin.H {
			"success": false,
			"message": "Failure: Conversion from MongoDB structure to User struct",
		})
		}
		users = append(users, &user)
	}

	c.JSON(200, gin.H {
		"success": true,
		"message": "Retreived info about all users successfully",
		"users": users,
	})
}

func CreateUser(c *gin.Context) {
	user := new(User)

	c.Bind(&user)

	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()
	insert, err := config.Collection.InsertOne(context.Background(), user)
	
	if err != nil {
		c.JSON(500, gin.H {
			"success": false,
			"message": "Error in creating a new user",
		})
	}

	user.ID = insert.InsertedID.(primitive.ObjectID)

	c.JSON(201, gin.H {
		"success": true,
		"message": "Successfully created user",
	})
}

func EditUser(c *gin.Context) {
	var user User

	if err := c.BindJSON(&user); err != nil {
		c.JSON(400, gin.H{
			"success": false,
			"message": "Invalid request body",
		})
		return
	}

	id := c.Param("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(400, gin.H{
			"success": false,
			"message": "Invalid User ID",
		})
		return
	}

	user.UpdatedAt = time.Now()

	// Build only the fields you want to update
	update := bson.M{
		"$set": bson.M{
			"userType":          user.UserType,
			"userRole":          user.UserRole,
			"firstName":         user.FirstName,
			"lastName":          user.LastName,
			"phoneNumber":       user.PhoneNumber,
			"email":             user.EmailID,
			"password":          user.Password,
			"confirmPassword":   user.ConfirmPassword,
			"userCurrency":      user.UserCurrency,
			"numberFormat":      user.NumberFormat,
			"measurementSystem": user.MeasurementSystem,
			"decimalPlaces":     user.DecimalPlaces,
			"userStatus":        user.UserStatus,
			"userTeam":          user.UserTeam,
			"updatedAt":         user.UpdatedAt,
		},
	}

	filter := bson.M{"_id": objectID}

	_, err = config.Collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		c.JSON(500, gin.H{
			"success": false,
			"message": "Database update failed",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"success": true,
		"message": "User edited successfully",
	})
}

func RemoveUser(c *gin.Context) {
	id := c.Param("id")
	objectID, err := primitive.ObjectIDFromHex(id)	
	if err != nil {
		c.JSON(400, gin.H {
			"success": false,
			"message": "Invalid User ID",
		})
	}

	filter := bson.M{"_id": objectID}

	_, e := config.Collection.DeleteOne(context.Background(), filter)
	if e != nil {
		c.JSON(500, gin.H {
			"success": false,
			"message": "Invalid User ID",
		})
	}

	c.JSON(200, gin.H {
		"success": true,
		"message": "User data deleted successfully",
	})
}