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
    }
}

module.exports = allServices;