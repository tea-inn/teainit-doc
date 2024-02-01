# 快速开始

## 本地启动

拉取代码

```git
git clone https://github.com/tea-inn/teainit-frontend
```

安装依赖

```sh
npm install
```

启动

```sh
npm run dev
```

访问地址：http://localhost:8000

## 使用

### 请求方式

请求方式不写在 `requestConfig` 中了，在 proxy 中配置。

部署时就不需要改动，还可以配置其他环境，写在  `requestConfig` 中部署时就需要改为 `baseURL: ''`，部署完成需要重新改回来，会麻烦一些。

![image-20240201171330702](http://cdn.teainn.top/img/image-20240201171330702.png)

![image-20240201171038718](http://cdn.teainn.top/img/image-20240201171038718.png)

### 请求响应拦截处理

请求拦截，主要添加了请求头中的 token，后端用的是 `sa-token` 判断登录逻辑

![image-20240201171720095](http://cdn.teainn.top/img/image-20240201171720095.png)

响应拦截

里面 `data` 返回了后端返回的真实内容，不过需要 `return response`，而不是 `return data` ，return 出去的数据框架会去拿里面的 data

![image-20240201171834163](http://cdn.teainn.top/img/image-20240201171834163.png)

这里抛出异常，异常处理也在 `config.ts` 中配置

这里的方法是上面 `requestConfig.errorConfig` 调用的，将抛出的异常封装为 `BizError` ，然后继续抛出

![image-20240201172118977](http://cdn.teainn.top/img/image-20240201172118977.png)

来到 `errorHandler`  这里处理异常，主要讲这个 `message` ，因为 `message` 是一个静态方法，没有组件直接使用会报错，可以使用 `useMessge` 或者 `useApp` 去处理，不过 `ts` 中就不知道了

这里并不会捕获异常，在具体页面请求时，请求方法还是需要用 `try catch` 去捕获的

![image-20240201172905151](http://cdn.teainn.top/img/image-20240201172905151.png)

![image-20240201173332378](http://cdn.teainn.top/img/image-20240201173332378.png)

### 权限控制

在 `app.tsx` 中，每一次加载页面都会去拿 `CurrentUserVO`，里面存在 `perms` ，也就是权限，之后存入 `InitialState` 中

![image-20240201173900511](http://cdn.teainn.top/img/image-20240201173900511.png)

在 `access.ts` 中去定义权限标识，在路由中和组件中使用

![image-20240201174042725](http://cdn.teainn.top/img/image-20240201174042725.png)

在路由中，使用 `access: xxx`，例如`access: 'canSystemUserView',`

![image-20240201174132110](http://cdn.teainn.top/img/image-20240201174132110.png)

在组件中使用，例子 `<Access accessible={access.canSystemUserAdd || false}>`

![image-20240201174226442](http://cdn.teainn.top/img/image-20240201174226442.png)

### openAPI 问题

`openAPI` 会将类属性 `Long` 类型的转为 string，在 `.json` 中 int 为 int32，long 为 int64，然后将 int64 变为了 string，这会影响到后面在传参数时 ts 校验不通过，类型不一致，number 无法赋值给 string

![image-20240201174414881](http://cdn.teainn.top/img/image-20240201174414881.png)

![image-20240201174719895](http://cdn.teainn.top/img/image-20240201174719895.png)

我想将 string 改为 number，但下一次生成又会是 string，如果我把 total，current 这些原本是 number 的改为 string，我也感觉不太好，本就是 number，所有最后我直接 `// @ts-ignore`

这里再说一下结构赋值的问题，因为 openAPI 里面设置的返回类型是 `BaseResponsexxx` ，所以如果你在响应拦截中直接返回了 `data` 这里就会不一致，真正的数据类型和定义的不一致，所以我再响应拦截中直接返回，在这里使用结构赋值拿到 data，再重命名

![image-20240201174910976](http://cdn.teainn.top/img/image-20240201174910976.png)

### 适配

在 `ProTable` 中使用 `scroll` 可以提高手机对表格的适配，就不会出现手机端查看的时候，表格中字段挤在一起，无法正常使用

![image-20240201175229831](http://cdn.teainn.top/img/image-20240201175229831.png)

效果

![image-20240201175411411](http://cdn.teainn.top/img/image-20240201175411411.png)

