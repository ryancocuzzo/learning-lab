package pubsub

import (
	"context"
	"time"

	"github.com/confluentinc/confluent-kafka-go/v2/kafka"
)

// goal: setup kafka infrstruacutre

type KafkaClient struct {
	client *kafka.AdminClient
}

func NewKafkaAdminClient(url string) (KafkaClient, error) {
	client, err := kafka.NewAdminClient(&kafka.ConfigMap{
		"bootstrap.servers": url,
	})
	if err != nil {
		return KafkaClient{}, err
	}
	return KafkaClient{
		client: client,
	}, nil
}

func (kc KafkaClient) CreateTopic(topic string) error {
	results, err := kc.client.CreateTopics(context.Background(), []kafka.TopicSpecification{
		{
			Topic:             topic,
			NumPartitions:     1, // for now, we will use only one partition. But would need to increase for scale.
			ReplicationFactor: 1,
		},
	},
		kafka.SetAdminOperationTimeout(20*time.Second),
	)
	if err != nil {
		return err
	}

	// error check for each result
	for _, res := range results {
		if res.Error.Code() != kafka.ErrNoError {
			return res.Error // return any error we come across
		}
	}

	return nil
}

func (kc KafkaClient) PublishToTopic() {

}
