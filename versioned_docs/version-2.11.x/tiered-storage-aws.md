---
id: tiered-storage-aws
title: Use AWS S3 offloader with Pulsar
sidebar_label: "AWS S3 offloader"
---

This chapter guides you through every step of installing and configuring the AWS S3 offloader and using it with Pulsar.

## Installation

Follow the steps below to install the AWS S3 offloader.

### Prerequisite

- Pulsar: 2.4.2 or later versions

### Steps

1. [Download the Pulsar tarball](getting-started-standalone.md#download-pulsar-distribution).
2. Download and untar the Pulsar offloaders package, then copy the Pulsar offloaders as `offloaders` in the Pulsar directory. See [Install tiered storage offloaders](tiered-storage-overview.md#how-to-install-tiered-storage-offloaders).

## Configuration

:::note

Before offloading data from BookKeeper to AWS S3, you need to configure some properties of the AWS S3 offload driver.

:::

Besides, you can also configure the AWS S3 offloader to run it automatically or trigger it manually.

### Configure AWS S3 offloader driver

You can configure the AWS S3 offloader driver in the configuration file `broker.conf` or `standalone.conf`.

- **Required** configurations are as below.

  Required configuration | Description | Example value
  |---|---|---
  `managedLedgerOffloadDriver` | Offloader driver name, which is case-insensitive. <br /><br />**Note**: there is a third driver type, S3, which is identical to AWS S3, though S3 requires that you specify an endpoint URL using `s3ManagedLedgerOffloadServiceEndpoint`. This is useful if using an S3 compatible data store other than AWS S3. | aws-s3
  `offloadersDirectory` | Offloader directory | offloaders
  `s3ManagedLedgerOffloadBucket` | Bucket | pulsar-topic-offload

- **Optional** configurations are as below.

  Optional | Description | Example value
  |---|---|---
  `s3ManagedLedgerOffloadRegion` | Bucket region <br /><br />**Note**: before specifying a value for this parameter, you need to set the following configurations. Otherwise, you might get an error.<br /><br />- Set [`s3ManagedLedgerOffloadServiceEndpoint`](https://docs.aws.amazon.com/general/latest/gr/s3.html).<br /><br />Example<br />`s3ManagedLedgerOffloadServiceEndpoint=https://s3.YOUR_REGION.amazonaws.com`<br /><br />- Grant `GetBucketLocation` permission to a user.<br /><br />For how to grant `GetBucketLocation` permission to a user, see [here](https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html#using-with-s3-actions-related-to-buckets).| eu-west-3
  `s3ManagedLedgerOffloadReadBufferSizeInBytes`|Size of block read|1 MB
  `s3ManagedLedgerOffloadMaxBlockSizeInBytes`|Size of block write|64 MB
  `managedLedgerMinLedgerRolloverTimeMinutes`|Minimum time between ledger rollover for a topic<br /><br />**Note**: it is not recommended that you set this configuration in the production environment.|10
  `managedLedgerMaxEntriesPerLedger`|Maximum number of entries to append to a ledger before triggering a rollover.<br /><br />**Note**: it is not recommended that you set this configuration in the production environment.|50000

#### Bucket (required)

A bucket is a basic container that holds your data. Everything you store in AWS S3 must be contained in a bucket. You can use a bucket to organize your data and control access to your data, but unlike directory and folder, you cannot nest a bucket.

##### Example

This example names the bucket as _pulsar-topic-offload_.

```conf
s3ManagedLedgerOffloadBucket=pulsar-topic-offload
```

#### Bucket region

A bucket region is a region where a bucket is located. If a bucket region is not specified, the **default** region (`US East (N. Virginia)`) is used.

:::tip

For more information about AWS regions and endpoints, see [here](https://docs.aws.amazon.com/general/latest/gr/rande.html).

:::


##### Example

This example sets the bucket region as _europe-west-3_.

```
s3ManagedLedgerOffloadRegion=eu-west-3
```

#### Authentication (required)

To be able to access AWS S3, you need to authenticate with AWS S3.

Pulsar does not provide any direct methods of configuring authentication for AWS S3,
but relies on the mechanisms supported by the [DefaultAWSCredentialsProviderChain](https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/auth/DefaultAWSCredentialsProviderChain.html).

Once you have created a set of credentials in the AWS IAM console, you can configure credentials using one of the following methods.

* Use EC2 instance metadata credentials.

  If you are on AWS instance with an instance profile that provides credentials, Pulsar uses these credentials if no other mechanism is provided.

* Set the environment variables `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` in `conf/pulsar_env.sh`.

  "export" is important so that the variables are made available in the environment of spawned processes.

  ```bash
  export AWS_ACCESS_KEY_ID=ABC123456789
  export AWS_SECRET_ACCESS_KEY=ded7db27a4558e2ea8bbf0bf37ae0e8521618f366c
  ```

* Add the Java system properties `aws.accessKeyId` and `aws.secretKey` to `PULSAR_EXTRA_OPTS` in `conf/pulsar_env.sh`.

  ```bash
  PULSAR_EXTRA_OPTS="${PULSAR_EXTRA_OPTS} ${PULSAR_MEM} ${PULSAR_GC} -Daws.accessKeyId=ABC123456789 -Daws.secretKey=ded7db27a4558e2ea8bbf0bf37ae0e8521618f366c -Dio.netty.leakDetectionLevel=disabled -Dio.netty.recycler.maxCapacityPerThread=4096"
  ```

* Set the access credentials in `~/.aws/credentials`.

  ```conf
  [default]
  aws_access_key_id=ABC123456789
  aws_secret_access_key=ded7db27a4558e2ea8bbf0bf37ae0e8521618f366c
  ```

* Assume an IAM role.

  This example uses the `DefaultAWSCredentialsProviderChain` for assuming this role.

  The broker must be rebooted for credentials specified in `pulsar_env` to take effect.

  ```conf
  s3ManagedLedgerOffloadRole=<aws role arn>
  s3ManagedLedgerOffloadRoleSessionName=pulsar-s3-offload
  ```

#### Size of block read/write

You can configure the size of a request sent to or read from AWS S3 in the configuration file `broker.conf` or `standalone.conf`.

Configuration|Description|Default value
|---|---|---
`s3ManagedLedgerOffloadReadBufferSizeInBytes`|Block size for each individual read when reading back data from AWS S3.|1 MB
`s3ManagedLedgerOffloadMaxBlockSizeInBytes`|Maximum size of a "part" sent during a multipart upload to AWS S3. It **cannot** be smaller than 5 MB. |64 MB

### Configure AWS S3 offloader to run automatically

Namespace policy can be configured to offload data automatically once a threshold is reached. The threshold is based on the size of data that a topic has stored on a Pulsar cluster. Once the topic reaches the threshold, an offloading operation is triggered automatically.

Threshold value|Action
|---|---
> 0 | It triggers the offloading operation if the topic storage reaches its threshold.
= 0|It causes a broker to offload data as soon as possible.
< 0 |It disables automatic offloading operation.

Automatic offloading runs when a new segment is added to a topic log. If you set the threshold on a namespace, but few messages are being produced to the topic, offloader does not work until the current segment is full.

You can configure the threshold size using CLI tools, such as pulsar-admin.

The offload configurations in `broker.conf` and `standalone.conf` are used for the namespaces that do not have namespace level offload policies. Each namespace can have its own offload policy. If you want to set offload policy for each namespace, use the command [`pulsar-admin namespaces set-offload-policies options`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/namespaces?id=set-offload-policies) command.

#### Example

This example sets the AWS S3 offloader threshold size to 10 MB using pulsar-admin.

```bash
bin/pulsar-admin namespaces set-offload-threshold --size 10M my-tenant/my-namespace
```

:::tip

For more information about the `pulsar-admin namespaces set-offload-threshold options` command, including flags, descriptions, and default values, see [Pulsar admin docs](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin).

:::

### Configure AWS S3 offloader to run manually

For individual topics, you can trigger AWS S3 offloader manually using one of the following methods:

- Use REST endpoint.

- Use CLI tools (such as pulsar-admin).

  To trigger it via CLI tools, you need to specify the maximum amount of data (threshold) that should be retained on a Pulsar cluster for a topic. If the size of the topic data on the Pulsar cluster exceeds this threshold, segments from the topic are moved to AWS S3 until the threshold is no longer exceeded. Older segments are moved first.

#### Example

- This example triggers the AWS S3 offloader to run manually using pulsar-admin.

  ```bash
  bin/pulsar-admin topics offload --size-threshold 10M my-tenant/my-namespace/topic1
  ```

  **Output**

  ```bash
  Offload triggered for persistent://my-tenant/my-namespace/topic1 for messages before 2:0:-1
  ```

  :::tip

  For more information about the `pulsar-admin topics offload options` command, including flags, descriptions, and default values, see [Pulsar admin docs](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin).

  :::

- This example checks the AWS S3 offloader status using pulsar-admin.

  ```bash
  bin/pulsar-admin topics offload-status persistent://my-tenant/my-namespace/topic1
  ```

  **Output**

  ```bash
  Offload is currently running
  ```

  To wait for the AWS S3 offloader to complete the job, add the `-w` flag.

  ```bash
  bin/pulsar-admin topics offload-status -w persistent://my-tenant/my-namespace/topic1
  ```

  **Output**

  ```
  Offload was a success
  ```

  If there is an error in offloading, the error is propagated to the `pulsar-admin topics offload-status` command.

  ```bash
  bin/pulsar-admin topics offload-status persistent://my-tenant/my-namespace/topic1
  ```

  **Output**

  ```
  Error in offload
  null

  Reason: Error offloading: org.apache.bookkeeper.mledger.ManagedLedgerException: java.util.concurrent.CompletionException: com.amazonaws.services.s3.model.AmazonS3Exception: Anonymous users cannot initiate multipart uploads.  Please authenticate. (Service: Amazon S3; Status Code: 403; Error Code: AccessDenied; Request ID: 798758DE3F1776DF; S3 Extended Request ID: dhBFz/lZm1oiG/oBEepeNlhrtsDlzoOhocuYMpKihQGXe6EG8puRGOkK6UwqzVrMXTWBxxHcS+g=), S3 Extended Request ID: dhBFz/lZm1oiG/oBEepeNlhrtsDlzoOhocuYMpKihQGXe6EG8puRGOkK6UwqzVrMXTWBxxHcS+g=
  ```

  :::tip

  For more information about the `pulsar-admin topics offload-status options` command, including flags, descriptions, and default values, see [Pulsar admin docs](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin).

  :::

## Tutorial

For the complete and step-by-step instructions on how to use the AWS S3 offloader with Pulsar, see [here](https://hub.streamnative.io/offloaders/aws-s3/2.5.1#usage).
