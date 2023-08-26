<template>
  <el-dialog top="5vh" :append-to-body="true" title="获取地图坐标" :visible.sync="dialogVisible" :before-close="handleClose" width="1000px">
    <div class="amap-page-container">
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult" />
      <div class="toolbar">
        当前坐标: {{ lng }}, {{ lat }}
        address: {{ address }}
        <el-button type="primary" @click="select">确定</el-button>

      </div>
      <el-amap
        vid="amapDemo2"
        :center="mapCenter"
        :zoom="zoom"
        class="amap-demo"
        :events="events"
        :plugin="plugin"
      >
        <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker.position" />
      </el-amap>

    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'AmapPosition',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    makerPosition: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data: function() {
    const self = this
    return {
      zoom: 12,
      center: [0, 0],
      address: '',
      markers: [
        {
          position: this.makerPosition
        }
      ],
      searchOption: {
        city: '上海',
        citylimit: false
      },
      mapCenter: [121.59996, 31.197646],
      plugin: [{
        pName: 'ToolBar',
        events: {
          init(instance) {
          }
        }
      }],
      events: {
        click(e) {
          const { lng, lat } = e.lnglat
          self.lng = lng
          self.lat = lat
          self.markers[0].position = [lng, lat]
          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })

          geocoder.getAddress([lng, lat], function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                self.address = result.regeocode.formattedAddress
                self.$nextTick()
              }
            }
          })
        }
      },
      lng: 0,
      lat: 0
    }
  },
  created() {
    this.mapCenter = this.makerPosition
    this.lng = this.makerPosition[0]
    this.lat = this.makerPosition[1]
  },
  methods: {
    onSearchResult(pois) {
      let latSum = 0
      let lngSum = 0
      if (pois.length > 0) {
        pois.forEach(poi => {
          const { lng, lat } = poi
          lngSum += lng
          latSum += lat
        })
        const center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        }
        this.mapCenter = [center.lng, center.lat]
      }
    },
    handleClose(done) {
      this.$emit('update:dialogVisible', false)
      this.$nextTick(() => {
        done()
      })
    },
    select() {
      this.$emit('update:dialogVisible', false)
      this.$emit('update:makerPosition', this.markers[0].position)
      this.$emit('update:makerPositionAddress', this.address)
    }
  }

}
</script>

<style lang="scss" scoped>
.amap-demo {
  height: 450px;
}
.search-box {
  z-index: 999;
  margin-bottom: 20px;
}
.amap-page-container {
  position: relative;
}
</style>
