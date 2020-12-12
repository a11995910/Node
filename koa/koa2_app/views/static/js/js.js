$(window).load(function () {
    $(".loading").fadeOut()
})
$(function () {
    echarts_1();
    echarts_2();
    nowdayandyesday();
    echarts_4();
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
    function echarts_2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart2'));

        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {

                top: '15%',
                data: ['图例1', '图例2', '图例3', '图例4', '图例5'],
                icon: 'circle',
                textStyle: {
                    color: 'rgba(255,255,255,.6)',
                }
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
                roseType: 'area',
                //是否启用防止标签重叠策略，默认开启，圆环图这个例子中需要强制所有标签放在中心位置，可以将该值设为 false。
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                        //  formatter: '{c}辆'
                    },
                    emphasis: {
                        show: true
                    }
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
                data: [
                    { value: 1, name: '图例1', },
                    { value: 4, name: '图例2', },
                    { value: 5, name: '图例3', },
                    { value: 6, name: '图例4', },
                    { value: 9, name: '图例5', },



                    { value: 0, name: "", label: { show: false }, labelLine: { show: false } },
                    { value: 0, name: "", label: { show: false }, labelLine: { show: false } },
                    { value: 0, name: "", label: { show: false }, labelLine: { show: false } },
                    { value: 0, name: "", label: { show: false }, labelLine: { show: false } },
                    { value: 0, name: "", label: { show: false }, labelLine: { show: false } },


                ]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
    
    function echarts_4() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart4'));
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            },
            "legend": {

                "data": [
                    { "name": "线下" },
                    { "name": "线上小程序" }
                ],
                "top": "0%",
                "textStyle": {
                    "color": "rgba(255,255,255,0.9)"//图例文字
                }
            },

            "xAxis": [
                {
                    "type": "category",

                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    axisLine: { lineStyle: { color: "rgba(255,255,255,.1)" } },
                    axisLabel: {
                        textStyle: { color: "rgba(255,255,255,.6)", fontSize: '14', },
                    },

                },
            ],
            "yAxis": [
                {
                    "type": "value",
                    "name": "销售额（w）",
                    "min": 0,
                    "max": 50,
                    "interval": 10,
                    "axisLabel": {
                        "show": true,

                    },
                    axisLine: { lineStyle: { color: 'rgba(255,255,255,.4)' } },//左线色

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
                    "name": "线下",

                    "type": "bar",
                    "data": [4, 6, 36, 6, 8, 6, 4, 6, 30, 6, 8, 12],
                    "barWidth": "auto",
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
                                        "color": "#609db8"
                                    },

                                    {
                                        "offset": 1,
                                        "color": "#609db8"
                                    }
                                ],
                                "globalCoord": false
                            }
                        }
                    }
                },
                {
                    "name": "线上小程序",
                    "type": "bar",
                    "data": [
                        4, 2, 34, 6, 8, 6, 4, 2, 32, 6, 8, 18
                    ],
                    "barWidth": "auto",

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
                                        "color": "#66b8a7"
                                    },
                                    {
                                        "offset": 1,
                                        "color": "#66b8a7"
                                    }
                                ],
                                "globalCoord": false
                            }
                        }
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
    }

    function echarts_5() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart5'));
        // 颜色
        var lightBlue = {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0,
                color: 'rgba(41, 121, 255, 1)'
            }, {
                offset: 1,
                color: 'rgba(0, 192, 255, 1)'
            }],
            globalCoord: false
        }

        var option = {
            tooltip: {
                show: false
            },
            grid: {
                top: '0%',
                left: '65',
                right: '14%',
                bottom: '0%',
            },
            xAxis: {
                min: 0,
                max: 100,
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
                data: ['字段名称', '字段名称', '字段名称', '字段名称', '字段名称', '字段名称', '字段名称', '字段名称', '字段名称', '字段名称', '字段名称'],
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
                    formatter: '{c}%'

                },
                itemStyle: {
                    color: '#49bcf7'
                },
                barWidth: '15',
                data: [49, 80, 67, 99, 12, 19, 39, 84, 28, 47, 57, 100],
                z: 10
            }, {
                type: 'bar',
                barGap: '-100%',
                itemStyle: {
                    color: '#fff',
                    opacity: 0.1
                },
                barWidth: '15',
                data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
                z: 5
            }],
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
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

function nowdayandyesday(){
    let nows = requist('echarts1').then(function(res){
        let data = res.map((item,index) => {
            return item.sellmoney
        })
        return data
        
    })
    let yets = requist('echarts2').then(function(res){
        let data = res.map((item,index) => {
            return item.sellmoney
        })
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
                            color: 'rgba(24, 163, 64, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(24, 163, 64, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
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
                            color: 'rgba(39, 122,206, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
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
function requist(urlname){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/'+urlname,
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


















