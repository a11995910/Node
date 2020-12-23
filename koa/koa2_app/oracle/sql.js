var oracledb = require('oracledb');
var config = require('./config');
var connection;
//连接oracle
var query = function (sql) {
    return new Promise((resolve, reject) => {
        oracledb.getConnection(
            {
                user: "qihuamis",
                password: '111111',
                connectString: "192.168.0.23/orcl"
            },
            function (err, connection) {
                if (err) {
                    reject(err)
                }
                connection.execute(sql, [], function (err, result) {
                    if (err) {
                        reject(err)
                        doRelease(connection);
                    }
                    resolve(result.rows);
                    doRelease(connection);
                });
            }
        );
    })

}

function doRelease(connection) {
    connection.close(
        function (err) {
            if (err)
                console.error(err.message);
        });
}
let allServices = {
    //今日销售数据
    nowDaySellData: function () {
        let _sql = `select distinct to_char(d_retail_time, 'yymmdd') || c_pos_id ||
        c_retail_id,
        sum(n_money_in),
        c_plu_name,
        d_retail_time
        from mis.t_lz_sale_gather_day
        where n_money_in > 0
        group by to_char(d_retail_time, 'yymmdd') || c_pos_id || c_retail_id, c_plu_name, d_retail_time order by to_char(d_retail_time, 'HH24') desc`
        return query(_sql)
    }
}
module.exports = allServices;