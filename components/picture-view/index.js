// components/picture/index.js
Component({
  /**
   * 组件的属性列表
	 * 父组件传入的值，相当于prop
   */
  properties: {
		url: {
			type: String,
      value: 'default value'
		}
  },

  /**
   * 私有数据-组件的初始数据
   */
  data: {
		currentId: '123',
		msg: 'hello world',
		student: {
			age: 18,
			name: 'lihua'
		}
	},
	
	// 组件声明周期
	// 自小程序基础库版本 2.2.3 起，组件的的生命周期也可以在 lifetimes 字段内进行声明（这是推荐的方式，其优先级最高）。
	lifetimes: {
		// 在组件实例刚刚被创建时执行, 此时还不能调用 setData
		created: function() {
			console.log(this.data); // 获取data数据，但properties数据还不能获取
		},
		// 页面已经创建好，执行一些初始化操作，如果获取数据、设置数据
    attached: function() {
			console.log(this.data); // 获取data数据
			this.setData({
        currentId: '456'
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
		// 提交自定义事件
		onTap: function(){
			const params = {
				type: 1
			}
      this.triggerEvent('myevent', params)
    }
	},
	
	// 数据监听
	observers: {
		'currentId': function(currentId) {
      console.log(currentId); // 456
    }
	}
})
