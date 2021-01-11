<template>
  <div id="app">
    <dv-full-screen-container style="background: #000d4a url(http://localhost:3002/static/images/bg.jpg) center top;">
      <!-- 初始化loading -->
      <dv-loading v-if="loading" class="white">初始化中....</dv-loading>
      <!-- 主页 -->
      <div v-else class="content white">
        <!-- headder -->
        <Row>
            <Col span="24" style="display: flex;justify-content: center;">
              <dv-decoration-8 style="width:300px;height:50px;" />
              <div class="title">
                赛格国际+ 实时销售数据统计台
                <dv-decoration-5 style="width:800px;height:40px;margin:auto;" />
              </div>
              <dv-decoration-8 :reverse="true" dur='2' style="width:300px;height:50px;" />
            </Col>
        </Row>
        <!-- body -->
        <!-- centermsg -->
        <div class="centerbox">
          <div class="centercell" v-for="(item,index) in basedata" v-bind:key="index">
            <dv-border-box-10 style="text-align: center;">
              <div>{{item.name}}</div>
              <dv-digital-flop :config="item.value" style="height:100px;" />
            </dv-border-box-10>
          </div>
        </div>
        <!-- echarts -->
        <Row>
            <Col span="6">
              <!-- 历史销量 -->
              <div class="cellbox">
                <dv-border-box-11  title="历史销量TOP10" v-if="top10data.data" style="padding:45px 10px 0;">
                  <div>
                    <dv-capsule-chart :config="top10data" />
                  </div>
                </dv-border-box-11>
              </div>
              <div class="cellbox">
              </div>
            </Col>
            <Col span="12">
              <div class="cellbox">
                <dv-border-box-1 :color="['#1232cb', '#2c9ea4']"><dv-charts :option="nowdaydata" style="height:400px;width:auto;" /></dv-border-box-1>
                  
              </div>
            </Col>
            <Col span="6">
              <div class="cellbox">
                <dv-border-box-12>dv-border-box-8</dv-border-box-12>
              </div>
            </Col>
        </Row>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data(){
    return {
      loading:false,
      top10data:{},
      locationdata:{},
      nowdaydata:{},
      basedata:[
        {name:'总销售额',value:{number: [123456],toFixed: 2,content: '{nt}元'}},
        {name:'今日销售额',value:{number: [123456],toFixed: 2,content: '{nt}元'}},
        {name:'总销售额',value:{number: [123456],toFixed: 2,content: '{nt}元'}},
        {name:'总销售额',value:{number: [123456],toFixed: 2,content: '{nt}元'}},
        {name:'总销售额',value:{number: [123456],toFixed: 2,content: '{nt}元'}},
      ]
    }
  },
  created(){
    this.top10();
    this.location_province();
    this.nowday();
  },
  methods:{
    nowday:function(){
      let that = this;
      this.axios.get('http://localhost:3002/echarts1').then(res=>{
        that.loading = false;
        var data = [];
        var value = 0;
        for(let i=0;i<res.data.length;i++){
            if(res.data[i].time.slice(0,2)==(i+value)){
                data.push(res.data[i].sellmoney)
            }else{
                var addlength = res.data[i].time.slice(0,2) - (i+value);
                for(let i=0;i<addlength;i++){
                    data.push(0);
                }
                value = addlength+value
                data.push(res.data[i].sellmoney)
            }
        }
        that.nowdaydata = {
          title: {
            text: '今日销售曲线',
            style:{
              fill: '#fff',
              fontSize: 20
            }
          },
          xAxis: {
            name: '时间',
            data: ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00','13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
            axisLine:{
              show:true,
              style:{
                stroke: 'rgba(4,33,139,.68)',
                lineWidth: 1
              }
            },
            axisTick:{
              show:true,
              style:{
                stroke: 'rgba(4,33,139,.68)',
                lineWidth: 1
              }
            },
            axisLabel:{
              show:true,
              style:{
                fill: 'rgba(255,255,255,.74)',
                fontSize: 10
              },
              formatter:{value}
            },
            nameTextStyle:{
              fill: '#fff',
              fontSize: 10
            }
          },
          yAxis: {
            name: '销售额',
            data: 'value',
            nameTextStyle:{
              fill: '#fff',
              fontSize: 10
            },
            min:0,
            axisLine:{
              show:true,
              style:{
                stroke: 'rgba(4,33,139,.68)',
                lineWidth: 1
              }
            },
            axisTick:{
              show:true,
              style:{
                stroke: 'rgba(4,33,139,.68)',
                lineWidth: 1
              }
            },
            axisLabel:{
              show:true,
              style:{
                fill: 'rgba(255,255,255,.74)',
                fontSize: 10
              },
              formatter:{value}
            },
            splitLine:{
              show:true,
              style:{
                stroke: 'rgba(4,33,139,.68)',
                lineWidth: 1
              }
            }
          },
          series: [
            {
              data: data,
              type: 'line',
              smooth: true,
              lineArea: {
                show: true,
                gradient: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)']
              }
            }
          ]
        };
      })
    },
    top10:function(){
      var that = this;
      this.axios.get('http://localhost:3002/top10').then(res=>{
        let data = []
        for(let i=0;i<res.data.length;i++){
          var obj = new Object;
          obj.name = res.data[i].日期
          obj.value = res.data[i].销售额
          data.push(obj);
        }
        that.top10data = {data:data}
      })
    },
    location_province:function(){
      var that = this;
      that.axios.get('http://localhost:3002/location_province').then(res=>{
        console.log(res.data)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(26 39 101);
  margin-top: 60px;
}
.white{
  color:white
}
.title{
  font-size: 37px;
  width: 1300px;
  /* height: 130px; */
  margin: auto;
  display: inline-block;
  padding: 0 20px;
  font-family: serif;
  position: relative;
}
.cellbox{
    /* padding: 15px; */
    background: rgba(0,0,0,.2);
    position: relative;
    margin-bottom: 15px;
    z-index: 10;
    margin: 10px;
}
.cellbox .celltitle{
  font-size: 22px;
  padding: 5px 25px;
  margin-bottom: 10px;
}
.centerbox{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.centerbox .centercell{
  margin: 10px;
  padding: 15px;
  background: rgba(0,0,0,.2);
  flex:auto;
}
.centerbox  .centercell div{
  font-size: 25px;
  padding: 10px;
}
</style>
