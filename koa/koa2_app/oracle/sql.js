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
        return query(_sql)
    },
    //年龄分布
    agekinds:function(){
        let _sql = `select * from 
        (select  case
                 when (to_char(sysdate, 'yyyy') - to_char(b.d_birthday, 'yyyy') <= 20) then
                  '20及以下'
                 when (to_char(sysdate, 'yyyy') - to_char(b.d_birthday, 'yyyy') between 21 and 25) then
                  '21-25'
                 when (to_char(sysdate, 'yyyy') - to_char(b.d_birthday, 'yyyy') between 26 and 30) then
                  '26-30'
                 when (to_char(sysdate, 'yyyy') - to_char(b.d_birthday, 'yyyy') between 31 and 35) then
                  '31-35'
                 when (to_char(sysdate, 'yyyy') - to_char(b.d_birthday, 'yyyy') between 36 and 40) then
                  '36-40'
                 when (to_char(sysdate, 'yyyy') - to_char(b.d_birthday, 'yyyy') between 41 and 45) then
                  '41-45'
                 when (to_char(sysdate, 'yyyy') - to_char(b.d_birthday, 'yyyy') between 46 and 50) then
                  '46-50'
                 when (to_char(sysdate, 'yyyy') - to_char(b.d_birthday, 'yyyy') between 51 and 55) then
                  '51-55'
                 when (to_char(sysdate, 'yyyy') - to_char(b.d_birthday, 'yyyy') between 56 and 60) then
                  '56-60'
                 when (to_char(sysdate, 'yyyy') - to_char(b.d_birthday, 'yyyy') >= 65) then
                  '65及以上'
               
               end as 年龄段,
               count(distinct a.c_jfk_id) as 人数,
               count(distinct to_char(a.d_retail_time,'yymmdd')||a.c_pos_id||a.c_retail_id) 笔数,
               sum(a.n_money_in) 销售额
        
          from t_lz_sale_gather_day a, card_customer b
         where a.c_jfk_id = b.c_card_id
         group by case
                    when (to_char(sysdate, 'yyyy') - to_char(b.d_birthday, 'yyyy') <= 20) then
                     '20及以下'
                    when (to_char(sysdate, 'yyyy') - to_char(b.d_birthday, 'yyyy') between 21 and 25) then
                     '21-25'
                    when (to_char(sysdate, 'yyyy') - to_char(b.d_birthday, 'yyyy') between 26 and 30) then
                     '26-30'
                    when (to_char(sysdate, 'yyyy') - to_char(b.d_birthday, 'yyyy') between 31 and 35) then
                     '31-35'
                    when (to_char(sysdate, 'yyyy') - to_char(b.d_birthday, 'yyyy') between 36 and 40) then
                     '36-40'
                    when (to_char(sysdate, 'yyyy') - to_char(b.d_birthday, 'yyyy') between 41 and 45) then
                     '41-45'
                    when (to_char(sysdate, 'yyyy') - to_char(b.d_birthday, 'yyyy') between 46 and 50) then
                     '46-50'
                    when (to_char(sysdate, 'yyyy') - to_char(b.d_birthday, 'yyyy') between 51 and 55) then
                     '51-55'
                    when (to_char(sysdate, 'yyyy') - to_char(b.d_birthday, 'yyyy') between 56 and 60) then
                     '56-60'
                    when (to_char(sysdate, 'yyyy') - to_char(b.d_birthday, 'yyyy') >= 65) then
                     '65及以上'
                  
                  end)
                  
                  where 年龄段 is not null
        `
        return query(_sql)
    },
    //各楼层销售占比
    floodata:function(){
        let _sql = `select c_floor_id||'F' as 楼层,sum(je) as 销售金额 from
        (select a.c_supply_id,sum(a.n_money_in) as je from "MIS".t_lz_sale_gather_day a group by a.c_supply_id) aa
        left join (select b.c_dept_id,b.c_floor_id,b.c_ht_id  from "MIS".v_saga_dept b  ) bb on aa.c_supply_id=bb.c_ht_id group by c_floor_id order by 'sum(je)'`;
        return query(_sql)
    },
    //品牌前十
    small10:function(){
        let _sql = `select * from (
            select c_plu_dept,b.c_dept_name||'('||sum(n_money_in)/10000||'万'||')',sum(n_money_in) as jine from "MIS".t_lz_sale_gather_day a,"MIS".infor_dept b 
            where a.c_plu_dept = b.c_dept_id group by c_plu_dept,b.c_dept_name order by jine desc) where  rownum <= 10`;
        return query(_sql)
    },
    //品类前十
    top10:function(){
        let _sql = `select * from (
            select c_plu_dept,b.c_dept_name,sum(n_money_in) as jine from "MIS".t_lz_sale_gather_day a,"MIS".infor_dept b 
            where a.c_plu_dept = b.c_dept_id group by c_plu_dept,b.c_dept_name order by jine desc) where  rownum <= 10`;
        return query(_sql)
    }
}
module.exports = allServices;