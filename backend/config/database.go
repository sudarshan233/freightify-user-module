package config

import (
	"context"
	"os"
	"fmt"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Collection *mongo.Collection

func ConnectDB() error {
	err := godotenv.Load(".env")
	if(err != nil) {
		return err
	}

	MONGO_URI := os.Getenv("MONGO_URI")
	clientOptions := options.Client().ApplyURI(MONGO_URI)
	client, err := mongo.Connect(context.Background(), clientOptions)

	if(err != nil) {
		return err
	}

	err = client.Ping(context.Background(), nil)

	if(err != nil) {
		return err
	}

	fmt.Println("Connected to MongoDB Database")
	Collection = client.Database("freightify_trial_db").Collection("users")

	return nil
}