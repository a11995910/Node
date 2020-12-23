$(window).load(function () {
    $(".loading").fadeOut()
})
$(function () {
    echarts_1();
    nowdayandyesday();
    allkinds();
    verbmonth();
    nowdayKinds();
    top10();
    echarts_5();
    zb1();
    zb2();
    zb3();
    // 品类占比详情图表
    function echarts_1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart1'));
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                right: 0,
                top: 30,
                height: 160,
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 10,
                textStyle: {
                    color: 'rgba(255,255,255,.6)',
                    fontSize: 12
                },
                orient: 'vertical',
                data: ['化妆品', '百货', '奢侈品', '黄金珠宝', '鞋服']
            },
            calculable: true,
            series: [
                {
                    name: ' ',
                    color: ['#62c98d', '#2f89cf', '#4cb9cf', '#53b666', '#62c98d', '#205acf', '#c9c862', '#c98b62', '#c962b9', '#7562c9', '#c96262', '#c25775', '#00b7be'],
                    type: 'pie',
                    radius: [30, 70],
                    center: ['35%', '50%'],
                    roseType: 'radius',
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },

                    lableLine: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },

                    data: [
                        { value: 10, name: '化妆品' },
                        { value: 5, name: '百货' },
                        { value: 15, name: '奢侈品' },
                        { value: 25, name: '黄金珠宝' },
                        { value: 20, name: '鞋服' },

                    ]
                },
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
    
    

    function echarts_5() {
        
    }


    function zb1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('zb1'));
        var v1 = 298//男消费
        var v2 = 523//女消费
        var v3 = v1 + v2//总消费 
        option = {
            series: [{

                type: 'pie',
                radius: ['60%', '70%'],
                color: '#49bcf7',
                label: {
                    normal: {
                        position: 'center'
                    }
                },
                data: [{
                    value: v2,
                    name: '女消费',
                    label: {
                        normal: {
                            formatter: v2 + '',
                            textStyle: {
                                fontSize: 20,
                                color: '#fff',
                            }
                        }
                    }
                }, {
                    value: v1,
                    name: '男消费',
                    label: {
                        normal: {
                            formatter: function (params) {
                                return '占比' + Math.round(v2 / v3 * 100) + '%'
                            },
                            textStyle: {
                                color: '#aaa',
                                fontSize: 12
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(255,255,255,.2)'
                        },
                        emphasis: {
                            color: '#fff'
                        }
                    },
                }]
            }]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
    function zb2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('zb2'));
        var v1 = 298//男消费
        var v2 = 523//女消费
        var v3 = v1 + v2//总消费 
        option = {

            //animation: false,
            series: [{
                type: 'pie',
                radius: ['60%', '70%'],
                color: '#cdba00',
                label: {
                    normal: {
                        position: 'center'
                    }
                },
                data: [{
                    value: v1,
                    name: '男消费',
                    label: {
                        normal: {
                            formatter: v1 + '',
                            textStyle: {
                                fontSize: 20,
                                color: '#fff',
                            }
                        }
                    }
                }, {
                    value: v2,
                    name: '女消费',
                    label: {
                        normal: {
                            formatter: function (params) {
                                return '占比' + Math.round(v1 / v3 * 100) + '%'
                            },
                            textStyle: {
                                color: '#aaa',
                                fontSize: 12
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(255,255,255,.2)'
                        },
                        emphasis: {
                            color: '#fff'
                        }
                    },
                }]
            }]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
    function zb3() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('zb3'));
        var v1 = 298//男消费
        var v2 = 523//女消费
        var v3 = v1 + v2//总消费 
        option = {
            series: [{

                type: 'pie',
                radius: ['60%', '70%'],
                color: '#62c98d',
                label: {
                    normal: {
                        position: 'center'
                    }
                },
                data: [{
                    value: v2,
                    name: '女消费',
                    label: {
                        normal: {
                            formatter: v2 + '',
                            textStyle: {
                                fontSize: 20,
                                color: '#fff',
                            }
                        }
                    }
                }, {
                    value: v1,
                    name: '男消费',
                    label: {
                        normal: {
                            formatter: function (params) {
                                return '占比' + Math.round(v2 / v3 * 100) + '%'
                            },
                            textStyle: {
                                color: '#aaa',
                                fontSize: 12
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(255,255,255,.2)'
                        },
                        emphasis: {
                            color: '#fff'
                        }
                    },
                }]
            }]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
})
//今日和昨日数据
function nowdayandyesday(){
    let nows = requist('echarts1').then(function(res){
        var data = [];
        var value = 0;
        for(let i=0;i<res.length;i++){
            if(res[i].time.slice(0,2)==(i+value)){
                data.push(res[i].sellmoney)
            }else{
                var addlength = res[i].time.slice(0,2) - (i+value);
                for(let i=0;i<addlength;i++){
                    data.push(0);
                }
                value = addlength+value
                data.push(res[i].sellmoney)
            }
        }
        return data
    })
    let yets = requist('echarts2').then(function(res){
        var data = [];
        var value = 0;
        for(let i=0;i<res.length;i++){
            if(res[i].time.slice(0,2)==(i+value)){
                data.push(res[i].sellmoney)
            }else{
                var addlength = res[i].time.slice(0,2) - (i+value);
                for(let i=0;i<addlength;i++){
                    data.push(0);
                }
                value = addlength+value
                data.push(res[i].sellmoney)
            }
        }
        return data
    })
    Promise.all([nows, yets]).then((result) => {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart3'));
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            },
            legend: {
                data: ['昨日', '今日'],
                top: '0',
                textStyle: {
                    color: "#fff"
                },
                itemGap: 20,
            },
            grid: {
                left: '0',
                right: '20',
                top: '10',
                bottom: '20',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: 'rgba(255,255,255,.6)'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                },
                data: ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00','13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
            }, {}],
            yAxis: [{
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: 'rgba(255,255,255,.6)'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                }
            }],
            series: [
                {
                name: '昨日',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(24, 163, 64, 0.2)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(24, 163, 64, 0.5)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#cdba00',
                        borderColor: 'rgba(137,189,2,0.27)',
                        borderWidth: 12
                    }
                },
                data: result[1]
            }, {
                name: '今日',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(39, 122,206, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(39, 122,206, 0.5)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#277ace',
                        borderColor: 'rgba(0,136,212,0.2)',
                        borderWidth: 12
                    }
                },
                data: result[0]
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    })
}
//总销售各个品类数据
function allkinds(){
    let all_kinds = requist('all_kinds').then((res)=>{
        // $('.table1 .tabeldata').remove();
        //排行渲染
        for(let i=0;i<res.length;i++){
            let obj = '<tr class="tabeldata"><td><span>'+(i+1)+'</span></td><td>'+ res[i].name +'</td><td>'+ res[i].销售额 +'<br></td><td>'+ res[i].笔数 +'<br></td></tr>';
            $('.allkind').append(obj)
        }
        //图形渲染 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart2'));
        let data = [];
        for(let i=0;i<res.length;i++){
            let obj = {value:res[i].销售额,name:res[i].name};
            data.push(obj);
        }
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)",
                show:true,
                triggerOn:'mousemove'
            },
            calculable: true,
            series: [{
                name: '',
                color: ['#62c98d', '#2f89cf', '#4cb9cf', '#53b666', '#62c98d', '#205acf', '#c9c862', '#c98b62', '#c962b9', '#c96262'],
                type: 'pie',
                //起始角度，支持范围[0, 360]
                startAngle: 0,
                //饼图的半径，数组的第一项是内半径，第二项是外半径
                radius: [51, 100],
                //支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度
                center: ['50%', '45%'],
                //是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
                // 'radius' 面积展现数据的百分比，半径展现数据的大小。
                //  'area' 所有扇区面积相同，仅通过半径展现数据大小
                roseType: 'radius',
                //是否启用防止标签重叠策略，默认开启，圆环图这个例子中需要强制所有标签放在中心位置，可以将该值设为 false。
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                    },
                    emphasis: {
                        show: true
                    },
                    alignTo:'edge'
                },
                labelLine: {
                    normal: {
                        show: true,
                        length2: 1,
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: data
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    })
}
//今日各个品类销售数据
function nowdayKinds(){
    let data = requist('nowdayKindsDate').then((res)=>{
        //排行渲染
        let sum = 0;
        for(let i=0;i<res.length;i++){
            let obj = '<tr class="tabeldata"><td><span>'+(i+1)+'</span></td><td>'+ res[i].name +'</td><td>'+ res[i].销售额 +'<br></td><td>'+ res[i].笔数 +'<br></td></tr>';
            $('.allkindtoday').append(obj);
            sum+=res[i].销售额
        }
        $('.numtxttoday').text(sum);
    })
}
//今年个月份数据
function verbmonth(){
    let data = requist('verbmonth').then((res)=>{
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart4'));
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#57617B'
                        },
                        type:'line'
                    },
                },
                "xAxis": [
                    {
                        "type": "category",
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        axisLine: { lineStyle: { color: "rgba(255,255,255,.1)" } },
                        axisLabel: {
                            textStyle: { color: "rgba(255,255,255,.6)", fontSize: '14', },
                        }
                    },
                ],
                "yAxis": [
                    {
                        "type": "value",
                        "name": "销售额（w）",
                        "min": 0,
                        "max": 'dataMax',
                        "mininterval": 1,
                        "axisLabel": {
                            "show": true,
    
                        },
                        axisLine: { lineStyle: { color: 'rgba(255,255,255,.3)' } },//左线色
                        axisLabel: {
                            textStyle: { color: "rgba(255,255,255,.3)", fontSize: '14', },
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,.1)'
                            }
                        }
                    }
                ],
                "grid": {
                    "top": "10%",
                    "right": "30",
                    "bottom": "30",
                    "left": "30",
                },
                "series": [
                    {
                        "name": "线上小程序",
                        "type": "bar",
                        "data": res.map((item,index) => {return Math.floor(item.销售额/10000)}),
                        "barWidth": "20",
                        "itemStyle": {
                            "normal": {
                                "color": {
                                    "type": "linear",
                                    "x": 0,
                                    "y": 0,
                                    "x2": 0,
                                    "y2": 1,
                                    "colorStops": [
                                        {
                                            "offset": 0,
                                            "color": "#4579db"
                                        },
                                        {
                                            "offset": 1,
                                            "color": "#4579db"
                                        }
                                    ],
                                    "globalCoord": false
                                },
                                    label: {
                                        show: true, //开启显示
                                        position: 'top', //在上方显示
                                        textStyle: { //数值样式
                                            color: 'white',
                                            fontSize: 14
                                        }
                                    },
                                "barBorderRadius": [3, 3, 0, 0],
                            "shadowBlur": 0.5,
                            "shadowColor": "rgba(51, 111, 176, 1)",
                            "shadowOffsetX": 0.5,
                            "shadowOffsetY": 0.5,
                            "opacity": 0.75
                            },
                            
                        },
                        "barGap": "0"
                    }
                ]
            };
    
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
    })
}
//历史销量top
function top10(){
    let data = requist('top10').then((res)=>{
        // 基于准备好的dom，初始化echarts实例
        console.log(res,res.map((item,index) => {return item.销售额}));
        var myChart = echarts.init(document.getElementById('echart5'));
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#57617B'
                    },
                    type:'line'
                },
            },
            grid: {
                top: '0%',
                left: '65',
                right: '14%',
                bottom: '0%',
            },
            xAxis: {
                min: 0,
                max: 'auto',
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                }
            },
            yAxis: {
                data: res.map((item,index) => {return item.日期}),
                //offset: 15,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    color: 'rgba(255,255,255,.6)',
                    fontSize: 14
                }
            },
            series: [{
                type: 'bar',
                label: {
                    show: true,
                    zlevel: 10000,
                    position: 'right',
                    padding: 10,
                    color: '#49bcf7',
                    fontSize: 14,
                    // formatter: '{c}%'

                },
                itemStyle: {
                    color: '#49bcf7'
                },
                barWidth: '15',
                data: res.map((item,index) => {return item.销售额}),
                z: 10
            }],
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    })
}
function requist(urlname){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/market/'+urlname,
            type: 'get',
            dataType: 'json',
            success: function (res) {
                resolve(res)
            },
            fail:(err)=>{
                reject(err)
            }
        })
        })

    
}


















