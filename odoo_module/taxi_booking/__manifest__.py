{
    'name': 'Taxi Booking System',
    'version': '1.0.0',
    'summary': 'React-based taxi booking integrated with Odoo',
    'description': """
        A modern taxi booking system with React frontend integrated into Odoo.
        Features:
        - Customer registration and management
        - Real-time booking system
        - CRM integration
        - Mobile responsive design
    """,
    'author': 'YatraWheels',
    'website': 'https://yourcar.odoo.com',
    'category': 'Website',
    'depends': ['website', 'crm', 'sale'],
    'data': [
        'views/taxi_booking_templates.xml',
        'views/taxi_booking_assets.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'taxi_booking/static/src/js/taxi_app.js',
            'taxi_booking/static/src/css/taxi_styles.css',
        ],
    },
    'installable': True,
    'application': True,
    'auto_install': False,
}