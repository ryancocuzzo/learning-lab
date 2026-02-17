package main

import (
	"fmt"
	"log"
	"os"
	"outbox/pubsub"

	_ "github.com/joho/godotenv/autoload"
)

func main() {
	kafkaURL := fmt.Sprintf("%s", os.Getenv("KAFKA_BASE_URL"))
	client, err := pubsub.NewKafkaAdminClient(kafkaURL)
	if err != nil {
		log.Fatalf("Failure to initialize kafka admin client %s", err.Error())
		os.Exit(1)
	}
	topic := "orders.new"
	err = client.CreateTopic(topic)
	if err != nil {
		log.Fatalf("Failure to create a new kafka topic %s", err.Error())
		os.Exit(1)
	}
	fmt.Println("Success.")
}
