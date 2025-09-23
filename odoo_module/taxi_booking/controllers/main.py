# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request
import json
import logging

_logger = logging.getLogger(__name__)

class TaxiBookingController(http.Controller):
    
    @http.route('/taxi', type='http', auth='public', website=True)
    def taxi_booking_page(self, **kw):
        """
        Main route for the taxi booking app
        Serves the React frontend
        """
        return request.render('taxi_booking.taxi_booking_template')
    
    @http.route('/taxi/<path:path>', type='http', auth='public', website=True)
    def taxi_assets(self, path, **kw):
        """
        Route for all sub-paths in the taxi booking app
        Allows React router to handle client-side routing
        """
        return request.render('taxi_booking.taxi_booking_template')
    
    # API Endpoints for CORS headers
    @http.route(['/web/session/authenticate',
                '/web/dataset/call_kw',
                '/web/dataset/call',
                '/web/dataset/search_read'], 
                type='http', auth="none", csrf=False, cors="*", save_session=True)
    def taxi_api_cors(self, **kw):
        """
        Add CORS headers to API endpoints for the taxi booking app
        """
        # Let Odoo handle the actual request
        response = request.env['ir.http']._dispatch()
        
        # Add CORS headers
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
            'Access-Control-Allow-Credentials': 'true'
        }
        
        # Apply headers to response
        for key, value in headers.items():
            response.headers[key] = value
            
        return response