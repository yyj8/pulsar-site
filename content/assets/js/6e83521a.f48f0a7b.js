"use strict";(self.webpackChunkwebsite_next=self.webpackChunkwebsite_next||[]).push([[2375],{3905:function(e,n,a){a.d(n,{Zo:function(){return m},kt:function(){return d}});var t=a(67294);function r(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function s(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function i(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?s(Object(a),!0).forEach((function(n){r(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function o(e,n){if(null==e)return{};var a,t,r=function(e,n){if(null==e)return{};var a,t,r={},s=Object.keys(e);for(t=0;t<s.length;t++)a=s[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(t=0;t<s.length;t++)a=s[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=t.createContext({}),p=function(e){var n=t.useContext(l),a=n;return e&&(a="function"==typeof e?e(n):i(i({},n),e)),a},m=function(e){var n=p(e.components);return t.createElement(l.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},c=t.forwardRef((function(e,n){var a=e.components,r=e.mdxType,s=e.originalType,l=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),c=p(a),d=r,v=c["".concat(l,".").concat(d)]||c[d]||u[d]||s;return a?t.createElement(v,i(i({ref:n},m),{},{components:a})):t.createElement(v,i({ref:n},m))}));function d(e,n){var a=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var s=a.length,i=new Array(s);i[0]=c;var o={};for(var l in n)hasOwnProperty.call(n,l)&&(o[l]=n[l]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var p=2;p<s;p++)i[p]=a[p];return t.createElement.apply(null,i)}return t.createElement.apply(null,a)}c.displayName="MDXCreateElement"},58215:function(e,n,a){var t=a(67294);n.Z=function(e){var n=e.children,a=e.hidden,r=e.className;return t.createElement("div",{role:"tabpanel",hidden:a,className:r},n)}},26396:function(e,n,a){a.d(n,{Z:function(){return c}});var t=a(87462),r=a(67294),s=a(72389),i=a(79443);var o=function(){var e=(0,r.useContext)(i.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e},l=a(63616),p=a(86010),m="tabItem_vU9c";function u(e){var n,a,s,i=e.lazy,u=e.block,c=e.defaultValue,d=e.values,v=e.groupId,f=e.className,k=r.Children.map(e.children,(function(e){if((0,r.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),h=null!=d?d:k.map((function(e){var n=e.props;return{value:n.value,label:n.label,attributes:n.attributes}})),g=(0,l.lx)(h,(function(e,n){return e.value===n.value}));if(g.length>0)throw new Error('Docusaurus error: Duplicate values "'+g.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var b=null===c?c:null!=(n=null!=c?c:null==(a=k.find((function(e){return e.props.default})))?void 0:a.props.value)?n:null==(s=k[0])?void 0:s.props.value;if(null!==b&&!h.some((function(e){return e.value===b})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+b+'" but none of its children has the corresponding value. Available values are: '+h.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var N=o(),y=N.tabGroupChoices,T=N.setTabGroupChoices,w=(0,r.useState)(b),P=w[0],C=w[1],E=[],O=(0,l.o5)().blockElementScrollPositionUntilNextRender;if(null!=v){var x=y[v];null!=x&&x!==P&&h.some((function(e){return e.value===x}))&&C(x)}var I=function(e){var n=e.currentTarget,a=E.indexOf(n),t=h[a].value;t!==P&&(O(n),C(t),null!=v&&T(v,t))},Z=function(e){var n,a=null;switch(e.key){case"ArrowRight":var t=E.indexOf(e.currentTarget)+1;a=E[t]||E[0];break;case"ArrowLeft":var r=E.indexOf(e.currentTarget)-1;a=E[r]||E[E.length-1]}null==(n=a)||n.focus()};return r.createElement("div",{className:"tabs-container"},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,p.Z)("tabs",{"tabs--block":u},f)},h.map((function(e){var n=e.value,a=e.label,s=e.attributes;return r.createElement("li",(0,t.Z)({role:"tab",tabIndex:P===n?0:-1,"aria-selected":P===n,key:n,ref:function(e){return E.push(e)},onKeyDown:Z,onFocus:I,onClick:I},s,{className:(0,p.Z)("tabs__item",m,null==s?void 0:s.className,{"tabs__item--active":P===n})}),null!=a?a:n)}))),i?(0,r.cloneElement)(k.filter((function(e){return e.props.value===P}))[0],{className:"margin-vert--md"}):r.createElement("div",{className:"margin-vert--md"},k.map((function(e,n){return(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==P})}))))}function c(e){var n=(0,s.Z)();return r.createElement(u,(0,t.Z)({key:String(n)},e))}},63501:function(e,n,a){a.r(n),a.d(n,{frontMatter:function(){return p},contentTitle:function(){return m},metadata:function(){return u},toc:function(){return c},default:function(){return v}});var t=a(87462),r=a(63366),s=(a(67294),a(3905)),i=a(26396),o=a(58215),l=["components"],p={id:"admin-api-permissions",title:"Managing permissions",sidebar_label:"Permissions",original_id:"admin-api-permissions"},m=void 0,u={unversionedId:"admin-api-permissions",id:"version-2.9.1/admin-api-permissions",title:"Managing permissions",description:"Important",source:"@site/versioned_docs/version-2.9.1/admin-api-permissions.md",sourceDirName:".",slug:"/admin-api-permissions",permalink:"/docs/admin-api-permissions",editUrl:"https://github.com/apache/pulsar/edit/master/site2/website-next/versioned_docs/version-2.9.1/admin-api-permissions.md",tags:[],version:"2.9.1",frontMatter:{id:"admin-api-permissions",title:"Managing permissions",sidebar_label:"Permissions",original_id:"admin-api-permissions"},sidebar:"version-2.9.1/docsSidebar",previous:{title:"Namespaces",permalink:"/docs/admin-api-namespaces"},next:{title:"Topics",permalink:"/docs/admin-api-topics"}},c=[{value:"Grant permissions",id:"grant-permissions",children:[],level:2},{value:"Get permissions",id:"get-permissions",children:[],level:2},{value:"Revoke permissions",id:"revoke-permissions",children:[],level:2}],d={toc:c};function v(e){var n=e.components,a=(0,r.Z)(e,l);return(0,s.kt)("wrapper",(0,t.Z)({},d,a,{components:n,mdxType:"MDXLayout"}),(0,s.kt)("blockquote",null,(0,s.kt)("p",{parentName:"blockquote"},(0,s.kt)("strong",{parentName:"p"},"Important")),(0,s.kt)("p",{parentName:"blockquote"},"This page only shows ",(0,s.kt)("strong",{parentName:"p"},"some frequently used operations"),"."),(0,s.kt)("ul",{parentName:"blockquote"},(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},"For the latest and complete information about ",(0,s.kt)("inlineCode",{parentName:"p"},"Pulsar admin"),", including commands, flags, descriptions, and more, see ",(0,s.kt)("a",{parentName:"p",href:"https://pulsar.apache.org/tools/pulsar-admin/"},"Pulsar admin doc"))),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},"For the latest and complete information about ",(0,s.kt)("inlineCode",{parentName:"p"},"REST API"),", including parameters, responses, samples, and more, see ",(0,s.kt)("a",{parentName:"p",href:"https://pulsar.apache.org/admin-rest-api#/"},"REST")," API doc.")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},"For the latest and complete information about ",(0,s.kt)("inlineCode",{parentName:"p"},"Java admin API"),", including classes, methods, descriptions, and more, see ",(0,s.kt)("a",{parentName:"p",href:"https://pulsar.apache.orghttps://pulsar.apache.org/api/admin/2.9.0-SNAPSHOT//"},"Java admin API doc"),".")))),(0,s.kt)("p",null,"Permissions in Pulsar are managed at the ",(0,s.kt)("a",{parentName:"p",href:"/docs/reference-terminology#namespace"},"namespace")," level\n(that is, within ",(0,s.kt)("a",{parentName:"p",href:"/docs/reference-terminology#tenant"},"tenants")," and ",(0,s.kt)("a",{parentName:"p",href:"/docs/reference-terminology#cluster"},"clusters"),")."),(0,s.kt)("h2",{id:"grant-permissions"},"Grant permissions"),(0,s.kt)("p",null,"You can grant permissions to specific roles for lists of operations such as ",(0,s.kt)("inlineCode",{parentName:"p"},"produce")," and ",(0,s.kt)("inlineCode",{parentName:"p"},"consume"),"."),(0,s.kt)(i.Z,{defaultValue:"pulsar-admin",values:[{label:"pulsar-admin",value:"pulsar-admin"},{label:"REST API",value:"REST API"},{label:"Java",value:"Java"}],mdxType:"Tabs"},(0,s.kt)(o.Z,{value:"pulsar-admin",mdxType:"TabItem"},(0,s.kt)("p",null,"Use the ",(0,s.kt)("a",{parentName:"p",href:"reference-pulsar-admin.md#grant-permission"},(0,s.kt)("inlineCode",{parentName:"a"},"grant-permission"))," subcommand and specify a namespace, actions using the ",(0,s.kt)("inlineCode",{parentName:"p"},"--actions")," flag, and a role using the ",(0,s.kt)("inlineCode",{parentName:"p"},"--role")," flag:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"\n$ pulsar-admin namespaces grant-permission test-tenant/ns1 \\\n  --actions produce,consume \\\n  --role admin10\n\n")),(0,s.kt)("p",null,"Wildcard authorization can be performed when ",(0,s.kt)("inlineCode",{parentName:"p"},"authorizationAllowWildcardsMatching")," is set to ",(0,s.kt)("inlineCode",{parentName:"p"},"true")," in ",(0,s.kt)("inlineCode",{parentName:"p"},"broker.conf"),"."),(0,s.kt)("p",null,"e.g."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"\n$ pulsar-admin namespaces grant-permission test-tenant/ns1 \\\n                        --actions produce,consume \\\n                        --role 'my.role.*'\n\n")),(0,s.kt)("p",null,"Then, roles ",(0,s.kt)("inlineCode",{parentName:"p"},"my.role.1"),", ",(0,s.kt)("inlineCode",{parentName:"p"},"my.role.2"),", ",(0,s.kt)("inlineCode",{parentName:"p"},"my.role.foo"),", ",(0,s.kt)("inlineCode",{parentName:"p"},"my.role.bar"),", etc. can produce and consume.  "),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"\n$ pulsar-admin namespaces grant-permission test-tenant/ns1 \\\n                        --actions produce,consume \\\n                        --role '*.role.my'\n\n")),(0,s.kt)("p",null,"Then, roles ",(0,s.kt)("inlineCode",{parentName:"p"},"1.role.my"),", ",(0,s.kt)("inlineCode",{parentName:"p"},"2.role.my"),", ",(0,s.kt)("inlineCode",{parentName:"p"},"foo.role.my"),", ",(0,s.kt)("inlineCode",{parentName:"p"},"bar.role.my"),", etc. can produce and consume."),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"Note"),": A wildcard matching works at ",(0,s.kt)("strong",{parentName:"p"},"the beginning or end of the role name only"),"."),(0,s.kt)("p",null,"e.g."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"\n$ pulsar-admin namespaces grant-permission test-tenant/ns1 \\\n                        --actions produce,consume \\\n                        --role 'my.*.role'\n\n")),(0,s.kt)("p",null,"In this case, only the role ",(0,s.kt)("inlineCode",{parentName:"p"},"my.*.role")," has permissions.",(0,s.kt)("br",{parentName:"p"}),"\n","Roles ",(0,s.kt)("inlineCode",{parentName:"p"},"my.1.role"),", ",(0,s.kt)("inlineCode",{parentName:"p"},"my.2.role"),", ",(0,s.kt)("inlineCode",{parentName:"p"},"my.foo.role"),", ",(0,s.kt)("inlineCode",{parentName:"p"},"my.bar.role"),", etc. ",(0,s.kt)("strong",{parentName:"p"},"cannot")," produce and consume.")),(0,s.kt)(o.Z,{value:"REST API",mdxType:"TabItem"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://pulsar.apache.org/admin-rest-api#operation/grantPermissionOnNamespace?version=2.9.1&apiVersion=v2"},"POST /admin/v2/namespaces/:tenant/:namespace/permissions/:role"))),(0,s.kt)(o.Z,{value:"Java",mdxType:"TabItem"},(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-java"},"\nadmin.namespaces().grantPermissionOnNamespace(namespace, role, getAuthActions(actions));\n\n")))),(0,s.kt)("h2",{id:"get-permissions"},"Get permissions"),(0,s.kt)("p",null,"You can see which permissions have been granted to which roles in a namespace."),(0,s.kt)(i.Z,{defaultValue:"pulsar-admin",values:[{label:"pulsar-admin",value:"pulsar-admin"},{label:"REST API",value:"REST API"},{label:"Java",value:"Java"}],mdxType:"Tabs"},(0,s.kt)(o.Z,{value:"pulsar-admin",mdxType:"TabItem"},(0,s.kt)("p",null,"Use the ",(0,s.kt)("a",{parentName:"p",href:"reference-pulsar-admin#permissions"},(0,s.kt)("inlineCode",{parentName:"a"},"permissions"))," subcommand and specify a namespace:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},'\n$ pulsar-admin namespaces permissions test-tenant/ns1\n{\n  "admin10": [\n    "produce",\n    "consume"\n  ]\n}\n\n'))),(0,s.kt)(o.Z,{value:"REST API",mdxType:"TabItem"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://pulsar.apache.org/admin-rest-api#operation/getPermissions?version=2.9.1&apiVersion=v2"},"GET /admin/v2/namespaces/:tenant/:namespace/permissions"))),(0,s.kt)(o.Z,{value:"Java",mdxType:"TabItem"},(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-java"},"\nadmin.namespaces().getPermissions(namespace);\n\n")))),(0,s.kt)("h2",{id:"revoke-permissions"},"Revoke permissions"),(0,s.kt)("p",null,"You can revoke permissions from specific roles, which means that those roles will no longer have access to the specified namespace."),(0,s.kt)(i.Z,{defaultValue:"pulsar-admin",values:[{label:"pulsar-admin",value:"pulsar-admin"},{label:"REST API",value:"REST API"},{label:"Java",value:"Java"}],mdxType:"Tabs"},(0,s.kt)(o.Z,{value:"pulsar-admin",mdxType:"TabItem"},(0,s.kt)("p",null,"Use the ",(0,s.kt)("a",{parentName:"p",href:"reference-pulsar-admin.md#revoke-permission"},(0,s.kt)("inlineCode",{parentName:"a"},"revoke-permission"))," subcommand and specify a namespace and a role using the ",(0,s.kt)("inlineCode",{parentName:"p"},"--role")," flag:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"\n$ pulsar-admin namespaces revoke-permission test-tenant/ns1 \\\n  --role admin10\n\n"))),(0,s.kt)(o.Z,{value:"REST API",mdxType:"TabItem"},(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://pulsar.apache.org/admin-rest-api#operation/revokePermissionsOnNamespace?version=2.9.1&apiVersion=v2"},"DELETE /admin/v2/namespaces/:tenant/:namespace/permissions/:role"))),(0,s.kt)(o.Z,{value:"Java",mdxType:"TabItem"},(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-java"},"\nadmin.namespaces().revokePermissionsOnNamespace(namespace, role);\n\n")))))}v.isMDXComponent=!0}}]);