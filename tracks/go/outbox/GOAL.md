# Goal

The goal of this repo is to practice the outbox pattern in golang


### Acceptance criteria

The example program is a local deli API.

- [X] Runs a local stack containing a relational DB and kafka instance
- [ ] Runs a stateless api server that accepts new orders via `POST /orders`
- [ ] Writes each new order to the relational db as an outbox message
- [ ] Has an outbox poller that reads from the outbox table and publishes to Kafka `order.new.<id>`
    - [ ] Uses safe locking so multiple pollers don't contend on the same rows
- [ ] Has a Kafka consumer that processes new orders from the topic
    - [ ] Multiple consumer instances can run without stepping on each other
    - [ ] Thinks through partitioning (what to use as the key?)

### Skills practiced

- Locking patterns
- Outbox pattern
- Kafka
- Postgres

## Artifacts produced

- Trade-off document