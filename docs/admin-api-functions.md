---
id: admin-api-functions
title: Manage Functions
sidebar_label: "Functions"
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````


:::tip

 This page only shows **some frequently used operations**.

 - For the latest and complete information about `Pulsar admin`, including commands, flags, descriptions, and more, see [Pulsar admin docs](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/).
 
 - For the latest and complete information about `REST API`, including parameters, responses, samples, and more, see {@inject: rest:REST:/} API doc.
 
 - For the latest and complete information about `Java admin API`, including classes, methods, descriptions, and more, see [Java admin API doc](/api/admin/).
 
:::

**Pulsar Functions** are lightweight compute processes that

* consume messages from one or more Pulsar topics
* apply a user-supplied processing logic to each message
* publish the results of the computation to another topic

Functions can be managed via the following methods.

Method | Description
---|---
**Admin CLI** | The `functions` command of the [`pulsar-admin`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/) tool.
**REST API** |The `/admin/v3/functions` endpoint of the admin {@inject: rest:REST:/} API.
**Java Admin API**| The `functions` method of the `PulsarAdmin` object in the [Java API](client-libraries-java.md).

## Function resources

You can perform the following operations on functions.

### Create a function

You can create a Pulsar function in cluster mode (deploy it on a Pulsar cluster) using Admin CLI, REST API or Java Admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java Admin API","value":"Java Admin API"}]}>
<TabItem value="Admin CLI">

Use the [`create`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/functions?id=create) subcommand. 

**Example**

```shell
pulsar-admin functions create \
    --tenant public \
    --namespace default \
    --name (the name of Pulsar Functions) \
    --inputs test-input-topic \
    --output persistent://public/default/test-output-topic \
    --classname org.apache.pulsar.functions.api.examples.ExclamationFunction \
    --jar /examples/api-examples.jar
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|POST|/admin/v3/functions/:tenant/:namespace/:functionName|operation/registerFunction?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java Admin API">

```java
FunctionConfig functionConfig = new FunctionConfig();
functionConfig.setTenant(tenant);
functionConfig.setNamespace(namespace);
functionConfig.setName(functionName);
functionConfig.setRuntime(FunctionConfig.Runtime.JAVA);
functionConfig.setParallelism(1);
functionConfig.setClassName("org.apache.pulsar.functions.api.examples.ExclamationFunction");
functionConfig.setProcessingGuarantees(FunctionConfig.ProcessingGuarantees.ATLEAST_ONCE);
functionConfig.setTopicsPattern(sourceTopicPattern);
functionConfig.setSubName(subscriptionName);
functionConfig.setAutoAck(true);
functionConfig.setOutput(sinkTopic);
admin.functions().createFunction(functionConfig, fileName);
```

</TabItem>

</Tabs>
````

### Update a function

You can update a Pulsar function that has been deployed to a Pulsar cluster using Admin CLI, REST API or Java Admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java Admin API","value":"Java Admin API"}]}>
<TabItem value="Admin CLI">

Use the [`update`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/functions?id=update) subcommand. 

**Example**

```shell
pulsar-admin functions update \
    --tenant public \
    --namespace default \
    --name (the name of Pulsar Functions) \
    --output persistent://public/default/update-output-topic \
    # other options
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|PUT|/admin/v3/functions/:tenant/:namespace/:functionName|operation/updateFunction?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java Admin API">

```java
FunctionConfig functionConfig = new FunctionConfig();
functionConfig.setTenant(tenant);
functionConfig.setNamespace(namespace);
functionConfig.setName(functionName);
functionConfig.setRuntime(FunctionConfig.Runtime.JAVA);
functionConfig.setParallelism(1);
functionConfig.setClassName("org.apache.pulsar.functions.api.examples.ExclamationFunction");
UpdateOptions updateOptions = new UpdateOptions();
updateOptions.setUpdateAuthData(updateAuthData);
admin.functions().updateFunction(functionConfig, userCodeFile, updateOptions);
```

</TabItem>

</Tabs>
````

### Start an instance of a function

You can start a stopped function instance with `instance-id` using Admin CLI, REST API or Java Admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java Admin API","value":"Java Admin API"}]}>
<TabItem value="Admin CLI">

Use the [`start`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/functions?id=start) subcommand. 

```shell
pulsar-admin functions start \
    --tenant public \
    --namespace default \
    --name (the name of Pulsar Functions) \
    --instance-id 1
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|POST|/admin/v3/functions/:tenant/:namespace/:functionName/:instanceId/start|operation/startFunction?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java Admin API">

```java
admin.functions().startFunction(tenant, namespace, functionName, Integer.parseInt(instanceId));
```

</TabItem>

</Tabs>
````

### Start all instances of a function

You can start all stopped function instances using Admin CLI, REST API or Java Admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java Admin API","value":"Java Admin API"}]}>
<TabItem value="Admin CLI">

Use the [`start`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/functions?id=start) subcommand. 

**Example**

```shell
pulsar-admin functions start \
    --tenant public \
    --namespace default \
    --name (the name of Pulsar Functions) \
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|POST|/admin/v3/functions/:tenant/:namespace/:functionName/start|operation/startFunction?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java Admin API">

```java
admin.functions().startFunction(tenant, namespace, functionName);
```

</TabItem>

</Tabs>
````

### Stop an instance of a function

You can stop a function instance with `instance-id` using Admin CLI, REST API or Java Admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java Admin API","value":"Java Admin API"}]}>
<TabItem value="Admin CLI">

Use the [`stop`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/functions?id=stop) subcommand. 

**Example**

```shell
pulsar-admin functions stop \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions) \
	--instance-id 1
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|POST|/admin/v3/functions/:tenant/:namespace/:functionName/:instanceId/stop|operation/stopFunction?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java Admin API">

```java
admin.functions().stopFunction(tenant, namespace, functionName, Integer.parseInt(instanceId));
```

</TabItem>

</Tabs>
````

### Stop all instances of a function

You can stop all function instances using Admin CLI, REST API or Java Admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java Admin API","value":"Java Admin API"}]}>
<TabItem value="Admin CLI">

Use the [`stop`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/functions?id=stop) subcommand. 

**Example**

```shell
pulsar-admin functions stop \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions)
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|POST|/admin/v3/functions/:tenant/:namespace/:functionName/stop|operation/stopFunction?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java Admin API">

```java
admin.functions().stopFunction(tenant, namespace, functionName);
```

</TabItem>

</Tabs>
````

### Restart an instance of a function

Restart a function instance with `instance-id` using Admin CLI, REST API or Java Admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java Admin API","value":"Java Admin API"}]}>
<TabItem value="Admin CLI">

Use the [`restart`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/functions?id=restart) subcommand. 

**Example**

```shell
pulsar-admin functions restart \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions) \
	--instance-id 1
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|POST|/admin/v3/functions/:tenant/:namespace/:functionName/:instanceId/restart|operation/restartFunction?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java Admin API">

```java
admin.functions().restartFunction(tenant, namespace, functionName, Integer.parseInt(instanceId));
```

</TabItem>

</Tabs>
````

### Restart all instances of a function

You can restart all function instances using Admin CLI, REST API or Java admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java Admin API","value":"Java Admin API"}]}>
<TabItem value="Admin CLI">

Use the [`restart`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/functions?id=restart) subcommand. 

**Example**

```shell
pulsar-admin functions restart \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions)
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|POST|/admin/v3/functions/:tenant/:namespace/:functionName/restart|operation/restartFunction?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java Admin API">

```java
admin.functions().restartFunction(tenant, namespace, functionName);
```

</TabItem>

</Tabs>
````

### List all functions

You can list all Pulsar functions running under a specific tenant and namespace using Admin CLI, REST API or Java Admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java Admin API","value":"Java Admin API"}]}>
<TabItem value="Admin CLI">

Use the [`list`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/functions?id=list) subcommand.

**Example**

```shell
pulsar-admin functions list \
	--tenant public \
	--namespace default
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|GET|/admin/v3/functions/:tenant/:namespace|operation/listFunctions?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java Admin API">

```java
admin.functions().getFunctions(tenant, namespace);
```

</TabItem>

</Tabs>
````

### Delete a function

You can delete a Pulsar function that is running on a Pulsar cluster using Admin CLI, REST API or Java Admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java Admin API","value":"Java Admin API"}]}>
<TabItem value="Admin CLI">

Use the [`delete`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/functions?id=delete) subcommand. 

**Example**

```shell
pulsar-admin functions delete \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions)
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|DELETE|/admin/v3/functions/:tenant/:namespace/:functionName|operation/deregisterFunction?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java Admin API">

```java
admin.functions().deleteFunction(tenant, namespace, functionName);
```

</TabItem>

</Tabs>
````

### Get info about a function

You can get information about a Pulsar function currently running in cluster mode using Admin CLI, REST API or Java Admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java Admin API","value":"Java Admin API"}]}>
<TabItem value="Admin CLI">

Use the [`get`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/functions?id=get) subcommand. 

**Example**

```shell
pulsar-admin functions get \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions)
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|GET|/admin/v3/functions/:tenant/:namespace/:functionName|operation/getFunctionInfo?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java Admin API">

```java
admin.functions().getFunction(tenant, namespace, functionName);
```

</TabItem>

</Tabs>
````

### Get status of an instance of a function

You can get the current status of a Pulsar function instance with `instance-id` using Admin CLI, REST API or Java Admin API.
````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java Admin API","value":"Java Admin API"}]}>
<TabItem value="Admin CLI">

Use the [`status`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/functions?id=status) subcommand. 

**Example**

```shell
pulsar-admin functions status \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions) \
	--instance-id 1
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|GET|/admin/v3/functions/:tenant/:namespace/:functionName/:instanceId/status|operation/getFunctionInstanceStatus?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java Admin API">

```java
admin.functions().getFunctionStatus(tenant, namespace, functionName, Integer.parseInt(instanceId));
```

</TabItem>

</Tabs>
````

### Get status of all instances of a function

You can get the current status of a Pulsar function instance using Admin CLI, REST API or Java Admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java Admin API","value":"Java Admin API"}]}>
<TabItem value="Admin CLI">

Use the [`status`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/functions?id=status) subcommand. 

**Example**

```shell
pulsar-admin functions status \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions)
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|GET|/admin/v3/functions/:tenant/:namespace/:functionName/status|operation/getFunctionStatus?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java Admin API">

```java
admin.functions().getFunctionStatus(tenant, namespace, functionName);
```

</TabItem>

</Tabs>
````

### Get stats of an instance of a function

You can get the current stats of a Pulsar Function instance with `instance-id` using Admin CLI, REST API or Java admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java Admin API","value":"Java Admin API"}]}>
<TabItem value="Admin CLI">

Use the [`stats`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/functions?id=stats) subcommand. 

**Example**

```shell
pulsar-admin functions stats \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions) \
	--instance-id 1
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|GET|/admin/v3/functions/:tenant/:namespace/:functionName/:instanceId/stats|operation/getFunctionInstanceStats?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java Admin API">

```java
admin.functions().getFunctionStats(tenant, namespace, functionName, Integer.parseInt(instanceId));
```

</TabItem>

</Tabs>
````

### Get stats of all instances of a function

You can get the current stats of a Pulsar function using Admin CLI, REST API or Java admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java Admin API","value":"Java Admin API"}]}>
<TabItem value="Admin CLI">

Use the [`stats`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/functions?id=stats) subcommand. 

**Example**

```shell
pulsar-admin functions stats \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions)
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|GET|/admin/v3/functions/:tenant/:namespace/:functionName/stats|operation/getFunctionStats?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java Admin API">

```java
admin.functions().getFunctionStats(tenant, namespace, functionName);
```

</TabItem>

</Tabs>
````

### Trigger a function

You can trigger a specified Pulsar function with a supplied value using Admin CLI, REST API or Java admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java Admin API","value":"Java Admin API"}]}>
<TabItem value="Admin CLI">

Use the [`trigger`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/functions?id=trigger) subcommand. 

**Example**

```shell
pulsar-admin functions trigger \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions) \
	--topic (the name of input topic) \
	--trigger-value \"hello pulsar\"
	# or --trigger-file (the path of trigger file)
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|POST|/admin/v3/functions/:tenant/:namespace/:functionName/trigger|operation/triggerFunction?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java Admin API">

```java
admin.functions().triggerFunction(tenant, namespace, functionName, topic, triggerValue, triggerFile);
```

</TabItem>

</Tabs>
````

### Put state associated with a function

You can put the state associated with a Pulsar function using Admin CLI, REST API or Java admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java Admin API","value":"Java Admin API"}]}>
<TabItem value="Admin CLI">

Use the [`putstate`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/functions?id=putstate) subcommand. 

**Example**

```shell
pulsar-admin functions putstate \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions) \
	--state "{\"key\":\"pulsar\", \"stringValue\":\"hello pulsar\"}"
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|POST|/admin/v3/functions/:tenant/:namespace/:functionName/state/:key|operation/putFunctionState?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java Admin API">

```java
TypeReference<FunctionState> typeRef = new TypeReference<FunctionState>() {};
FunctionState stateRepr = ObjectMapperFactory.getThreadLocal().readValue(state, typeRef);
admin.functions().putFunctionState(tenant, namespace, functionName, stateRepr);
```

</TabItem>

</Tabs>
````

### Fetch state associated with a function

You can fetch the current state associated with a Pulsar function using Admin CLI, REST API or Java admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java Admin API","value":"Java Admin API"}]}>
<TabItem value="Admin CLI">

Use the [`querystate`](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin/functions?id=querystate) subcommand. 

**Example**

```shell
pulsar-admin functions querystate \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions) \
	--key (the key of state)
```

</TabItem>
<TabItem value="REST API">

{@inject: endpoint|GET|/admin/v3/functions/:tenant/:namespace/:functionName/state/:key|operation/getFunctionState?version=@pulsar:version_number@}

</TabItem>
<TabItem value="Java Admin API">

```java
admin.functions().getFunctionState(tenant, namespace, functionName, key);
```

</TabItem>

</Tabs>
````