# GMP JS Framework

### 1. 起步
* hello world 
 
```
<div id="app">
  <%=message%>
</div>

```

```

new GMP({
  el: '#app',
  data: {
    message: 'Hello GMP.js!'
  }
})

```

```
Hello GMP.js!
```

* 渲染列表

```

	<div id="app">
	  <ul>
	    <%for (var i=0,len=todo.length;i<len;i++) {%>
		    <li>
		      <%=todo[i].text%>
		    </li>
	    <%}%>
	  </ul>
	</div>

```

```
	new GMP({
	  el: '#app',
	  data: {
	    todos: [
	      { text: '快来玩国美+' },
	      { text: '轻轻松松赚钱' },
	      { text: '快快乐乐分享' }
	    ]
	  }
	})

```

```
快来玩国美+  
轻轻松松赚钱  
快快乐乐分享  
```
综合
请参考TodoList
### GMP实例
每个 GMP.js 应用的起步都是通过构造函数 GMP 创建一个 GMP 的根实例：

```
	var vm = new GMP({
  			// 选项
  })

```

在实例化 GMP 时，需要传入一个选项对象，它可以包含数据、模板、挂载元素、方法、生命周期钩子等选项。
### 属性
```
el: app的id
data: app数据
events: 事件注册
init: 初始化方法
els: 页面元素对象
template: 模板对象
destroy: 销毁app
$el: 组件的jquery/zepto对象
appName: app名称
```
### 生命周期

### 事件绑定

```
<div id="example">
  <button id="btn">Hello</button>
</div>

```
我们绑定了一个单击事件处理器到一个方法 hello。下面在 GMP 实例中定义这个方法
```
var vm = new GMP({
  el: '#example',
  data: {
    name: 'GMP.js'
  },
  events:{
  		'click #btn': 'hello'
  },
  // 在 `methods` 对象中定义方法
	hello: function (event) {
	 // 方法内 `this` 指向 vm
	 alert('Hello ' + this.name + '!')
	 // `event` 是原生 DOM 事件
	 alert(event.target.tagName)
	}
})

// 也可以在 JavaScript 代码中调用方法
vm.hello() // -> 'Hello GMP.js!'
```
### 模板
模板解析使用最简单的方式，<%%>以上两种标记间写js代码即可
```
	<%js代码%>  
	<%=属性%>
```
### 统一数据中心
目前这个很简单，相当于只是个全局对象
```
var g = new GMP.GMPX({
	//属性
})
```
### 事件Bus

```
GMP.GMPEvents.on(eventsName,callback,context);// 注册
GMP.GMPEvents.trigger(eventsName,args);//触发
GMP.GMPEvents.off(eventsName,callback,context);//移除
```

