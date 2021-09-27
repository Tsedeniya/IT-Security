permissions =[
    
    'view user',
    'view all users',
    'delete user',
    'update user',
    
    'create feedback',
    'delete feedback',
    'update feedback',
    'view feedback',
    'view all feedbacks'
    

    

]

roles={
    admin:[...permissions],
    user:[],
   member:[
    'create feedback',
    'delete feedback',
    'update feedback',
    'view feedback',
    ]
}

users = [
    {
        full_name:'Tsedeniya Solomon',
        username: 'admin',
        email: 'super@admin.com',
        password: 'superuser',
        roles: ['admin']
    }
]


module.exports = {permissions,roles,users}