---
id: admin-api-overview
title: Pulsar admin interface
sidebar_label: "Overview"
original_id: admin-api-overview
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````


The Pulsar admin interface enables you to manage all important entities in a Pulsar instance, such as tenants, topics, and namespaces.

You can interact with the admin interface via:

- The `pulsar-admin` CLI tool, which is available in the `bin` folder of your Pulsar installation:

  ```shell
  
  bin/pulsar-admin
  
  ```

  > **Important**
  > 
  > For the latest and complete information about `Pulsar admin`, including commands, flags, descriptions, and more information, see [Pulsar admin doc](pathname:///reference/#/@pulsar:version_origin@/pulsar-admin).

- HTTP calls, which are made against the admin {@inject: rest:REST:/} API provided by Pulsar brokers. For some RESTful APIs, they might be redirected to the owner brokers for serving with [`307 Temporary Redirect`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307), hence the HTTP callers should handle `307 Temporary Redirect`. If you use `curl` commands, you should specify `-L` to handle redirections.
  
  > **Important**
  >
  > For the latest and complete information about `REST API`, including parameters, responses, samples, and more, see {@inject: rest:REST:/} API doc.

- A Java client interface.
  
  > **Important**
  > 
  > For the latest and complete information about `Java admin API`, including classes, methods, descriptions, and more, see [Java admin API doc](/api/admin/).

> **The REST API is the admin interface**. Both the `pulsar-admin` CLI tool and the Java client use the REST API. If you implement your own admin interface client, you should use the REST API. 

## Admin setup

Each of the three admin interfaces (the `pulsar-admin` CLI tool, the {@inject: rest:REST:/} API, and the [Java admin API](/api/admin)) requires some special setup if you have enabled authentication in your Pulsar instance.

````mdx-code-block
<Tabs 
  defaultValue="pulsar-admin"
  values={[{"label":"pulsar-admin","value":"pulsar-admin"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="pulsar-admin">

If you have enabled authentication, you need to provide an auth configuration to use the `pulsar-admin` tool. By default, the configuration for the `pulsar-admin` tool is in the [`conf/client.conf`](reference-configuration.md#client) file. The following are the available parameters:

|Name|Description|Default|
|----|-----------|-------|
|webServiceUrl|The web URL for the cluster.|http://localhost:8080/|
|brokerServiceUrl|The Pulsar protocol URL for the cluster.|pulsar://localhost:6650/|
|authPlugin|The authentication plugin.| |
|authParams|The authentication parameters for the cluster, as a comma-separated string.| |
|useTls|Whether or not TLS authentication will be enforced in the cluster.|false|
|tlsAllowInsecureConnection|Accept untrusted TLS certificate from client.|false|
|tlsTrustCertsFilePath|Path for the trusted TLS certificate file.| |

</TabItem>
<TabItem value="REST API">

You can find details for the REST API exposed by Pulsar brokers in this {@inject: rest:document:/}.

</TabItem>
<TabItem value="Java">

To use the Java admin API, instantiate a {@inject: javadoc:PulsarAdmin:/admin/org/apache/pulsar/client/admin/PulsarAdmin} object, and specify a URL for a Pulsar broker and a {@inject: javadoc:PulsarAdminBuilder:/admin/org/apache/pulsar/client/admin/PulsarAdminBuilder}. The following is a minimal example using `localhost`:

```java

String url = "http://localhost:8080";
// Pass auth-plugin class fully-qualified name if Pulsar-security enabled
String authPluginClassName = "com.org.MyAuthPluginClass";
// Pass auth-param if auth-plugin class requires it
String authParams = "param1=value1";
boolean useTls = false;
boolean tlsAllowInsecureConnection = false;
String tlsTrustCertsFilePath = null;
PulsarAdmin admin = PulsarAdmin.builder()
.authentication(authPluginClassName,authParams)
.serviceHttpUrl(url)
.tlsTrustCertsFilePath(tlsTrustCertsFilePath)
.allowTlsInsecureConnection(tlsAllowInsecureConnection)
.build();

```

If you use multiple brokers, you can use multi-host like Pulsar service. For example,

```java

String url = "http://localhost:8080,localhost:8081,localhost:8082";
// Pass auth-plugin class fully-qualified name if Pulsar-security enabled
String authPluginClassName = "com.org.MyAuthPluginClass";
// Pass auth-param if auth-plugin class requires it
String authParams = "param1=value1";
boolean useTls = false;
boolean tlsAllowInsecureConnection = false;
String tlsTrustCertsFilePath = null;
PulsarAdmin admin = PulsarAdmin.builder()
.authentication(authPluginClassName,authParams)
.serviceHttpUrl(url)
.tlsTrustCertsFilePath(tlsTrustCertsFilePath)
.allowTlsInsecureConnection(tlsAllowInsecureConnection)
.build();

```

</TabItem>

</Tabs>
````

## How to define Pulsar resource names when running Pulsar in Kubernetes
If you run Pulsar Functions or connectors on Kubernetes, you need to follow Kubernetes naming convention to define the names of your Pulsar resources, whichever admin interface you use.

Kubernetes requires a name that can be used as a DNS subdomain name as defined in [RFC 1123](https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names). Pulsar supports more legal characters than Kubernetes naming convention. If you create a Pulsar resource name with special characters that are not supported by Kubernetes (for example, including colons in a Pulsar namespace name), Kubernetes runtime translates the Pulsar object names into Kubernetes resource labels which are in RFC 1123-compliant forms. Consequently, you can run functions or connectors using Kubernetes runtime. The rules for translating Pulsar object names into Kubernetes resource labels are as below:

- Truncate to 63 characters
  
- Replace the following characters with dashes (-):
  
  - Non-alphanumeric characters
  
  - Underscores (_)
  
  - Dots (.) 
  
- Replace beginning and ending non-alphanumeric characters with 0
  
:::tip

- If you get an error in translating Pulsar object names into Kubernetes resource labels (for example, you may have a naming collision if your Pulsar object name is too long) or want to customize the translating rules, see [customize Kubernetes runtime](functions-runtime.md#customize-kubernetes-runtime).
- For how to configure Kubernetes runtime, see [here](functions-runtime.md#configure-kubernetes-runtime).

:::

