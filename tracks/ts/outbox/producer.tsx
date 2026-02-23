import { PrismaClient } from '@prisma/client';
import { KafkaJS } from '@confluentinc/kafka-javascript';

class OutboxRelay {
    constructor(private readonly kafkaClient: KafkaJS.Kafka, private readonly dbClient: PrismaClient) {}
    
}