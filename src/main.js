import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
//
import 'mavon-editor/dist/css/index.css'


import './assets/styles/element-variables.scss'
// global css
import './assets/styles/index.scss'

// 代码高亮
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'

import App from './App'
import store from './store'
import router from './router'

import './permission' // permission control
import 'echarts-gl'
import VueAMap from 'vue-amap'
import { parseTime, resetForm, handleTree,toTree} from '@/utils/ruoyi'
import { DICT_TYPE, getDictDataLabel, getDictDatas, getDictDatas2 } from '@/utils/dict'
// 复制功能
import VueClipboard from 'vue-clipboard2'
import axios from 'axios' // 实现 form generator 使用自己定义的 axios request 对象

Vue.use(VueHighlightJS)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: localStorage.getItem('size') || 'medium' // set element-ui default size
})

Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '8c13deb2c2075f14ae44df78af1405ec',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geocoder'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})

Vue.use(VueClipboard)

// 全局方法挂载
Vue.config.productionTip = false
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.handleTree = handleTree
Vue.prototype.toTree = toTree
Vue.prototype.getDictDatas = getDictDatas
Vue.prototype.getDictDataLabel = getDictDataLabel
Vue.prototype.getDictDatas2 = getDictDatas2
Vue.prototype.DICT_TYPE = DICT_TYPE
Vue.prototype.$axios = axios
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
