---
title: "API文档"
metaTitle: "API文档"
metaDescription: "API文档"
---
# Terminology
* APIVersion: api版本，包含Group和Version两个字段，代表api的使用群组和版本信息

* Resource: 由api操作的基础资源对象，每个基础资源对象包含基本属性和每个资源特有属性，基础属性包含id，资源类型type，资源链接links，创建时间creationTimestamp
  * Collection为相同类型Resource集合，Collection名字根据Resource名字自动生成，规则与英文单词复数一致
  	 * 如果Resource名字以字母s、ch、x结尾，加es
  	 * 如果Resource名字以字母y结尾，且y前面那个字母不是［aeiou］，将y变成i加es
  	 * 其他直接加s
  * 资源之间父子关系
    * 顶级资源: cluster user user_quota registry
    * cluster子资源：blockdevice  monitor  namespace  node  nodenetwork persistentvolume podnetwork  servicenetwork  storageclass storagecluster
    * namespace子资源:  application  chart  configmap  cronjob deployment daemonset ingress innerservice  job limitrange  outservice  persistentvolumeclaim  resourcequota  secret  service  statefulset udpingress
    * deployment/daemonset/satefulset子资源: pod
	
* Collection: 代表一组相同类型的Resource，当用户获取一种类型的所有Resource时，就会返回Collection，其中Collection的type为collection，字段resourceType为Data资源数组的资源类型，data为Resource资源对象数组

* Action: 对资源的一种操作，使用POST方式，但是又不是像POST添加资源的操作，例如Login这种特殊的操作，其中字段name为Action名字，input为Action的参数，output为Action返回的结果

* JSON Web Tokens（JWT）: 是一个开放标准（rfc 7519） 定义的一种紧凑的、自包含的方式在json对象之间安全地传输信息。因为它是数字签名的，所以它是可以验证并且可信的。jwt可以使用密钥（使用hmac算法）或使用rsa或ecdsa的公钥/私钥对进行签名。用户通过使用user的login接口，传递正确的用户名和密码哈希值获取token，密码的哈希算法是sha1，然后使用16进制编码，后续除login以外的请求都要带上token，服务端会根据token验证有效性。携带token的方式是设置HTTP Header的Authorization值，Authorization的值为 Bearer+空格+token，curl案例如下：

		curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"

# URL
  * 资源URL由groupPrefix、APIVersion和资源父子关系组成, 目前支持的groupPrefix只有/apis， APIVersion包含group和version两个字段，group目前只支持zcloud.cn，version为v1
  * 如果资源是顶级资源，没有父资源，如cluster，自动生成URL为 /apis/zcloud.cn/v1/clusters
  * 如果资源只有一个父资源，如namespace父资源为cluster，那么自动生成URL为 /apis/zcloud.cn/v1/clusters/cluster_id/namespaces
  * 如果资源有多个父资源，那么会自动生成多个URL， 如pod父资源有deployment、daemonset、statefulset，自动生成的URL为

  /apis/zcloud.cn/v1/clusters/cluster_id/namespaces/namespace_id/deployments/deployment_id/pods 
  /apis/zcloud.cn/v1/clusters/cluster_id/namespaces/namespace_id/daemonsets/daemonset_id/pods 
  /apis/zcloud.cn/v1/clusters/cluster_id/namespaces/namespace_id/statefulsets/statefulset_id/pods
    
# Operations

* Create Operation: 创建一个Resource
  * Request: 
    * HTTP Method: POST http://host/apis/zcloud.cn/v1/{collection_name}
    * Http Header 中使用Authorization Bearer方式携带用户密码 
    * body parameters: 所有参数定义fields中，如果有嵌套结构，则子字段放在subResources中
  * Response: 
    * status code: 201 Created 或者其他错误code
    * body: 返回一个Resource 
* Delete Operation: 删除一个已存在的Resource
   * Request: 
  	* HTTP Method: DELETE http://host/apis/zcloud.cn/v1/{collection_name}/{resource_id} 
  	* Http Header 中使用Authorization Bearer方式携带用户密码 
  * Response: 
    * status code: 204 No Content 或者其他错误code  
* Update Operation: 更新一个已存在的Resource属性，目前只支持全量更新
  * Request: 
  	* HTTP Method: PUT http://host/apis/zcloud.cn/v1/{collection_name}/{resource_id} 
  	* Http Header 中使用Authorization Bearer方式携带用户密码 
    * body parameters: 所有参数定义fields中，如果有嵌套结构，则子字段放在subResources中
  * Response: 
    * status code: 200 OK 或者其他错误code
    * body: 返回更新后的Resource 
* List Operation: 返回一种类型Resource的Collection
  * Request: 
  	* HTTP Method: GET http://host/apis/zcloud.cn/v1/{collection_name}
  	* Http Header 中使用Authorization Bearer方式携带用户密码 
  * Response: 
    * status code: 200 OK 或者其他错误code
    * body: 返回一个collection
* Get Operation: 获取一个Resource
  * Request: 
  	* HTTP Method: GET http://host/apis/zcloud.cn/v1/{collection_name}/{resource_id} 
  	* Http Header 中使用Authorization Bearer方式携带用户密码 
  * Response: 
    * status code: 200 OK 或者其他错误code
    * body: 返回一个Resource
* Action Operation: 执行一种action操作
  * Request:
    * HTTP Method: POST http://host/apis/zcloud.cn/v1/{collection_name}/{resource_id}?action={action_name}
    * Http Header 中使用Authorization Bearer方式携带用户密码 
    * body parameters: 一个object，定义需要的字段
  * Response: 
    * status code: 200 OK 或者其他错误code
    * body: 一个string

# Status Code
api的应答会包含Http status code，请求成功会返回2xx，请求失败会返回4xx或5xx

* 200 OK, 更新成功，Action操作成功，获取资源没有报错都返回200
* 201 Created，创建资源成功返回201
* 204 NoContent, 删除成功返回204
* 401 Unauthorized, 认证失败返回401
* 403 Forbidden，鉴权失败返回403
* 404 NotFound，资源未找到返回404
* 405 MethodNotAllow，资源不支持的操作返回405
* 409 Conflict，资源操作发生冲突返回409
* 422 UnprocessableEntity，其他错误返回422
* 500 InternalServerError，内部错误返回500
* 503 ClusterUnavailable， 集群不可用时返回503

# Links
  * 操作资源时response会有links字段返回，方便client快捷使用，如statefulset的id为sts123的资源links如下

		{
			"links": {
        		"collection": "http://host/apis/zcloud.cn/v1/clusters/beijing/namespaces/default/statefulsets",
        		"pods": "http://host/apis/zcloud.cn/v1/clusters/beijing/namespaces/default/statefulsets/sts123/pods",
        		"remove": "http://host/apis/zcloud.cn/v1/clusters/beijing/namespaces/default/statefulsets/sts123",
        		"self": "http://host/apis/zcloud.cn/v1/clusters/beijing/namespaces/default/statefulsets/sts123",
        		"update": "http://host/apis/zcloud.cn/v1/clusters/beijing/namespaces/default/statefulsets/sts123"
        		}
        	} 
   
  * links说明如下  		
    * 如果资源支持单个资源的get，即资源schema的ResourceMethods中设置了GET，links中就会包含self
    * 如果资源支持所有资源的list， 即资源schema的CollectionMethods中设置了GET，links中就会包含collection
    * 如果资源支持删除操作，即资源schema的ResourceMethods中设置了DELETE，links中就会包含remove
    * 如果资源支持更新操作，即资源schema的ResourceMethods中设置了PUT，links中就会包含update
    * 如果资源有子资源，如statefulset的是pod父资源，links中会包含pod的collection，即pods

# Resources
## User
user资源是顶级资源，没有父资源, Collection为users，只有admin用户才能创建、删除、更新普通用户, 且除登陆外的所有操作都需要通过认证才可以操作，所有优先介绍login操作 
#### Login
一个Action操作，登录singlecloud，获取认证token，此token用于其他所有api操作，admin的默认密码为zcloud，编码后为：0192309fba8c6f0929b5b00867ebccac9a39e34e

* Request

  * Http Request 
  
		POST /apis/zcloud.cn/v1/users/{user_id}?action=login
	
  * Body Parameters
  
		{
			"password": {"type": "string", "required": true, "description": "user password which hex encoding for sha1"}
    	}
  
* Response
  * Status Code

		200 OK
		
  * Body 
  
		{
			"token": {"type": "string"}
    	}
    	
#### ResetPassword
一个Action操作，修改用户名密码

* Request
  * Http Request

		POST /apis/zcloud.cn/v1/users/{user_id}?action=resetPassword
		Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  * Body Parameters

		{
			"oldPassword": {"type": "string", "required": true, "description": "old user password"},
			"newPassword": {"type": "string", "required": true, "description": "new user password"}
		}			 
* Response
  * Status Code

		200 OK
		 		
#### Create 
使用admin创建一个普通用户，创建时需要name和password，同时也可以设置用户有权限操作的cluster和namespace
* Request
  * Http Request 

		POST /apis/zcloud.cn/v1/users
		Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  * Body Parameters

		"fields": {
            "name": {"type": "string", "required": true, "description": "user name"},
            "password": {"type": "string", "required": true, "description": "user password"},
            "projects":  {"type": "array", "elemType": "project", "description": "user can access to cluster and namespace"}
        },  

        "subResources": {
            "project": {
                "cluster": {"type": "string", "required": true, "description": "cluster name"},
                "namespace": {"type": "string", "required": true, "description": "namespace name"}
            }   
        }     		
* Response
  * Status Code
		
		201 Created
  * Body

		"resourceFields": {
		    "id": {"type": "string"},
		    "type": {"type": "string"},
		    "links": {"type": "map"},
		    "creationTimestamp": {"type": "time"},
        	"name": {"type": "string"},
        	"password": {"type": "string"},
        	"projects": {"type": "array", "elemType": "project"}
    	},  

    	"subResources": {
    		"project": {
    	    	"cluster": {"type": "string"},
    	    	"namespace": {"type": "string"}
    		}   
    	}

#### Delete
使用admin删除一个普通用户

* Request
  * Http Request
  
		DELETE /apis/zcloud.cn/v1/users/{user_id}
		Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
* Response
  * Status Code

		204 No Content
		
#### Update
更新用户的password，也可以更新用户有权限操作的cluster和namespace

* Request
  * Http Request

		PUT /apis/zcloud.cn/v1/users/{user_id}
		Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  * Body Parameters

		 "fields": {
            "password": {"type": "string", "description": "user password"},
            "projects":  {"type": "array", "elemType": "project", "description": "user can access to cluster and namespace"}
        },

        "subResources": {
            "project": {
                "cluster": {"type": "string", "required": true, "description": "cluster name"},
                "namespace": {"type": "string", "required": true, "description": "namespace name"}
            }
        }
* Response
  * Status Code
	
		200 OK     	
  * Body
  
		"resourceFields": {
			"id": {"type": "string"},
		    "type": {"type": "string"},
		    "links": {"type": "map"},
		    "creationTimestamp": {"type": "time"},
        	"name": {"type": "string"},
        	"password": {"type": "string"},
        	"projects": {"type": "array", "elemType": "project"}
    	},  

    	"subResources": {
    		"project": {
    	    	"cluster": {"type": "string"},
    	    	"namespace": {"type": "string"}
    		}   
    	}

#### List
获取所有用户，type为collection，resourceType为user，links中为self link，data中是用户信息的数组

* Request
  * Http Request
  
		GET /apis/zcloud.cn/v1/users
		Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
* Response
  * Status Code

		200 OK
  * Body

		{
			"type": {"type":"string"},
			"resourceType": {"type": "string"},
			"links": { "type": "map"},
			"data":{"type": "array"}
		}
		
#### Get
获取指定用户的信息

* Request
  * Http Request
  
		GET /apis/zcloud.cn/v1/users/{user_id}
		Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
* Response
  * Status Code

		200 OK
  * Body

		"resourceFields": {
			"id": {"type": "string"},
		    "type": {"type": "string"},
		    "links": {"type": "map"},
		    "creationTimestamp": {"type": "time"},
        	"name": {"type": "string"},
        	"password": {"type": "string"},
        	"projects": {"type": "array", "elemType": "project"}
    	},  

    	"subResources": {
    		"project": {
    	    	"cluster": {"type": "string"},
    	    	"namespace": {"type": "string"}
    		}   
    	}

## Namespace
namespace是cluster的子资源，Collection为namespaces，只有admin用户才能创建和删除namespace

#### Create 
使用admin创建一个namespace
* Request
  * Http Request 

		POST /apis/zcloud.cn/v1/clusters/{cluster_id}/namespaces
		Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  * Body Parameters

		"fields": {
            "name": {"type": "string", "required": true, "description": "namespace name"}
        } 
	
* Response
  * Status Code
		
		201 Created
  * Body

		"resourceFields": {
			"id": {"type": "string"},
		    "type": {"type": "string"},
		    "links": {"type": "map"},
		    "creationTimestamp": {"type": "time"},
        	"name": {"type": "string"}
    	} 

#### Delete
使用admin删除一个namespace

* Request
  * Http Request
  
		DELETE /apis/zcloud.cn/v1/clusters/{cluster_id}/namespaces/{namespace_id}
		Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
* Response
  * Status Code

		204 No Content
		
#### List
获取指定cluster下的所有namespace，type为collection，resourceType为namespace，links中为self link，data中是namespace的数组

* Request
  * Http Request
  
		GET /apis/zcloud.cn/v1/clusters/{cluster_id}/namespaces
		Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
* Response
  * Status Code

		200 OK
  * Body

		{
			"type": {"type":"string"},
			"resourceType": {"type": "string"},
			"links": { "type": "map"},
			"data":{"type": "array"}
		}
		
#### Get
获取指定namespace信息

* Request
  * Http Request
  
		GET /apis/zcloud.cn/v1/clusters/{cluster_id}/namespaces/{namespace_id}
		Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
* Response
  * Status Code

		200 OK
  * Body

		"resourceFields": {
			"id": {"type": "string"},
		    "type": {"type": "string"},
		    "links": {"type": "map"},
		    "creationTimestamp": {"type": "time"},
        	"name": {"type": "string"}
    	}

## Deployment
deployment是namespace的子资源，Collection为deployments，除了支持增删改查外，还支持版本升级、版本会滚、版本历史Action

#### Create 
创建指定cluster和namespace下的deployment
* Request
  * Http Request 

		POST /apis/zcloud.cn/v1/clusters/{cluster_id}/namespaces/{namespace_id}/deployments
		Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  * Body Parameters

		"fields": {
            "name": {"type": "string", "required": true, "description": "deployment name"},
            "replicas": {"type": "int", "required": true, "description": "replicas num"},
            "containers":  {"type": "array", "elemType": "container", "required": true, "description": "container info array"},
            "advancedOptions": {"type": "advancedOptions", "description": "deployment advanced options"},
            "persistentVolumes": {"type": "array", "elemType": "persistentVolume", "description": "deployment persistent volumes"}
        },

        "subResources": {
            "container": {
                "name": {"type": "string", "required": true, "description": "container name"},
                "image": {"type": "string", "required": true, "description": "container image"},
                "command": {"type": "array", "elemType": "string", "description": "container command"},
                "args": {"type": "array", "elemType": "string", "description": "container command args"},
                "exposedPorts":{"type": "array", "elemType": "containerPort", "description": "container exported ports"},
                "env": {"type": "array", "elemType": "envVar", "description": "container environment variables"},
                "volumes": {"type": "array", "elemType": "volume", "description": "volumes which mount by container"}
            },
    
            "volume": {
                "type": {"type": "enum", "validValues": ["configmap", "secret", "persistentVolume"], "description": "volume type, only support configmap/secret/persitentVolume"},
                "name": {"type": "string", "description": "volume name"},
                "mountPath": {"type": "string", "description": "volume mount path"}
            },
    
            "envVar": {
                "name": {"type": "string", "description": "env name"},
                "value": {"type": "string", "description": "env value"}
            },
    
            "containerPort": {
                "name" : {"type": "string", "description": "container exported port name"},
                "port" : {"type": "int", "required": true, "description": "container exported port"},
                "protocol": {"type": "enum", "validValues": ["TCP", "UDP"], "required": true, "description": "container exported port protocol"}
            },
		    "advancedOptions": {
                "deletePVsWhenDeleteWorkload": {"type": "bool", "description": "whether delete pvcs when delete workload"},
                "reloadWhenConfigChange": {"type": "bool", "description": "whether reload when config change"},
                "exposedMetric": {"type": "exposedMetric", "description": "exposed metric"}
            },
    
            "exposedMetric": {
                "path" : {"type": "string", "description": "exposed metric path"},
                "port" : {"type": "int", "description": "exposed metric port"}
            },
    
            "persistentVolume": {
                "name": {"type": "string", "description": "persistent volume name"},
                "size": {"type": "string", "description": "persistent volume size"},
                "storageClassName": {"type": "enum", "validValues": ["lvm", "nfs", "temporary", "cephfs"], "description": "storageclass which used by persistent volume"}
            }
        }


​		
* Response
  * Status Code
		
		201 Created
  * Body

		"resourceFields": {
			"id": {"type": "string"},
		    "type": {"type": "string"},
		    "links": {"type": "map"},
		    "creationTimestamp": {"type": "time"},
        	"name": {"type": "string"},
        	"replicas": {"type": "int"},
        	"containers": {"type": "array", "elemType": "container"},
        	"advancedOptions": {"type": "advancedOptions"},
        	"persistentVolumes": {"type": "array", "elemType": "persistentVolume"}
    	},
    	"subResources": {
        	"container": {
            	"name": {"type": "string"},
            	"image": {"type": "string"},
            	"command": {"type": "array", "elemType": "string"},
            	"args": {"type": "array", "elemType": "string"},
            	"exposedPorts":{"type": "array", "elemType": "containerPort"},
            	"env": {"type": "array", "elemType": "envVar"},
            	"volumes": {"type": "array", "elemType": "volume"}
        	},

        	"volume": {
            	"type": {"type": "enum", "validValues": ["configmap", "secret", "persistentVolume"]},
            	"name": {"type": "string"},
            	"mountPath": {"type": "string"}
        	},
    
        	"envVar": {
            	"name": {"type": "string"},
            	"value": {"type": "string"}
        	},
    
        	"containerPort": {
            	"name" : {"type": "string"},
            	"port" : {"type": "int"},
            	"protocol": {"type": "enum", "validValues": ["tcp", "udp"]}
        	},
    
        	"advancedOptions": {
            	"deletePVsWhenDeleteWorkload": {"type": "bool"},
            	"reloadWhenConfigChange": {"type": "bool"},
            	"exposedMetric": {"type": "exposedMetric"}
        	},
        	"exposedMetric": {
            	"path" : {"type": "string"},
            	"port" : {"type": "int"}
        	},
    
        	"persistentVolume": {
            	"name": {"type": "string"},
            	"size": {"type": "string"},
            	"storageClassName": {"type": "enum", "validValues": ["lvm", "nfs", "temporary", "cephfs"]}
        	}
        }


#### Delete
删除一个指定cluster和namespace下的deployment

* Request
  * Http Request
  
		DELETE /apis/zcloud.cn/v1/clusters/{cluster_id}/namespaces/{namespace_id}/deployments/{deployment_id}
		Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
* Response
  * Status Code

		204 No Content

#### Update
更新指定cluster和namespace下的一个deployment的replicas

* Request
  * Http Request
  
		PUT /apis/zcloud.cn/v1/clusters/{cluster_id}/namespaces/{namespace_id}/deployments/{deployment_id}
		Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  * Body Parameters
  
		{
			"replicas": {"type": "int", "required": true, "description": "replicas num"}
		}
* Response
  * Status Code

		200 OK
  * Body

		"resourceFields": {
			"id": {"type": "string"},
		    "type": {"type": "string"},
		    "links": {"type": "map"},
		    "creationTimestamp": {"type": "time"},
        	"name": {"type": "string"},
        	"replicas": {"type": "int"},
        	"containers": {"type": "array", "elemType": "container"},
        	"advancedOptions": {"type": "advancedOptions"},
        	"persistentVolumes": {"type": "array", "elemType": "persistentVolume"}
    	},
    	"subResources": {
        	"container": {
            	"name": {"type": "string"},
            	"image": {"type": "string"},
            	"command": {"type": "array", "elemType": "string"},
            	"args": {"type": "array", "elemType": "string"},
            	"exposedPorts":{"type": "array", "elemType": "containerPort"},
            	"env": {"type": "array", "elemType": "envVar"},
            	"volumes": {"type": "array", "elemType": "volume"}
        	},

        	"volume": {
            	"type": {"type": "enum", "validValues": ["configmap", "secret", "persistentVolume"]},
            	"name": {"type": "string"},
            	"mountPath": {"type": "string"}
        	},
    
        	"envVar": {
            	"name": {"type": "string"},
            	"value": {"type": "string"}
        	},
    
        	"containerPort": {
            	"name" : {"type": "string"},
            	"port" : {"type": "int"},
            	"protocol": {"type": "enum", "validValues": ["tcp", "udp"]}
        	},
    
        	"advancedOptions": {
            	"deletePVsWhenDeleteWorkload": {"type": "bool"},
            	"reloadWhenConfigChange": {"type": "bool"},
            	"exposedMetric": {"type": "exposedMetric"}
        	},
        	"exposedMetric": {
            	"path" : {"type": "string"},
            	"port" : {"type": "int"}
        	},
    
        	"persistentVolume": {
            	"name": {"type": "string"},
            	"size": {"type": "string"},
            	"storageClassName": {"type": "enum", "validValues": ["lvm", "nfs", "temporary", "cephfs"]}
        	}
        }

		
#### List
获取指定cluster和namespace下的所有deployment，type为collection，resourceType为deployment，links中为self link，data中是deployment的数组

* Request
  * Http Request
  
		GET /apis/zcloud.cn/v1/clusters/{cluster_id}/namespaces/{namespace_id}/deployments
		Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
* Response
  * Status Code

		200 OK
  * Body

		{
			"type": {"type":"string"},
			"resourceType": {"type": "string"},
			"links": { "type": "map"},
			"data":{"type": "array"}
		}
		
#### Get
获取指定cluster和namespace下的一个deployment信息

* Request
  * Http Request
  
		GET /apis/zcloud.cn/v1/clusters/{cluster_id}/namespaces/{namespace_id}/deployments/{deployment_id}
		Authorization Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
* Response
  * Status Code

		200 OK
  * Body

		"resourceFields": {
			"id": {"type": "string"},
		    "type": {"type": "string"},
		    "links": {"type": "map"},
		    "creationTimestamp": {"type": "time"},
        	"name": {"type": "string"},
        	"replicas": {"type": "int"},
        	"containers": {"type": "array", "elemType": "container"},
        	"advancedOptions": {"type": "advancedOptions"},
        	"persistentVolumes": {"type": "array", "elemType": "persistentVolume"}
    	},
    	"subResources": {
        	"container": {
            	"name": {"type": "string"},
            	"image": {"type": "string"},
            	"command": {"type": "array", "elemType": "string"},
            	"args": {"type": "array", "elemType": "string"},
            	"exposedPorts":{"type": "array", "elemType": "containerPort"},
            	"env": {"type": "array", "elemType": "envVar"},
            	"volumes": {"type": "array", "elemType": "volume"}
        	},

        	"volume": {
            	"type": {"type": "enum", "validValues": ["configmap", "secret", "persistentVolume"]},
            	"name": {"type": "string"},
            	"mountPath": {"type": "string"}
        	},
    
        	"envVar": {
            	"name": {"type": "string"},
            	"value": {"type": "string"}
        	},
    
        	"containerPort": {
            	"name" : {"type": "string"},
            	"port" : {"type": "int"},
            	"protocol": {"type": "enum", "validValues": ["tcp", "udp"]}
        	},
    
        	"advancedOptions": {
            	"deletePVsWhenDeleteWorkload": {"type": "bool"},
            	"reloadWhenConfigChange": {"type": "bool"},
            	"exposedMetric": {"type": "exposedMetric"}
        	},
        	"exposedMetric": {
            	"path" : {"type": "string"},
            	"port" : {"type": "int"}
        	},
    
        	"persistentVolume": {
            	"name": {"type": "string"},
            	"size": {"type": "string"},
            	"storageClassName": {"type": "enum", "validValues": ["lvm", "nfs", "temporary", "cephfs"]}
        	}
        }


