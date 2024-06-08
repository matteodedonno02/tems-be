export default () => ({
    db: {
        type: 'mariadb',
        host: 'yourhost',
        port: 3306,
        username: 'yourusername',
        password: 'yourpwd',
        database: 'yourdb',
        synchronize: true
    }
})