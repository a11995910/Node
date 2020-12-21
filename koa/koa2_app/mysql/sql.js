var mysql = require('mysql');
var config = require('./config');

var pool = mysql.createPool({
    host: config.database.HOST,
    port: config.database.PORT,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let allServices = {
    query: function (sql, values) {

        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })

    },
    //今日销售数据
   nowDaySellData: function () {
        let _sql = `SELECT
        CONCAT(FROM_UNIXTIME( pay_time, '%H'),'-',(FROM_UNIXTIME( pay_time+3600, '%H') )) AS 'time',
        sum( total_price ) AS 'sellmoney' 
       FROM
        ims_store_order_small 
       WHERE
        TO_DAYS( FROM_UNIXTIME( pay_time, '%Y-%m-%d' ) ) = TO_DAYS( NOW( ) ) 
        AND paid = 1 
        AND STATUS >= 0 
        AND is_del = 0 
        AND refund_status = 0 
       GROUP BY
        (FROM_UNIXTIME( pay_time, '%H'));`
        return allServices.query(_sql)
    },
    //昨日销售数据
    yesterdaySellDate:function(){
        let _sql = `SELECT
        CONCAT(FROM_UNIXTIME( pay_time, '%H'),'-',(FROM_UNIXTIME( pay_time+3600, '%H') )) AS 'time',
        sum( total_price ) AS 'sellmoney' 
       FROM
        ims_store_order_small 
       WHERE
        DATE_SUB(curdate(),INTERVAL 2 DAY) < FROM_UNIXTIME(pay_time,'%Y-%m-%d') 
        and TO_DAYS(FROM_UNIXTIME(pay_time,'%Y-%m-%d')) < TO_DAYS(NOW())
        AND paid = 1 
        AND STATUS >= 0 
        AND is_del = 0 
        AND refund_status = 0 
       GROUP BY
        (FROM_UNIXTIME( pay_time, '%H'));`
        return allServices.query(_sql)
    },
    //总品类销售数据
    allKindsDate:function(){
        let _sql = `SELECT
        CASE
          type_id 
                WHEN '345' THEN
                '奥莱' 
                WHEN '62' THEN
                '电子产品' 
                WHEN '124' THEN
                'B2潮流精选' 
                WHEN '27' THEN
                '化妆品' 
                WHEN '60' THEN
                '奢侈品' ELSE '百货' 
            END AS 'name',
         sum( total_price )  '销售额',
         sum( pay_price )  '实付金额',
         count(s_id)  '笔数',
         ROUND(sum( coupon_price ))  '用券金额'
        FROM
         ims_store_order_small 
        WHERE
         paid = 1 AND STATUS >= 0 
         AND is_del = 0 
         AND refund_status = 0 
        GROUP BY
         name
        ORDER BY sum( total_price ) desc`
        return allServices.query(_sql)
    },
    //今日品类销售数据
    nowdayKindsDate:function(){
        let _sql = `SELECT
        CASE
          type_id 
                WHEN '345' THEN
                '奥莱' 
                WHEN '62' THEN
                '电子产品' 
                WHEN '124' THEN
                'B2潮流精选' 
                WHEN '27' THEN
                '化妆品' 
                WHEN '60' THEN
                '奢侈品' ELSE '百货' 
            END AS 'name',
         sum( total_price )  '销售额',
         sum( pay_price )  '实付金额',
         count(s_id)  '笔数',
         ROUND(sum( coupon_price ))  '用券金额'
        FROM
         ims_store_order_small 
        WHERE
         paid = 1 AND STATUS >= 0 
         AND is_del = 0 
         AND refund_status = 0 
         AND TO_DAYS( FROM_UNIXTIME( pay_time, '%Y-%m-%d' ) ) = TO_DAYS( NOW( ) ) 
        GROUP BY
         name
        ORDER BY sum( total_price ) desc`;
        return allServices.query(_sql)
    },
    //今年各个月份销售数据
    verbmonth:function(){
        let _sql = `SELECT left(from_unixtime(pay_time),7) AS '日期',
        sum(total_price) AS '销售额',
       sum(pay_price) AS '实付金额',
       count(s_id) AS '购买笔数',
       sum(coupon_price)/100 AS '用券笔数',
       count(DISTINCT uid) AS '购买人数'
 FROM ims_store_order_small
 WHERE 
    paid = 1
   AND status >= 0
   AND is_del = 0
   AND refund_status = 0
   and pay_time <> ''
   and left(from_unixtime(pay_time),4) = ${new Date().getFullYear()}
 GROUP BY left(from_unixtime(pay_time),7)`;
        return allServices.query(_sql)
    },
    //历史销量top10
    top10:function(){
        let _sql = `SELECT LEFT
        ( FROM_UNIXTIME( pay_time ), 10 ) 日期,
        sum( total_price ) 销售额
    FROM
        ims_store_order_small 
    WHERE
        paid = 1 
        AND 'status' >= 0 
        AND pay_time IS NOT NULL 
        AND refund_status = 0 
    GROUP BY
        LEFT ( FROM_UNIXTIME( pay_time ), 10 ) 
    ORDER BY
        sum( total_price ) DESC limit 10`;
        return allServices.query(_sql)
    }
}
module.exports = allServices;