module.exports = {
    // 扩展webpack
    configureWebpack: {
        devServer: {
            before(app) {
                app.get('/api/goods', function(req, res) {
                    res.json({
                        code: 0,
                        data: [
                            {
                                id: 1,
                                title: 'Vue实战 第一版',
                                price: '100',
                                img: '/img/01.JPG',
                                count: 100
                            },
                            {
                                id: 2,
                                title: 'Vue实战 第二版',
                                price: '100',
                                img: '/img/02.JPG',
                                count: 100
                            }
                        ]
                    })
                })
            }
        }
    }
}