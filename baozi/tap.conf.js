module.exports = {
    server: {
        monitor: {      //主进程服务配置
            port: 80,     //监听80端口
            proxy_pass: [ //转发规则
                {
                    server_name: 'localhost',
                    rewrite: [
                        {
                            rule: /^(.+)$/,
                            target: 'http://127.0.0.1:3000/$1' //转发到wormhole服务所在的3000端口
                        }
                    ]
                },
                {
                    server_name: 'g.tbcdn.cn g.assets.daily.taobao.net g.alicdn.com',
                    rewrite: [
                        {
                            rule: /^(.+)$/,
                            target: 'http://127.0.0.1:8000/$1'
                        }
                    ]
                }
            ]
        },
        workers: [  //子进程服务
            {
                command: 'wh-cli server app'  //启动wh server
            },
            {
                command: 'wh-cli link'        //将当前目录链接到wh目录
            },
            {
                command: 'tap link'           //将当前目录链接到tap 本地cdn目录
            },
            {
                command: 'tap assets -p 8000' //在8000端口启动tap assets服务
            },
            {
                command: 'tap watch'
            }
        ]
    }
};