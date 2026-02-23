# Goal

The goal of this repo is to practice the outbox pattern in ts


### Acceptance criteria

The example program is a local deli API.

- [X] Runs a local stack containing a relational DB and kafka instance
- [X] Runs a stateless api server that accepts new orders via `POST /orders`
- [X] Writes each new order to the relational db as an outbox message
- [ ] Has an outbox poller that reads from the outbox table and publishes to Kafka topic `orders.new`
    - [ ] Uses the order ID as the Kafka message key (for partition affinity and ordering)
    - [ ] Uses safe locking so multiple pollers don't contend on the same rows
- [ ] Has a Kafka consumer that processes new orders from the `orders.new` topic
    - [ ] Multiple consumer instances can run without stepping on each other
    - [ ] Partitioning is by order ID so all events for a given order land on the same partition

### Skills practiced

- Locking patterns
- Outbox pattern
- Kafka
- Postgres

## Artifacts produced

- Trade-off document