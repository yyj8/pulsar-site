---
id: client-libraries-dotnet
title: Pulsar C# client
sidebar_label: "C#"
---

You can use the Pulsar C# client (DotPulsar) to create Pulsar producers, consumers, and readers in C#. For Pulsar features that C# clients support, see [Pulsar Feature Matrix](https://docs.google.com/spreadsheets/d/1YHYTkIXR8-Ql103u-IMI18TXLlGStK8uJjDsOOA0T20/edit#gid=1784579914).

All the methods in the producer, consumer, and reader of a C# client are thread-safe. The official documentation for DotPulsar is available [here](https://github.com/apache/pulsar-dotpulsar/wiki). 

## Installation

This section describes how to install the Pulsar C# client library through the dotnet CLI. 

Alternatively, you can install the Pulsar C# client library through Visual Studio. Note that starting from Visual Studio 2017, the dotnet CLI is automatically installed with any .NET Core related workloads. For more information, see [Microsoft documentation](https://docs.microsoft.com/en-us/visualstudio/mac/nuget-walkthrough?view=vsmac-2019).

To install the Pulsar C# client library using the dotnet CLI, follow these steps:

1. Install the [.NET Core SDK](https://dotnet.microsoft.com/download/), which provides the dotnet CLI. 

2. Create a project.

   1. Create a folder for the project.

   2. Open a terminal window and switch to the new folder.

   3. Create the project using the following command.

       ```
       dotnet new console
       ```

   4. Use `dotnet run` to test that the app has been created properly.

3. Add the DotPulsar NuGet package.

   1. Use the following command to install the `DotPulsar` package.

       ```
       dotnet add package DotPulsar
       ```

   2. After the command completes, open the `.csproj` file to see the added reference.

       ```xml
       <ItemGroup>
         <PackageReference Include="DotPulsar" Version="2.0.1" />
       </ItemGroup>
       ```

## Connection URLs

To connect to Pulsar using client libraries, you need to specify a [Pulsar protocol](developing-binary-protocol.md) URL.

You can assign Pulsar protocol URLs to specific clusters and use the `pulsar` scheme. The following is an example of `localhost` with the default port `6650`:

```http
pulsar://localhost:6650
```

If you have multiple brokers, separate `IP:port` by commas:

```http
pulsar://localhost:6550,localhost:6651,localhost:6652
```

If you use [mTLS authentication](security-tls-authentication.md), add `+ssl` in the scheme:

```http
pulsar+ssl://pulsar.us-west.example.com:6651
```

## Release notes

For the changelog of Pulsar C# clients, see [release notes](/release-notes/#c-1).

## Client

This section describes some configuration examples for the Pulsar C# client.

### Create client

This example shows how to create a Pulsar C# client connected to localhost.

```csharp
using DotPulsar;

var client = PulsarClient.Builder().Build();
```

To create a Pulsar C# client by using the builder, you can specify the following options.

| Option | Description | Default |
| ---- | ---- | ---- |
| ServiceUrl | Set the service URL for the Pulsar cluster. | pulsar://localhost:6650 |
| RetryInterval | Set the time to wait before retrying an operation or a reconnection. | 3s |

### Create producer

This section describes how to create a producer.

- Create a producer by using the builder.

  ```csharp
  using DotPulsar;
  using DotPulsar.Extensions;

  var producer = client.NewProducer()
                       .Topic("persistent://public/default/mytopic")
                       .Create();
  ```

- Create a producer without using the builder.

  ```csharp
  using DotPulsar;

  var options = new ProducerOptions<byte[]>("persistent://public/default/mytopic", Schema.ByteArray);
  var producer = client.CreateProducer(options);
  ```

### Create consumer

This section describes how to create a consumer.

- Create a consumer by using the builder.

  ```csharp
  using DotPulsar;
  using DotPulsar.Extensions;

  var consumer = client.NewConsumer()
                       .SubscriptionName("MySubscription")
                       .Topic("persistent://public/default/mytopic")
                       .Create();
  ```

- Create a consumer without using the builder.

  ```csharp
  using DotPulsar;

  var options = new ConsumerOptions<byte[]>("MySubscription", "persistent://public/default/mytopic", Schema.ByteArray);
  var consumer = client.CreateConsumer(options);
  ```

### Create reader

This section describes how to create a reader.

- Create a reader by using the builder.

  ```csharp
  using DotPulsar;
  using DotPulsar.Extensions;

  var reader = client.NewReader()
                     .StartMessageId(MessageId.Earliest)
                     .Topic("persistent://public/default/mytopic")
                     .Create();
  ```

- Create a reader without using the builder.

  ```csharp
  using DotPulsar;

  var options = new ReaderOptions<byte[]>(MessageId.Earliest, "persistent://public/default/mytopic", Schema.ByteArray);
  var reader = client.CreateReader(options);
  ```

### Configure encryption policies

The Pulsar C# client supports four kinds of encryption policies:

- `EnforceUnencrypted`: always use unencrypted connections.
- `EnforceEncrypted`: always use encrypted connections)
- `PreferUnencrypted`: use unencrypted connections, if possible.
- `PreferEncrypted`: use encrypted connections, if possible.

This example shows how to set the `EnforceUnencrypted` encryption policy.

```csharp
using DotPulsar;

var client = PulsarClient.Builder()
                         .ConnectionSecurity(EncryptionPolicy.EnforceEncrypted)
                         .Build();
```

### Configure authentication

Currently, the Pulsar C# client supports the TLS (Transport Layer Security) and JWT (JSON Web Token) authentication.

If you have followed [Authentication using mTLS](security-tls-authentication.md), you get a certificate and a key. To use them from the Pulsar C# client, follow these steps:

1. Create an unencrypted and password-less pfx file.

   ```csharp
   openssl pkcs12 -export -keypbe NONE -certpbe NONE -out admin.pfx -inkey admin.key.pem -in admin.cert.pem -passout pass:
   ```

2. Use the admin.pfx file to create an X509Certificate2 and pass it to the Pulsar C# client.

   ```csharp
   using System.Security.Cryptography.X509Certificates;
   using DotPulsar;

   var clientCertificate = new X509Certificate2("admin.pfx");
   var client = PulsarClient.Builder()
                            .AuthenticateUsingClientCertificate(clientCertificate)
                            .Build();
   ```

## Producer

A producer is a process that attaches to a topic and publishes messages to a Pulsar broker for processing. This section describes some configuration examples of the producer.

### Send data

This example shows how to send data.

```csharp
var data = Encoding.UTF8.GetBytes("Hello World");
await producer.Send(data);
```

### Send messages with customized metadata

- Send messages with customized metadata by using the builder.

  ```csharp
  var messageId = await producer.NewMessage()
                                .Property("SomeKey", "SomeValue")
                                .Send(data);
  ```

- Send messages with customized metadata without using the builder.

  ```csharp
  var data = Encoding.UTF8.GetBytes("Hello World");
  var metadata = new MessageMetadata();
  metadata["SomeKey"] = "SomeValue";
  var messageId = await producer.Send(metadata, data));
  ```

## Consumer

A consumer is a process that attaches to a topic through a subscription and then receives messages. This section describes some configuration examples about the consumer.

### Receive messages

This example shows how a consumer receives messages from a topic.

```csharp
await foreach (var message in consumer.Messages())
{
    Console.WriteLine("Received: " + Encoding.UTF8.GetString(message.Data.ToArray()));
}
```

### Acknowledge messages

Messages can be acknowledged individually or cumulatively. For details about message acknowledgment, see [acknowledgment](concepts-messaging.md#acknowledgment).

- Acknowledge messages individually.

  ```csharp
  await consumer.Acknowledge(message);
  ```

- Acknowledge messages cumulatively.

  ```csharp
  await consumer.AcknowledgeCumulative(message);
  ```

### Unsubscribe from topics

This example shows how a consumer unsubscribes from a topic.

```csharp
await consumer.Unsubscribe();
```

:::note

A consumer cannot be used and is disposed once the consumer unsubscribes from a topic.

:::

## Reader

A reader is just a consumer without a cursor. This means that Pulsar does not keep track of your progress and there is no need to acknowledge messages.

This example shows how a reader receives messages.

```csharp
await foreach (var message in reader.Messages())
{
    Console.WriteLine("Received: " + Encoding.UTF8.GetString(message.Data.ToArray()));
}
```

## Monitoring

This section describes how to monitor the producer, consumer, and reader state.

### Monitor producer

The following table lists states available for the producer.

| State | Description |
| ---- | ----|
| Closed | The producer or the Pulsar client has been disposed. |
| Connected | All is well. |
| Disconnected | The connection is lost and attempts are being made to reconnect. |
| Faulted | An unrecoverable error has occurred. |
| PartiallyConnected | Some of the sub-producers are disconnected. |

This example shows how to monitor the producer state.

```csharp
private static async ValueTask Monitor(IProducer producer, CancellationToken cancellationToken)
{
    var state = ProducerState.Disconnected;

    while (!cancellationToken.IsCancellationRequested)
    {
        state = (await producer.StateChangedFrom(state, cancellationToken)).ProducerState;

        var stateMessage = state switch
        {
            ProducerState.Connected => $"The producer is connected",
            ProducerState.Disconnected => $"The producer is disconnected",
            ProducerState.Closed => $"The producer has closed",
            ProducerState.Faulted => $"The producer has faulted",
            ProducerState.PartiallyConnected => $"The producer is partially connected.",
            _ => $"The producer has an unknown state '{state}'"
        };

        Console.WriteLine(stateMessage);

        if (producer.IsFinalState(state))
            return;
    }
}
```

### Monitor consumer state

The following table lists states available for the consumer.

| State | Description |
| ---- | ----|
| Active | All is well. |
| Inactive | All is well. The subscription type is `Failover` and you are not the active consumer. |
| Closed | The consumer or the Pulsar client has been disposed. |
| Disconnected | The connection is lost and attempts are being made to reconnect. |
| Faulted | An unrecoverable error has occurred. |
| ReachedEndOfTopic | No more messages are delivered. |
| Unsubscribed | The consumer has unsubscribed. |

This example shows how to monitor the consumer state.

```csharp
private static async ValueTask Monitor(IConsumer consumer, CancellationToken cancellationToken)
{
    var state = ConsumerState.Disconnected;

    while (!cancellationToken.IsCancellationRequested)
    {
        state = (await consumer.StateChangedFrom(state, cancellationToken)).ConsumerState;

        var stateMessage = state switch
        {
            ConsumerState.Active => "The consumer is active",
            ConsumerState.Inactive => "The consumer is inactive",
            ConsumerState.Disconnected => "The consumer is disconnected",
            ConsumerState.Closed => "The consumer has closed",
            ConsumerState.ReachedEndOfTopic => "The consumer has reached end of topic",
            ConsumerState.Faulted => "The consumer has faulted",
            ConsumerState.Unsubscribed => "The consumer is unsubscribed.",
            _ => $"The consumer has an unknown state '{state}'"
        };

        Console.WriteLine(stateMessage);

        if (consumer.IsFinalState(state))
            return;
    }
}
```

### Monitor reader state

The following table lists states available for the reader.

| State | Description |
| ---- | ----|
| Closed | The reader or the Pulsar client has been disposed. |
| Connected | All is well. |
| Disconnected | The connection is lost and attempts are being made to reconnect.
| Faulted | An unrecoverable error has occurred. |
| ReachedEndOfTopic | No more messages are delivered. |

This example shows how to monitor the reader's state.

```csharp
private static async ValueTask Monitor(IReader reader, CancellationToken cancellationToken)
{
    var state = ReaderState.Disconnected;

    while (!cancellationToken.IsCancellationRequested)
    {
        state = (await reader.StateChangedFrom(state, cancellationToken)).ReaderState;

        var stateMessage = state switch
        {
            ReaderState.Connected => "The reader is connected",
            ReaderState.Disconnected => "The reader is disconnected",
            ReaderState.Closed => "The reader has closed",
            ReaderState.ReachedEndOfTopic => "The reader has reached end of topic",
            ReaderState.Faulted => "The reader has faulted",
            _ => $"The reader has an unknown state '{state}'"
        };

        Console.WriteLine(stateMessage);

        if (reader.IsFinalState(state))
            return;
    }
}
```

