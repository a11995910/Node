<template>
  <div id="app">
    <dv-full-screen-container style="background: #000d4a url(http://localhost:3002/static/images/bg.jpg) no-repeat;background-size:cover;position: relative;">
      <!-- 初始化loading -->
      <dv-loading v-if="loading" class="white">初始化中....</dv-loading>
      <!-- 主页 -->
      <div v-else class="content white">
        <!-- headder -->
        <Row>
            <Col span="24" style="display: flex;justify-content: center;">
              <dv-decoration-8 style="width:300px;height:40px;" />
              <div class="title">
                赛格国际+ 实时销售数据统计台
                <dv-decoration-5 style="width:800px;height:30px;margin:auto;" />
              </div>
              <dv-decoration-8 :reverse="true" dur='2' style="width:300px;height:40px;" />
            </Col>
        </Row>
        <!-- body -->
        <!-- centermsg -->
        <div class="centerbox">
          <div class="centercell" v-for="(item,index) in basedata" v-bind:key="index">
            <dv-border-box-10 style="text-align: center;">
              <div style="padding-top:2vh;">{{item.name}}</div>
              <dv-digital-flop :config="item.value" style="height:auto;max-width:300px;margin:auto;" />
            </dv-border-box-10>
          </div>
          <div class="centercell">
            <dv-border-box-8 style="text-align: center;padding:10px;">
              <div>市外订单占比</div>
              <dv-decoration-9 style="max-width:300px;height:170px;font-size:30px;font-weight:600;">{{xianinoutdata}}</dv-decoration-9>
            </dv-border-box-8>
          </div>
        </div>
        <!-- echarts -->
        <Row>
            <Col span="6">
              <!-- 历史销量 -->
              <div class="cellbox">
                <dv-border-box-11  title="历史销量TOP10" v-if="top10data.data" style="padding:45px 10px 0;">
                  <div>
                    <dv-capsule-chart :config="top10data" style="height:27vh;" />
                  </div>
                </dv-border-box-11>
              </div>
              <!-- 总销量排行 -->
              <div class="cellbox">
                <dv-border-box-11  title="总销量情况" v-if="top10data.data" style="padding:55px 10px 0;">
                <Table  ref="currentRowTable" :columns="allkind.columns" :data="allkind.data"></Table>
                </dv-border-box-11>
              </div>
            </Col>
            <Col span="12">
            <!-- 今日销售曲线 -->
              <div class="cellbox">
                <dv-border-box-1 :color="['#1232cb', '#2c9ea4']"><dv-charts :option="nowdaydata" style="height:35vh;width:auto;" /></dv-border-box-1>
              </div>
            <!-- 今年月销售情况 -->
              <div class="cellbox">
                <dv-border-box-1 :color="['#1232cb', '#2c9ea4']"><dv-charts :option="nowyeardata" style="height:35vh;width:auto;" /></dv-border-box-1>
              </div>
            </Col>
            <Col span="6">
            <div class="cellbox">
              <!-- 实时销售数据 -->
                <dv-border-box-13 style="padding:25px 10px 20px;">
                  <div>
                    <dv-scroll-board :config="config" style="width:auto;height:25vh;" />
                  </div>
                </dv-border-box-13>
              </div>
              <div class="cellbox">
                <!-- 今日销售分布 -->
                <dv-border-box-12><dv-charts :option="nowdayKindsdata" style="width:auto;height:30vh;" /></dv-border-box-12>
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
        {name:'总销售额',value:{number: [0],toFixed: 2,content: '{nt}元',style:{fontSize:35}}},
        {name:'当月销售额',value:{number: [0],toFixed: 2,content: '{nt}元',style:{fontSize:35}}},
        {name:'今日销售额',value:{number: [0],toFixed: 2,content: '{nt}元',style:{fontSize:35}}},
        {name:'总销售额',value:{number: [0],toFixed: 2,content: '{nt}元',style:{fontSize:35}}},
        {name:'总销售额',value:{number: [0],toFixed: 2,content: '{nt}元',style:{fontSize:35}}},
      ],
      xianinoutdata:0,
      nowdayKindsdata:{},
      config:{
        header: ['下单时间', '品名', '金额','会员id'],
        data: [
          ['2020-01-10', '纪梵希小羊皮', '2200','8268'],
          ['2020-01-10', '纪梵希小羊皮', '2200','8268'],
          ['2020-01-10', '纪梵希小羊皮', '2200','8268'],
          ['2020-01-10', '纪梵希小羊皮', '2200','8268'],
          ['2020-01-10', '纪梵希小羊皮', '2200','8268'],
          ['2020-01-10', '纪梵希小羊皮', '2200','8268'],
          ['2020-01-10', '纪梵希小羊皮', '2200','8268'],
          ['2020-01-10', '纪梵希小羊皮', '2200','8268']
        ],
        rowNum:4,
        headerHeight:30,
        align:1,
        hoverPause:false
      },
      allkind:{
        columns:[{
                        type: '排行',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '品类',
                        key: 'name'
                    },
                    {
                        title: '销售额（元）',
                        key: 'value'
                    },
                    {
                        title: '笔数',
                        key: 'count'
                    }
        ],
        data:[]
      },
      nowyeardata:{}
    }
  },
  created(){
    this.reloading();
  },
  methods:{
    // 周期获取数据，60s间隔
    reloading:function(){
      this.top10();
      // this.location_province();
      this.nowday();
      this.nowdayKinds();
      this.all_kinds();
      this.nowyear();
      this.xianinout();
      this.naixn();
      setTimeout(()=>{this.reloading()},60000)
    },
    // 今日数据
    nowday:function(){
      let that = this;
      this.axios.get('http://localhost:3002/echarts1').then(res=>{
        that.loading = false;
        var data = [];
        var value = 0;
        var count = 0;
        for(let i=0;i<res.data.length;i++){
            count+=res.data[i].sellmoney;
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
                lineWidth: 1,
                fontSize: 17
              }
            },
            axisTick:{
              show:true,
              style:{
                stroke: 'rgba(4,33,139,.68)',
                lineWidth: 1,
                fontSize: 17
              }
            },
            axisLabel:{
              show:true,
              style:{
                fill: 'rgba(255,255,255,.74)',
                fontSize: 15
              },
              formatter:{value}
            },
            nameTextStyle:{
              fill: '#fff',
              fontSize: 15
            }
          },
          yAxis: {
            name: '销售额',
            data: 'value',
            nameTextStyle:{
              fill: '#fff',
              fontSize: 17
            },
            min:0,
            axisLine:{
              show:true,
              style:{
                stroke: 'rgba(4,33,139,.68)',
                lineWidth: 1,
              fontSize: 17
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
                fontSize: 17
              },
              formatter:{value}
            },
            splitLine:{
              show:true,
              style:{
                stroke: 'rgba(4,33,139,.68)',
                lineWidth: 1,
              fontSize: 17
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
        that.$set(that.basedata,2, {name:'今日销售额',value:{number: [count],toFixed: 2,content: '{nt}元',style:{fontSize:35}}})

      })
    },
    //今日品类数据
    nowdayKinds:function(){
      let that = this;
      that.axios.get('http://localhost:3002/nowdayKindsDate').then(res=>{
        var config = {
          title: {
            text: '今日销售分布情况',
            style:{
              fill: '#fff',
              fontSize: 25
            }
          },
          series: [
            {
              type: 'pie',
              data: [],
              radius: ['30%', '50%'],
              insideLabel: {show: true,style:{fill: '#fff',fontSize: 19}},
              outsideLabel:{labelLineBendGap:'40%',style:{fontSize: 20}},
              // roseType: true,
              roseSort : true
            }
          ]
        }
        
        for(let i=0;i<res.data.length;i++){
            let obj = { name: res.data[i].name,value:res.data[i].销售额};
            config.series[0].data.push(obj);
        }
        that.nowdayKindsdata = config;
      })
    },
    //历史top10 销量
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
    //地理位置销量分布
    location_province:function(){
      var that = this;
      that.axios.get('http://localhost:3002/location_province').then(res=>{
        console.log(res.data);
      })
    },
    //总销售排行
    all_kinds:function(){
      var that = this;
      that.axios.get('http://localhost:3002/all_kinds').then(res=>{
        let data = [];
        let count = 0;
        for(let i=0;i<res.data.length;i++){
          var obj = new Object;
          obj.name = res.data[i].name
          obj.value = res.data[i].销售额
          obj.count = res.data[i].笔数
          data.push(obj);
          count+=res.data[i].销售额
        }
        that.allkind.data = data;
        that.$set(that.basedata,0, {name:'总销售额',value:{number: [count],toFixed: 2,content: '{nt}元',style:{fontSize:35}}})

      })
    },
    //当年个月份销售
    nowyear:function(){
      var that = this;
      that.axios.get('http://localhost:3002/verbmonth').then(res=>{
        that.nowyeardata = {
          title: {
            text: '本年各月份销售',
            style:{
              fill: '#fff',
              fontSize: 20
            }
          },
          xAxis: {
            name: '月份',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
                fontSize: 15
              }
            },
            nameTextStyle:{
              fill: '#fff',
              fontSize: 15
            }
          },
          yAxis: {
            name: '销售额',
            data: 'value',
            nameTextStyle:{
              fill: '#fff',
              fontSize: 15
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
                fontSize: 15
              }
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
              data: res.data.map((item) => {return Math.floor(item.销售额/10000)}),
              type: 'bar',
              smooth: true,
              lineArea: {
                show: true,
                gradient: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)']
              },
              gradient: {
                color: ['#27749c', 'rgb(77,170,172,.36)']
              },
              label: {
                show: true,
                position: 'center',
                offset: [0, 0],
                style: {
                  fill: '#fff',
                  fontSize:25
                }
              }
            }
          ]
        
        
        };
        that.$set(that.basedata,1, {name:'当月销售额',value:{number: [res.data[res.data.length-1].销售额],toFixed: 2,content: '{nt}元',style:{fontSize:35}}})
      })
    },
    //  西安内外销量
    xianinout:function(){
      var that = this;
      that.axios.get('http://localhost:3002/xianinout').then(res=>{
        let i = Math.floor(res.data[1].sum/(res.data[0].sum+res.data[1].sum)*100)+'%'
        that.xianinoutdata = i;
      })
    },
    //纳新
    naixn:function(){
      var that = this;
      that.axios.get('http://localhost:3002/naixn').then(res=>{
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
}
.ivu-table-row-hover td,.ivu-table,.ivu-table td,.ivu-table-header thead tr th{
  background: none!important;
  color: white;
  border: none!important;
}
.ivu-table-header thead tr th{
  color:rgba(255, 255, 255, 0.714);
  font-weight: 600;
  font-size: 17px;
  background-color: rgba(11, 31, 113, 0.543)!important;
}
.ivu-table td, .ivu-table th{
  border: none;
}
.ivu-table:before{height: 0!important;}
</style>
