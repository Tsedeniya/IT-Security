permissions =[
    
    'view user',
    'view all users',
    'delete user',
   
    'Add feedbacks',
    'update feedback',
    'view feedbacks',
    
    'view all feedbacks',

    

]

roles={
    admin:[ 'view user',
    'view all users',
    'delete user',
    'view all feedbacks'],
    member:[
        'Add feedbacks',
        'update feedback',
        'view feedbacks'
        
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