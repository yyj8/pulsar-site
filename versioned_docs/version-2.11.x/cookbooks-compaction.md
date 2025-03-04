---
id: cookbooks-compaction
title: Topic compaction
sidebar_label: "Topic compaction"
---

Pulsar's [topic compaction](concepts-topic-compaction.md#topic-compaction-example-the-stock-ticker) feature enables you to create **compacted** topics in which older, "obscured" entries are pruned from the topic, allowing for faster reads through the topic's history (which messages are deemed obscured/outdated/irrelevant will depend on your use case).

To use compaction:

* You need to give messages keys, as topic compaction in Pulsar takes place on a *per-key basis* (i.e. messages are compacted based on their key). For a stock ticker use case, the stock symbol---e.g. `AAPL` or `GOOG`---could serve as the key (more on this [below](#when-should-i-use-compacted-topics)). Messages without keys will be left alone by the compaction process.
* Compaction can be configured to run [automatically](#configure-compaction-to-run-automatically), or you can manually [trigger](#trigger-compaction-manually) compaction using the Pulsar administrative API.
* Your consumers must be [configured](#configure-consumers) to read from compacted topics (Java consumers, for example, have a `readCompacted` setting that must be set to `true`). If this configuration is not set, consumers will still be able to read from the non-compacted topic.


> Compaction only works on messages that have keys (as in the stock ticker example the stock symbol serves as the key for each message). Keys can thus be thought of as the axis along which compaction is applied. Messages that don't have keys are simply ignored by compaction.

## When should I use compacted topics?

The classic example of a topic that could benefit from compaction would be a stock ticker topic through which consumers can access up-to-date values for specific stocks. Imagine a scenario in which messages carrying stock value data use the stock symbol as the key (`GOOG`, `AAPL`, `TWTR`, etc.). Compacting this topic would give consumers on the topic two options:

* They can read from the "original," non-compacted topic in case they need access to "historical" values, i.e. the entirety of the topic's messages.
* They can read from the compacted topic if they only want to see the most up-to-date messages.

Thus, if you're using a Pulsar topic called `stock-values`, some consumers could have access to all messages in the topic (perhaps because they're performing some kind of number crunching of all values in the last hour) while the consumers used to power the real-time stock ticker only see the compacted topic (and thus aren't forced to process outdated messages). Which variant of the topic any given consumer pulls messages from is determined by the consumer's [configuration](#configure-consumers).

> One of the benefits of compaction in Pulsar is that you aren't forced to choose between compacted and non-compacted topics, as the compaction process leaves the original topic as-is and essentially adds an alternate topic. In other words, you can run compaction on a topic and consumers that need access to the non-compacted version of the topic will not be adversely affected.


## Configure compaction to run automatically

Compaction policy specifies how large the topic backlog can grow before compaction is triggered.

Tenant administrators can configure a compaction policy at namespace or topic levels. Configuring the compaction policy at the namespace level applies to all topics within that namespace. 

For example, to trigger compaction in a namespace when the backlog reaches 100MB:

```bash
bin/pulsar-admin namespaces set-compaction-threshold \
--threshold 100M my-tenant/my-namespace
```

## Trigger compaction manually

To run compaction on a topic, you need to use the [`topics compact`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/topics?id=compact) command using the [`pulsar-admin`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin) CLI tool. Here's an example:

```bash
bin/pulsar-admin topics compact \
persistent://my-tenant/my-namespace/my-topic
```

The `pulsar-admin` tool runs compaction via the Pulsar {@inject: rest:REST:/} API. To run compaction in its own dedicated process, i.e. *not* through the REST API, you can use the [`pulsar compact-topic`](reference-cli-tools.md) command. Here's an example:

```bash
bin/pulsar compact-topic \
--topic persistent://my-tenant-namespace/my-topic
```

> Running compaction in its own process is recommended when you want to avoid interfering with the broker's performance. Broker performance should only be affected, however, when running compaction on topics with a large keyspace (i.e when there are many keys on the topic). The first phase of the compaction process keeps a copy of each key in the topic, which can create memory pressure as the number of keys grows. Using the `pulsar-admin topics compact` command to run compaction through the REST API should present no issues in the overwhelming majority of cases; using `pulsar compact-topic` should correspondingly be considered an edge case.

The `pulsar compact-topic` command communicates with [ZooKeeper](https://zookeeper.apache.org) directly. To establish communication with ZooKeeper, though, the `pulsar` CLI tool will need to have a valid [broker configuration](reference-configuration.md#broker). You can either supply a proper configuration in `conf/broker.conf` or specify a non-default location for the configuration:

```bash
bin/pulsar compact-topic \
--broker-conf /path/to/broker.conf \
--topic persistent://my-tenant/my-namespace/my-topic

# If the configuration is in conf/broker.conf
bin/pulsar compact-topic \
--topic persistent://my-tenant/my-namespace/my-topic
```

:::tip

The frequency to trigger topic compaction varies widely based on use cases. If you want a compacted topic to be extremely speedy on read, then you need to run compaction fairly frequently.

:::

## Configure consumers

Pulsar consumers and readers need to be configured to read from compacted topics. The section below introduces how to enable compacted topic reads for Java clients.

To read from a compacted topic using a Java consumer, the `readCompacted` parameter must be set to `true`. Here's an example consumer for a compacted topic:

```java
Consumer<byte[]> compactedTopicConsumer = client.newConsumer()
        .topic("some-compacted-topic")
        .readCompacted(true)
        .subscribe();
```

As mentioned above, topic compaction in Pulsar works on a *per-key basis*. That means that messages that you produce on compacted topics need to have keys (the content of the key will depend on your use case). Messages that don't have keys will be ignored by the compaction process. Here's an example Pulsar message with a key:

```java
import org.apache.pulsar.client.api.TypedMessageBuilder;

TypedMessageBuilder<byte[]> msg = producer.newMessage()
        .key("some-key")
        .value(someByteArray);
```

The example below shows a message with a key being produced on a compacted Pulsar topic:

```java
import org.apache.pulsar.client.api.Producer;
import org.apache.pulsar.client.api.PulsarClient;

PulsarClient client = PulsarClient.builder()
        .serviceUrl("pulsar://localhost:6650")
        .build();

Producer<byte[]> compactedTopicProducer = client.newProducer()
        .topic("some-compacted-topic")
        .create();

compactedTopicProducer.newMessage()
        .key("some-key")
        .value(someByteArray)
        .send();
```
